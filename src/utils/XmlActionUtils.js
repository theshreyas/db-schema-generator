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

  const generateConstraintXML = (type, fields, tableName) => {
    const fieldNames = fields.map((field) => field.name.toUpperCase()).join("_");
    const referenceId = `${tableName.toUpperCase()}_${fieldNames}`;
    const fieldXML = fields
      .map((field) => `\t\t\t<column name="${field.name}"/>`)
      .join("\n");

    return `\t\t<constraint xsi:type="${type}" referenceId="${referenceId}">\n${fieldXML}\n\t\t</constraint>\n`;
  };

  const generateForeignKeyXML = (foreignKeys, tableName) =>
    foreignKeys
      .filter((key) => key.currentColumn && key.referenceTable && key.referenceColumn)
      .map((fk) => {
        const referenceId = `${tableName}_${fk.currentColumn}_${fk.referenceTable}_${fk.referenceColumn}`.toUpperCase();
        return `\t\t<constraint xsi:type="foreign" referenceId="${referenceId}" table="${tableName}" column="${fk.currentColumn}" referenceTable="${fk.referenceTable}" referenceColumn="${fk.referenceColumn}" onDelete="${fk.onDelete}" />\n`;
      })
      .join("");

  const generateIndexXML = (indices, tableName) =>
    indices
      .filter((index) => index.currentColumn && index.indexType)
      .map((index) => {
        const referenceId = `${tableName}_${index.currentColumn}`.toUpperCase();
        return `\t\t<index referenceId="${referenceId}" indexType="${index.indexType}">\n\t\t\t<column name="${index.currentColumn}"/>\n\t\t</index>\n`;
      })
      .join("");

  const xmlFields = fields.filter((field) => field.name).map(generateFieldXML).join("\n");
  const primaryFields = fields.filter((field) => field.primary && !["text", "blob", "json"].includes(field.type));
  const uniqueFields = fields.filter((field) => field.unique);

  const primaryConstraint = primaryFields.length
    ? generateConstraintXML("primary", primaryFields, "PRIMARY")
    : "";

  const uniqueConstraint = uniqueFields.length
    ? generateConstraintXML("unique", uniqueFields, tableName)
    : "";

  const foreignKeyConstraints = generateForeignKeyXML(foreignKeys, tableName);
  const indexNodes = generateIndexXML(indices, tableName);

  const tableAttributes = createAttributesString([
    migrateTable && `onCreate="migrateDataFromAnotherTable(${migrateTable})"`,
    tableComment && `comment="${tableComment}"`,
    tableResource && `resource="${tableResource}"`,
    tableEngine && `engine="${tableEngine}"`,
  ]);

  const xmlOutput = `<?xml version="1.0"?>\n<schema xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:Setup/Declaration/Schema/etc/schema.xsd">\n\t<table name="${tableName}"${tableAttributes ? " " + tableAttributes : ""}>\n${xmlFields}\n${primaryConstraint}${uniqueConstraint}${foreignKeyConstraints}${indexNodes}\t</table>\n</schema>`;

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