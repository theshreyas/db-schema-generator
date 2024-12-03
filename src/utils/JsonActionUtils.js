import { toast } from "react-toastify";

export const handleGenerateJSON = (
  fields,
  indices,
  tableName,
  foreignKeys,
  setJsonOutput
) => {
  const columns = fields.reduce((acc, field) => {
    if (field.name) acc[field.name] = true;
    return acc;
  }, {});

  const indicesData = indices.reduce((acc, { columnsToIndex, indexType }) => {
    if (columnsToIndex.length && indexType) {
      acc[`${tableName}_${columnsToIndex.join('_')}`.toUpperCase()] = true;
    }
    return acc;
  }, {});

  const constraints = foreignKeys.reduce(
    (acc, { currentColumn, referenceTable, referenceColumn }) => {
      if (currentColumn && referenceTable && referenceColumn) {
        acc[
          `${tableName}_${currentColumn}_${referenceTable}_${referenceColumn}`.toUpperCase()
        ] = true;
      }
      return acc;
    },
    {}
  );

    if (fields.some((field) => field.name && field.primary)) {
    constraints.PRIMARY = true;
  }

  const whitelist = {
    [tableName]: {
      column: columns,
      ...(Object.keys(indicesData).length > 0 && { index: indicesData }),
      ...(Object.keys(constraints).length > 0 && { constraint: constraints }),
    },
  };
  setJsonOutput(JSON.stringify(whitelist, null, 2));
};

export const handleDownloadJSON = (jsonOutput) => {
  const blob = new Blob([jsonOutput], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "db_schema_whitelist.json";
  a.click();
  URL.revokeObjectURL(url);
};

export const handleCopyJSON = (jsonOutput) => {
  navigator.clipboard.writeText(jsonOutput);
  toast.success("Whitelist JSON copied to clipboard!");
};
