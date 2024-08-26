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

export const handleAddUniqueKey = (uniqueKeys, setUniqueKeys) => {
  const invalidKeys = uniqueKeys
    .map((key, idx) => ({ key, idx }))
    .filter(
      ({ key }) =>
        !key.uniqueColumns 
    );
  if (invalidKeys.length === 0) {
    const newUniqueKey = {
      uniqueColumns: "",
    };
    setUniqueKeys([...uniqueKeys, newUniqueKey]);
  } else {
    invalidKeys.forEach(({ idx }) => {
      setInvalidRow(idx, setUniqueKeys, uniqueKeys);
    });
  }
};

export const handleAddIndex = (indices, setIndices) => {
  const invalidIndices = indices
    .map((index, idx) => ({ index, idx }))
    .filter(({ index }) => !index.columnsToIndex);
  if (invalidIndices.length === 0) {
    const newIndex = {
      columnsToIndex: "",
      indexType: "btree",
    };
    setIndices([...indices, newIndex]);
  } else {
    invalidIndices.forEach(({ idx }) => {
      setInvalidRow(idx, setIndices, indices);
    });
  }
};

export const handleIndexChange = (index, selectedValue, indices, setIndices) => {
  const newIndices = [...indices];
  const name = Array.isArray(selectedValue) ? 'columnsToIndex' : 'indexType';
  newIndices[index][name] = selectedValue;
  setIndices(newIndices);
};

export const handleUniqueKeyChange = (
  index,
  selectedValues,
  uniqueKeys,
  setUniqueKeys
) => {
  const newUniqueKeys = [...uniqueKeys];
  newUniqueKeys[index] = {
    ...newUniqueKeys[index],
    uniqueColumns: selectedValues,
  };
  setUniqueKeys(newUniqueKeys);
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

export const handleRemoveUniqueKey = (index, uniqueKeys, setUniqueKeys) => {
  const newUniqueKeys = [...uniqueKeys];
  newUniqueKeys.splice(index, 1);
  setUniqueKeys(newUniqueKeys);
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
  setUniqueKeys,
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
  setUniqueKeys([]);
  setIndices([]);
};
