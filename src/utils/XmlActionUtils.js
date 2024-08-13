export const handleGenerateXML = (
  fields,
  tableName,
  foreignKeys,
  indices,
  migrateTable,
  tableComment,
  tableResource,
  tableEngine,
  setXmlOutput
) => {
  const xmlFields = fields
    .filter((field) => field.name)
    .map((field) => {
      const attributes = [
        `name="${field.name}"`,
        `xsi:type="${field.type}"`,
        field.identity ? `identity="${field.identity}"` : "",
        field.primary
          ? `nullable="false"`
          : field.nullable
          ? `nullable="false"`
          : "",
        field.defaultValue ? `default="${field.defaultValue}"` : "",
        field.defaultTime ? `default="${field.defaultTime}"` : "",
        ["datetime", "timestamp"].includes(field.type)
          ? field.on_update
            ? `on_update="true"`
            : `on_update="false"`
          : "",
        field.comment ? `comment="${field.comment}"` : "",
        field.unsigned ? `unsigned="${field.unsigned}"` : "",
        field.type === "varchar" && field.length
          ? `length="${field.length}"`
          : "",
        field.type === "decimal" && field.precision
          ? `precision="${field.precision}"`
          : "",
        field.type === "decimal" && field.scale ? `scale="${field.scale}"` : "",
      ]
        .filter(Boolean)
        .join(" ");
      return `\t\t<column ${attributes} />`;
    })
    .join("\n");

  const primaryFields = fields
    .filter((field) => field.primary)
    .map((field) => `\t\t\t<column name="${field.name}"/>`)
    .join("\n");

  const uniqueFields = fields
    .filter((field) => field.unique)
    .map((field) => `\t\t\t<column name="${field.name}"/>`)
    .join("\n");

  const primaryConstraint = primaryFields
    ? `\t\t<constraint xsi:type="primary" referenceId="PRIMARY">\n${primaryFields}\n\t\t</constraint>\n`
    : "";

  let uniqueConstraint = "";
  if (uniqueFields) {
    const uniqueFieldNames = fields
      .filter((field) => field.unique)
      .map((field) => field.name.toUpperCase())
      .join("_");
    const uniqueReferenceId = `${tableName.toUpperCase()}_${uniqueFieldNames}`;
    uniqueConstraint = `\t\t<constraint xsi:type="unique" referenceId="${uniqueReferenceId}">\n${uniqueFields}\n\t\t</constraint>\n`;
  }

  const foreignKeyConstraints = foreignKeys
    .filter(
      (key) => key.currentColumn && key.referenceTable && key.referenceColumn
    )
    .map((fk, idx) => {
      const { currentColumn, referenceTable, referenceColumn, onDelete } = fk;
      const referenceId =
        `${tableName}_${currentColumn}_${referenceTable}_${referenceColumn}`.toUpperCase();
      return `\t\t<constraint xsi:type="foreign" referenceId="${referenceId}" table="${tableName}" column="${currentColumn}" referenceTable="${referenceTable}" referenceColumn="${referenceColumn}" onDelete="${onDelete}" />\n`;
    })
    .join("");

  const indexNodes = indices
    .filter((ind) => ind.currentColumn && ind.indexType)
    .map((fk, idx) => {
      const { currentColumn, indexType } = fk;
      const referenceId = `${tableName}_${currentColumn}`.toUpperCase();
      return `\t\t<index referenceId="${referenceId}" indexType="${indexType}">\n\t\t\t<column name="${currentColumn}"/>\n\t\t</index>\n`;
    })
    .join("");

  const tableAttributes = [
    migrateTable
      ? `onCreate="migrateDataFromAnotherTable(${migrateTable})"`
      : "",
    tableComment ? `comment="${tableComment}"` : "",
    tableResource ? `resource="${tableResource}"` : "",
    tableEngine ? `engine="${tableEngine}"` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const xmlOutput = `<?xml version="1.0"?>\n<schema xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:Setup/Declaration/Schema/etc/schema.xsd">\n\t<table name="${tableName}" ${tableAttributes}>\n${xmlFields}\n${primaryConstraint}${uniqueConstraint}${foreignKeyConstraints}${indexNodes}\t</table>\n</schema>`;

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
  alert("Schema copied to clipboard!");
};
