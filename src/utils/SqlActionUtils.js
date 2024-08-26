export const handleGenerateSQL = (
  fields,
  tableName,
  foreignKeys,
  uniqueKeys,
  indices,
  tableComment,
  tableEngine,
  setMysqlOutput
) => {
  const primaryKeys = fields.filter((field) => field.primary);
  const createTableQuery = [
  `CREATE TABLE \`${tableName}\` (\n`,
  fields
    .filter((field) => field.name)
    .map((field) => {
        const parts = [
          `\`${field.name}\` ${field.type.toUpperCase()}`,
          ["varchar", "char"].includes(field.type) && field.length
            ? `(${field.length})`
            : "",
          field.type === "decimal"
            ? `(${field.precision || 10},${field.scale || 0})`
            : "",
          field.unsigned && ["int", "smallint", "bigint", "float"].includes(field.type) && `UNSIGNED`,
          field.nullable ? "NOT NULL" : "NULL",
          !field.identity && field.defaultValue ? `DEFAULT '${field.defaultValue}'` : "",
          ["datetime", "timestamp"].includes(field.type) && field.defaultTime ? `DEFAULT ${field.defaultTime}` : "",
          field.identity && ["int", "smallint", "bigint", "float"].includes(field.type) && "AUTO_INCREMENT",
          ["datetime", "timestamp"].includes(field.type) && field.on_update && "ON UPDATE CURRENT_TIMESTAMP",
        ].filter(Boolean);
      return `  ${parts.join(" ")}`;
    })
    .join(",\n"),
  primaryKeys.length > 0 ? `,\n  PRIMARY KEY (${primaryKeys.map((field) => `\`${field.name}\``).join(",")})` : "",
  uniqueKeys.length ? uniqueKeys.filter(key => key?.uniqueColumns?.length).map(uk =>
  `,\n  UNIQUE KEY \`${tableName.toUpperCase()}_${uk.uniqueColumns.join('_').toUpperCase()}\` (${uk.uniqueColumns.map(col => `\`${col}\``).join(',')})`).join("") : "",
  indices
    .filter((index) => index.columnsToIndex?.length && index.indexType)
    .map((index) => {
      const referenceId = `${tableName}_${index.columnsToIndex.join('_')}`.toUpperCase();
      return `,\n${index.indexType === 'fulltext' ? " FULLTEXT" : ""} INDEX \`${referenceId}\` ${index.indexType === 'hash' ? "USING HASH " : ""}(${index.columnsToIndex.map(col => `\`${col}\``).join(',')})`;
    })
    .join(""),
  foreignKeys
    .filter((fk) => fk.currentColumn && fk.referenceTable && fk.referenceColumn)
    .map((fk) =>
      `,\n  FOREIGN KEY (\`${fk.currentColumn}\`) REFERENCES \`${fk.referenceTable}\`(\`${fk.referenceColumn}\`) ON DELETE ${fk.onDelete.toUpperCase()}`
    )
    .join(""),
  `\n) ENGINE=${tableEngine ? tableEngine.toLowerCase() : "innodb"}`,
    tableComment ? ` COMMENT='${tableComment}'` : "",
    ";",
  ].join("");

  setMysqlOutput(createTableQuery);
};

export const handleDownloadSQL = (tableName, sqlOutput) => {
  const blob = new Blob([sqlOutput], { type: "application/xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `create_table_${tableName}.sql`;
  a.click();
  URL.revokeObjectURL(url);
};

export const handleCopySQL = (sqlOutput) => {
  navigator.clipboard.writeText(sqlOutput);
  alert("Query copied to clipboard!");
};