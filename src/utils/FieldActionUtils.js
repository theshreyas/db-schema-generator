export const handleAddField = (
  index,
  fields,
  setFields,
  setShowAdvanced,
  showAdvanced
) => {
  const newFields = [...fields];
  newFields.splice(index + 1, 0, {
    name: "",
    type: "varchar",
    length: 255,
    identity: false,
  });
  setFields(newFields);
  setShowAdvanced([...showAdvanced, false]);
};

export const handleRemoveField = (
  index,
  fields,
  setFields,
  showAdvanced,
  setShowAdvanced
) => {
  if (fields.length > 1) {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
    const newShowAdvanced = showAdvanced.filter((_, i) => i !== index);
    setShowAdvanced(newShowAdvanced);
  }
};

export const handleFieldChange = (index, event, fields, setFields) => {
  const { name, type, value, checked } = event.target;
  const newFields = [...fields];
  if (
    name === "defaultValue" &&
    ["int", "smallint", "bigint", "float", "decimal"].includes(
      newFields[index].type
    )
  ) {
    if (isNaN(value)) {
      alert("Default value must be numeric for numeric field types.");
      return;
    }
    if (["int", "smallint", "bigint"].includes(newFields[index].type)) {
      if (!Number.isInteger(parseFloat(value))) {
        alert("Default value must be an integer for integer field types.");
        return;
      }
    }
  }

  newFields[index] = {
    ...newFields[index],
    [name]: type === "checkbox" ? checked : value,
  };

  if (name === "primary" && checked) {
    newFields[index].nullable = true;
  }
  if (name === "identity" && checked) {
    if (newFields.filter((field) => field.identity).length > 1) {
      alert("There can only be one auto-increment (identity) column.");
      return;
    }
  }
  setFields(newFields);
};

export const handleToggleAdvanced = (index, showAdvanced, setShowAdvanced) => {
  const newShowAdvanced = [...showAdvanced];
  newShowAdvanced[index] = !newShowAdvanced[index];
  setShowAdvanced(newShowAdvanced);
};