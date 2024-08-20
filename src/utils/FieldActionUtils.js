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

export const handleFieldChange = (index, event, fields, setFields, foreignKeys) => {
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
  const field = newFields[index];

  if (["datetime", "timestamp"].includes(field.type)) {
      field.on_update = !!field.on_update;
  }
  if (name === "nullable") {
    if(field.primary && !checked && !["text", "blob", "json"].includes(field.type)) {
      return alert('Primary field cannot be set null');
    }
    const nullableKeyExist = foreignKeys.find(key => key.currentColumn === field.name && key.onDelete === "SET NULL");
    if (nullableKeyExist && checked) {
      return alert('Foreign key is added with on delete not null value!');
    }
  }
  if (name === "primary" && checked) {
      field.nullable = true;
  }

  if (name === "identity" && checked && newFields.filter(field => field.identity).length > 1) {
      return alert("There can only be one auto-increment (identity) column.");
  }
  setFields(newFields);
};

export const handleToggleAdvanced = (index, showAdvanced, setShowAdvanced) => {
  const newShowAdvanced = [...showAdvanced];
  newShowAdvanced[index] = !newShowAdvanced[index];
  setShowAdvanced(newShowAdvanced);
};