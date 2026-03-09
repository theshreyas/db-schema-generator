import { toast } from "react-toastify";
import {
  DEFAULT_FOREIGN_KEY,
  DEFAULT_UNIQUE_KEY,
  DEFAULT_INDEX,
  DEFAULT_FIELD_VALUE,
} from "../constants/fieldConstants";

const setInvalidRow = (index, setState, state) => {
  const updateState = (isInvalid) => {
    const newState = [...state];
    newState[index].isInvalid = isInvalid;
    setState(newState);
  };

  updateState(true);
  setTimeout(() => updateState(false), 1000);
};

const handleAddKey = (keys, setKeys, keyTemplate, invalidCondition) => {
  const invalidKeys = keys
    .map((key, idx) => ({ key, idx }))
    .filter(({ key }) => invalidCondition(key));

  if (invalidKeys.length === 0) {
    setKeys([...keys, keyTemplate]);
  } else {
    invalidKeys.forEach(({ idx }) => setInvalidRow(idx, setKeys, keys));
  }
};

export const handleAddForeignKey = (foreignKeys, setForeignKeys) => {
  handleAddKey(
    foreignKeys,
    setForeignKeys,
    DEFAULT_FOREIGN_KEY,
    (key) => !key.currentColumn || !key.referenceTable || !key.referenceColumn
  );
};

export const handleAddUniqueKey = (uniqueKeys, setUniqueKeys) => {
  handleAddKey(
    uniqueKeys,
    setUniqueKeys,
    DEFAULT_UNIQUE_KEY,
    (key) => !key.uniqueColumns
  );
};

export const handleAddIndex = (indices, setIndices) => {
  handleAddKey(
    indices,
    setIndices,
    DEFAULT_INDEX,
    (index) => !index.columnsToIndex
  );
};

export const handleIndexChange = (index, selectedValue, indices, setIndices, fields) => {
  const newIndices = [...indices];
  const name = Array.isArray(selectedValue) ? 'columnsToIndex' : 'indexType';

  if (Array.isArray(selectedValue) && selectedValue.some(value => {
    const field = fields.find(f => f.name === value);
    return field && ["text", "blob", "json"].includes(field.type);
  })) {
    toast.error("Cannot index Text/Blob/Json fields!");
    return;
  }

  newIndices[index][name] = selectedValue;
  setIndices(newIndices);
};

export const handleUniqueKeyChange = (index, selectedValues, uniqueKeys, setUniqueKeys) => {
  const newUniqueKeys = [...uniqueKeys];
  newUniqueKeys[index].uniqueColumns = selectedValues;
  setUniqueKeys(newUniqueKeys);
};

export const handleForeignKeyChange = (index, event, foreignKeys, setForeignKeys, fields) => {
  const { name, value } = event.target;
  const newForeignKeys = [...foreignKeys];
  newForeignKeys[index][name] = value;

  if (value === 'SET NULL' && fields.some(field => newForeignKeys[index].currentColumn === field.name && !field.nullable)) {
    toast.error("Not nullable field cannot be SET NULL!");
    return;
  }

  setForeignKeys(newForeignKeys);
};

const handleRemoveItem = (index, items, setItems) => {
  const newItems = [...items];
  newItems.splice(index, 1);
  setItems(newItems);
};

export const handleRemoveForeignKey = (index, foreignKeys, setForeignKeys) => {
  handleRemoveItem(index, foreignKeys, setForeignKeys);
};

export const handleRemoveUniqueKey = (index, uniqueKeys, setUniqueKeys) => {
  handleRemoveItem(index, uniqueKeys, setUniqueKeys);
};

export const handleRemoveIndex = (index, indices, setIndices) => {
  handleRemoveItem(index, indices, setIndices);
};

export const handleTableData = (tableCommentAdded, setTableCommentAdded) => {
  if (!tableCommentAdded) {
    setTableCommentAdded(true);
  }
};

export const removeTableData = (setTableCommentAdded, setTableEngine, setMigrateTable, setTableComment, setTableResource) => {
  setTableCommentAdded(false);
  setTableEngine("");
  setMigrateTable("");
  setTableComment("");
  setTableResource("");
};

export const handleReset = (setTableName, setTableCommentAdded, setMigrateTable, setTableEngine, setTableComment, setTableResource, setFields, setShowAdvanced, setForeignKeys, setUniqueKeys, setIndices) => {
  setTableName("");
  setTableCommentAdded(false);
  setMigrateTable("");
  setTableEngine("");
  setTableComment("");
  setTableResource("");
  setFields([DEFAULT_FIELD_VALUE]);
  setShowAdvanced([false]);
  setForeignKeys([]);
  setUniqueKeys([]);
  setIndices([]);
};
