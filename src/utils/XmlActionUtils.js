import { toast } from "react-toastify";

export const handleGenerateXML = (
  fields,
  tableName,
  foreignKeys,
  uniqueKeys,
  indices,
  migrateTable,
  tableComment,
  tableResource,
  tableEngine,
  setXmlOutput
) => {
  const createAttributesString = (attributes) =>
    attributes.filter(Boolean).join(" ");

  const generateFieldXML = (field) => {
    const attributes = [
      `name="${field.name}"`,
      `xsi:type="${field.type}"`,
      field.identity && ["int", "smallint", "bigint", "float"].includes(field.type) && `identity="${field.identity}"`,
      field.primary
        ? `nullable="false"`
        : field.nullable
        ? `nullable="false"`
        : "",
      !field.identity && field.defaultValue && `default="${field.defaultValue}"`,
      ["datetime", "timestamp"].includes(field.type) && field.defaultTime && `default="${field.defaultTime}"`,
      ["datetime", "timestamp"].includes(field.type)
        ? `on_update="${field.on_update}"`
        : "",
      field.comment && `comment="${field.comment}"`,
      field.unsigned && ["int", "smallint", "bigint", "float"].includes(field.type) && `unsigned="${field.unsigned}"`,
      ["varchar", "char", "varbinary"].includes(field.type) && field.length
        ? `length="${field.length}"`
        : "",
      field.type === "decimal" && `precision="${field.precision || 10}"`,
      field.type === "decimal" && `scale="${field.scale || 0}"`,
    ];
    return `\t\t<column ${createAttributesString(attributes)} />`;
  };

  const generateConstraintXML = (type, referenceId, columns) => {
    const columnsXML = columns
      .map((col) => `\t\t\t<column name="${col}"/>`)
      .join("\n");
    return `\t\t<constraint xsi:type="${type}" referenceId="${referenceId}">\n${columnsXML}\n\t\t</constraint>\n`;
  };

  const generateForeignKeyXML = (fk) => {
    const referenceId = `${tableName}_${fk.currentColumn}_${fk.referenceTable}_${fk.referenceColumn}`.toUpperCase();
    return `\t\t<constraint xsi:type="foreign" referenceId="${referenceId}" table="${tableName}" column="${fk.currentColumn}" referenceTable="${fk.referenceTable}" referenceColumn="${fk.referenceColumn}" onDelete="${fk.onDelete}" />\n`;
  };

  const generateIndexXML = (index) => {
    const referenceId = index.index || `${tableName}_${index.columnsToIndex.join('_')}`.toUpperCase();
    const columnsXML = index.columnsToIndex
      .map((col) => `\t\t\t<column name="${col}"/>`)
      .join("\n");
    return `\t\t<index referenceId="${referenceId}" indexType="${index.indexType}">\n${columnsXML}\n\t\t</index>\n`;
  };

  const xmlFields = fields.filter(field => field.name).map(generateFieldXML).join("\n");

  const primaryFields = fields.filter(field => field.primary && !["text", "blob", "json"].includes(field.type));

  const primaryConstraint = primaryFields.length ? generateConstraintXML("primary", `PRIMARY`, primaryFields.map(f => f.name)) : "";

  const uniqueConstraint = uniqueKeys.filter(key => key?.uniqueColumns?.length).map(uk => generateConstraintXML("unique", uk.index || `${tableName.toUpperCase()}_${uk.uniqueColumns.join('_').toUpperCase()}`, uk.uniqueColumns)).join("");

  const foreignKeyConstraints = foreignKeys.filter(fk => fk.currentColumn && fk.referenceTable && fk.referenceColumn).map(generateForeignKeyXML).join("");

  const indexNodes = indices.filter(index => index.columnsToIndex?.length && index.indexType).map(generateIndexXML).join("");

  const tableAttributes = createAttributesString([
    migrateTable && `onCreate="migrateDataFromAnotherTable(${migrateTable})"`,
    tableComment && `comment="${tableComment}"`,
    tableResource && `resource="${tableResource}"`,
    tableEngine && `engine="${tableEngine}"`,
  ]);

  const xmlOutput = `<?xml version="1.0"?>\n<schema xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:Setup/Declaration/Schema/etc/schema.xsd">\n\t<table name="${tableName}"${tableAttributes ? " " + tableAttributes : ""}>\n${xmlFields}\n${primaryConstraint}${foreignKeyConstraints}${uniqueConstraint}${indexNodes}\t</table>\n</schema>`;

  setXmlOutput(xmlOutput);
};

export const handleDownloadXML = (xmlOutput) => {
  const blob = new Blob([xmlOutput], { type: "application/xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "db_schema.xml";
  a.click();
  URL.revokeObjectURL(url);
};

export const handleCopyXML = (xmlOutput) => {
  navigator.clipboard.writeText(xmlOutput);
  toast.success("Schema copied to clipboard!");
};