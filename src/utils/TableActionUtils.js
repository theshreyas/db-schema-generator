const setInvalidRow = (index, setState, state) => {
  const newState = [...state];
  newState[index].isInvalid = true;
  setState(newState);

  setTimeout(() => {
    const updatedState = [...state];
    updatedState[index].isInvalid = false;
    setState(updatedState);
  }, 1000);
};

export const handleRemoveIndex = (index, indices, setIndices) => {
  const newIndices = [...indices];
  newIndices.splice(index, 1);
  setIndices(newIndices);
};

export const handleAddForeignKey = (foreignKeys, setForeignKeys) => {
  const invalidKeys = foreignKeys
    .map((key, idx) => ({ key, idx }))
    .filter(
      ({ key }) =>
        !key.currentColumn || !key.referenceTable || !key.referenceColumn
    );

  if (invalidKeys.length === 0) {
    const newForeignKey = {
      currentColumn: "",
      referenceTable: "",
      referenceColumn: "",
      onDelete: "CASCADE",
    };
    setForeignKeys([...foreignKeys, newForeignKey]);
  } else {
    invalidKeys.forEach(({ idx }) => {
      setInvalidRow(idx, setForeignKeys, foreignKeys);
    });
  }
};

export const handleInvalidRow = (
  index,
  type,
  foreignKeys,
  setForeignKeys,
  indices,
  setIndices
) => {
  if (type === "foreignKey") {
    setInvalidRow(index, setForeignKeys, foreignKeys);
  } else {
    setInvalidRow(index, setIndices, indices);
  }
};

export const handleAddIndex = (indices, setIndices) => {
  const invalidIndices = indices
    .map((index, idx) => ({ index, idx }))
    .filter(({ index }) => !index.currentColumn);

  if (invalidIndices.length === 0) {
    const newIndex = {
      currentColumn: "",
      indexType: "btree",
    };
    setIndices([...indices, newIndex]);
  } else {
    invalidIndices.forEach(({ idx }) => {
      setInvalidRow(idx, setIndices, indices);
    });
  }
};

export const handleIndexChange = (index, event, indices, setIndices) => {
  const { name, value } = event.target;
  const newIndices = [...indices];
  newIndices[index] = {
    ...newIndices[index],
    [name]: value,
  };
  setIndices(newIndices);
};

export const handleForeignKeyChange = (
  index,
  event,
  foreignKeys,
  setForeignKeys,
  fields
) => {
  const { name, value } = event.target;
  const newForeignKeys = [...foreignKeys];
  newForeignKeys[index] = {
    ...newForeignKeys[index],
    [name]: value,
  };
  if(value === 'SET NULL' && fields.some((field) => newForeignKeys[index].currentColumn === field.name && field.nullable)){
    return alert('Not nullable field cannot be SET NULL!');
  }
  setForeignKeys(newForeignKeys);
};

export const handleRemoveForeignKey = (index, foreignKeys, setForeignKeys) => {
  const newForeignKeys = [...foreignKeys];
  newForeignKeys.splice(index, 1);
  setForeignKeys(newForeignKeys);
};

export const handleTableData = (
  tableCommentAdded,
  setTableTwiceClick,
  setTableCommentAdded
) => {
  if (tableCommentAdded) {
    setTableTwiceClick(true);
    setTimeout(() => {
      setTableTwiceClick(false);
    }, 1000);
  } else {
    setTableCommentAdded(true);
  }
};

export const removeTableData = (
  setTableCommentAdded,
  setTableEngine,
  setMigrateTable,
  setTableComment,
  setTableResource
) => {
  setTableCommentAdded(false);
  setTableEngine("");
  setMigrateTable("");
  setTableComment("");
  setTableResource("");
};

export const handleReset = (
  setTableName,
  setTableCommentAdded,
  setMigrateTable,
  setTableEngine,
  setTableComment,
  setTableResource,
  setFields,
  setShowAdvanced,
  setForeignKeys,
  setIndices
) => {
  setTableName("");
  setTableCommentAdded(false);
  setMigrateTable("");
  setTableEngine("");
  setTableComment("");
  setTableResource("");
  setFields([{ name: "", type: "varchar", length: 255, identity: false }]);
  setShowAdvanced([false]);
  setForeignKeys([]);
  setIndices([]);
};
