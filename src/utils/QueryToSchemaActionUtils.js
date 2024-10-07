import { Parser } from 'node-sql-parser';

const parser = new Parser();

const getErrorContext = (start, end, query) => {
  const contextRadius = 14;
  const start1 = Math.max(0, start - contextRadius);
  const end1 = Math.min(query.length, end + contextRadius);
  return query.slice(start1, end1).replace(/^\S*\s*/, '').replace(/\s*\S*$/, '');
};

export const queryToSchema = (mysqlQuery, setTableName, setIndices, setForeignKeys, setUniqueKeys, setTableEngine, setTableComment, setFields, setXmlOutput, setQueryError) => {
  try {
    parser.parse(mysqlQuery);
  } catch (error) {
    const errorContext = getErrorContext(error.location.start.offset, error.location.end.offset, mysqlQuery);
    setQueryError(`MySQL Error near '${errorContext}'.`);
    return "";
  }
  const parsedQuery = parser.astify(mysqlQuery);
  let createTableQuery;
  if (Array.isArray(parsedQuery)) {
    createTableQuery = parsedQuery.find(query => query.keyword === "table" && query.type === "create");
  } else if (parsedQuery.keyword === "table" && parsedQuery.type === "create") {
    createTableQuery = parsedQuery;
  }
  if (!createTableQuery) {
    setQueryError('Create Table Query not found');
    return "";
  }
  setTableName(createTableQuery.table[0].table);

  const tableOptions = createTableQuery.table_options || [];
  const colDefs = createTableQuery.create_definitions || [];
  const tableEngine = tableOptions.find(option => option.keyword === "engine")?.value?.toLowerCase();
  const tableComment = tableOptions.find(option => option.keyword === "comment")?.value?.replace(/^'(.*)'$/, '$1');

  setTableEngine(tableEngine);
  setTableComment(tableComment);
  setQueryError(false);

  let primaryKeys = [
    ...colDefs.filter(col => col.primary_key).map(item => item.column.column),
    ...colDefs.filter(col => col.constraint_type?.toLowerCase() === 'primary key').flatMap(item => item.definition.map(def => def.column))
  ];

  const uniqueKeys = colDefs.filter(col => col.constraint_type?.toLowerCase() === 'unique key').flatMap(item => ({
      uniqueColumns: item.definition.map(i => i.column),
      index: item.index
    }));
  setUniqueKeys(uniqueKeys);
  
  const indices = colDefs
    .filter(col => col.resource === 'index')
    .map(item => ({
      columnsToIndex: item.definition.map(def => def.column),
      indexType: item.keyword && item.keyword.toLowerCase().includes("fulltext") ? "fulltext" : "btree",
      index: item.index
  })).filter((value, index, self) =>
    index === self.findIndex((t) => t.columnsToIndex === value.columnsToIndex)
  );
  setIndices(indices);

  const foreignKeys = colDefs.filter(col => col.constraint_type?.toLowerCase() === 'foreign key').map(col => ({
    currentColumn: col.definition[0]?.column,
    referenceTable: col.reference_definition?.table[0]?.table,
    referenceColumn: col.reference_definition?.definition[0]?.column,
    onDelete: col.reference_definition?.on_action[0]?.value?.value?.toUpperCase()
  }));
  setForeignKeys(foreignKeys);

  const fields = colDefs.filter(col => col.column).map(col => ({
    name: col.column.column,
    type: col.definition.dataType.toLowerCase(),
    length: col.definition.length || 255,
    identity: !!col.auto_increment,
    unsigned: col.definition.suffix?.includes('UNSIGNED') || false,
    nullable: col.nullable?.value === 'not null',
    primary: primaryKeys.includes(col.column.column),
    defaultValue: col.default_val?.value?.value || col.default_val?.value?.name?.name[0].value || null,
    on_update: col.default_val?.value?.over?.type === "on update" || false,
    comment: col.comment?.value?.value || null
  }));
  setFields(fields);
};
