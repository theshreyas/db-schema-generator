import { toast } from "react-toastify";

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
  const field = newFields[index];
  const isNumericType = (type) => ["int", "smallint", "bigint", "float", "decimal"].includes(type);
  const isIntegerType = (type) => ["int", "smallint", "bigint"].includes(type);
  const isValidDefaultValue = (defaultValue) => defaultValue != null && defaultValue !== "" && !/^[-]?\d*\.?\d+$/.test(defaultValue);
  
  if (
    name === "type" &&
    isNumericType(value) &&
    isValidDefaultValue(field.defaultValue)
  ) {
    toast.error("Default value must be numeric for numeric field types.");
    return;
  }

  if(name === "defaultValue" && isNumericType(field.type)) {
    if (isNaN(value)) {
      toast.error("Default value must be numeric for numeric field types.");
      return;
    }
    if (isIntegerType(field.type) && !Number.isInteger(parseFloat(value))) {
        toast.error("Default value must be integer for integer field types.");
        return;
    }
  }

  field[name] = type === "checkbox" ? checked : value;

  if (["datetime", "timestamp"].includes(field.type)) {
      field.on_update = !!field.on_update;
  }
  if (name === "nullable") {
    if(field.primary && !checked && !["text", "blob", "json"].includes(field.type)) {
      toast.error("Primary field cannot be set null");
      return;
    }
    const nullableKeyExist = foreignKeys.find(key => key.currentColumn === field.name && key.onDelete === "SET NULL");
    if (nullableKeyExist && checked) {
      toast.error("Foreign key is added with on delete not null value!");
      return;
    }
  }
  if (name === "primary" && checked) {
      field.nullable = true;
  }

  if (name === "identity" && checked && newFields.filter(field => field.identity).length > 1) {
      toast.error("There can only be one auto-increment (identity) column.");
      return;
  }
  setFields(newFields);
};

export const handleToggleAdvanced = (index, showAdvanced, setShowAdvanced) => {
  const newShowAdvanced = [...showAdvanced];
  newShowAdvanced[index] = !newShowAdvanced[index];
  setShowAdvanced(newShowAdvanced);
};