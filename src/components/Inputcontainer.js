import React from 'react';
import Tablename from "./FieldTable/Tablename.js";
import FieldTableData from "./FieldTable/FieldTableData.js";
import ActionButtons from "./TableActions/ActionButtons.js";
import TableMetaData from "./TableActions/TableMetaData.js";
import ForeignKeys from "./TableActions/ForeignKeys.js";
import UniqueKeys from "./TableActions/UniqueKeys.js";
import Indices from "./TableActions/Indices.js";

const Inputcontainer = ({ fields, foreignKeys, uniqueKeys, handleAddField, handleAddForeignKey,handleAddUniqueKey, handleAddIndex, handleFieldChange, handleForeignKeyChange, handleUniqueKeyChange, handleIndexChange, handleRemoveField, handleRemoveForeignKey, handleRemoveUniqueKey, handleRemoveIndex, handleReset, handleTableData, handleToggleAdvanced, indices, migrateTable, onFieldChange, onToggleAdvanced, onAddField, onRemoveField, onForeignKeyAdd, onUniqueKeyAdd, onRemoveTableData, onIndexAdd, onAddTableData, onIndexChange, onIndexRemove, onForeignKeyChange, onUniqueKeyChange, onRemoveForeignKey, onRemoveUniqueKey, removeTableData, resetAll, setMigrateTable, setTableComment, setTableEngine, setTableName, setTableResource, showAdvanced, tableComment, tableCommentAdded, tableEngine,tableName, tableResource, tableTwiceClick }) => {
  return (
    <div className="input-container">
        <Tablename
          tableName={tableName}
          setTableName={setTableName}
          handleReset={resetAll}
        />

        <FieldTableData
          fields={fields}
          handleFieldChange={onFieldChange}
          handleToggleAdvanced={onToggleAdvanced}
          showAdvanced={showAdvanced}
          handleAddField={onAddField}
          handleRemoveField={onRemoveField}
        />

        <ActionButtons
          handleAddForeignKey={onForeignKeyAdd}
          handleAddUniqueKey={onUniqueKeyAdd}
          handleAddIndex={onIndexAdd}
          handleTableData={onAddTableData}
        />

        <TableMetaData
          tableCommentAdded={tableCommentAdded}
          tableTwiceClick={tableTwiceClick}
          tableComment={tableComment}
          setTableComment={setTableComment}
          tableEngine={tableEngine}
          setTableEngine={setTableEngine}
          tableResource={tableResource}
          setTableResource={setTableResource}
          migrateTable={migrateTable}
          setMigrateTable={setMigrateTable}
          removeTableData={onRemoveTableData}
        />

        <Indices
          fields={fields}
          indices={indices}
          handleIndexChange={onIndexChange}
          handleRemoveIndex={onIndexRemove}
        />

        <ForeignKeys
          fields={fields}
          foreignKeys={foreignKeys}
          handleForeignKeyChange={onForeignKeyChange}
          handleRemoveForeignKey={onRemoveForeignKey}
        />

        <UniqueKeys
          fields={fields}
          uniqueKeys={uniqueKeys}
          handleUniqueKeyChange={onUniqueKeyChange}
          handleRemoveUniqueKey={onRemoveUniqueKey}
        />
        
      </div>
  );
};

export default Inputcontainer;