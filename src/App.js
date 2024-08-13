import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header.js";
import Tablename from "./components/FieldTable/Tablename.js";
import FieldTableData from "./components/FieldTable/FieldTableData.js";
import Outputcontainer from "./components/Outputcontainer.js";
import TableMetaData from "./components/TableActions/TableMetaData.js";
import ActionButtons from "./components/TableActions/ActionButtons.js";
import ForeignKeys from "./components/TableActions/ForeignKeys.js";
import Indices from "./components/TableActions/Indices.js";
import {
  handleAddIndex,
  handleIndexChange,
  handleRemoveIndex,
  handleAddForeignKey,
  handleForeignKeyChange,
  handleRemoveForeignKey,
  handleTableData,
  removeTableData,
  handleReset,
} from "./utils/TableActionUtils";
import {
  handleAddField,
  handleRemoveField,
  handleFieldChange,
  handleToggleAdvanced,
} from "./utils/FieldActionUtils";
import {
  handleGenerateXML,
  handleDownloadXML,
  handleCopyXML,
} from "./utils/XmlActionUtils";
import {
  handleGenerateJSON,
  handleDownloadJSON,
  handleCopyJSON,
} from "./utils/JsonActionUtils";

function App() {
  const [fields, setFields] = useState([
    { name: "", type: "varchar", length: 255, identity: false },
  ]);
  const [xmlOutput, setXmlOutput] = useState("");
  const [tableEngine, setTableEngine] = useState("");
  const [tableResource, setTableResource] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const [migrateTable, setMigrateTable] = useState("");
  const [tableComment, setTableComment] = useState("");
  const [tableTwiceClick, setTableTwiceClick] = useState(false);
  const [tableCommentAdded, setTableCommentAdded] = useState(false);
  const [tableName, setTableName] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(fields.map(() => false));
  const [foreignKeys, setForeignKeys] = useState([]);
  const [indices, setIndices] = useState([]);

  useEffect(() => {
    generateXml();
    generateJson();
  }, [
    fields,
    tableName,
    foreignKeys,
    indices,
    migrateTable,
    tableComment,
    tableResource,
    tableEngine,
  ]);

  const onForeignKeyAdd = () => {
    handleAddForeignKey(foreignKeys, setForeignKeys, indices, setIndices);
  };

  const onIndexAdd = () => {
    handleAddIndex(indices, setIndices, foreignKeys, setForeignKeys);
  };

  const onAddField = (index) => {
    handleAddField(index, fields, setFields, setShowAdvanced, showAdvanced);
  };

  const onRemoveField = (index) => {
    handleRemoveField(index, fields, setFields, showAdvanced, setShowAdvanced);
  };

  const onFieldChange = (index, event) => {
    handleFieldChange(index, event, fields, setFields);
  };

  const onToggleAdvanced = (index) => {
    handleToggleAdvanced(index, showAdvanced, setShowAdvanced);
  };

  const onDownloadXML = () => {
    handleDownloadXML(xmlOutput);
  };

  const onCopyXML = () => {
    handleCopyXML(xmlOutput);
  };

  const generateJson = () => {
    handleGenerateJSON(fields, indices, tableName, foreignKeys, setJsonOutput);
  };

  const onDownloadJSON = () => {
    handleDownloadJSON(jsonOutput);
  };

  const onCopyJSON = () => {
    handleCopyJSON(jsonOutput);
  };

  const resetAll = () => {
    handleReset(
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
    );
  };

  const onAddTableData = () => {
    handleTableData(
      tableCommentAdded,
      setTableTwiceClick,
      setTableCommentAdded
    );
  };

  const onRemoveTableData = () => {
    removeTableData(
      setTableCommentAdded,
      setTableEngine,
      setMigrateTable,
      setTableComment,
      setTableResource
    );
  };

  const onIndexChange = (index, event) => {
    handleIndexChange(index, event, indices, setIndices);
  };

  const onIndexRemove = (index) => {
    handleRemoveIndex(index, indices, setIndices);
  };

  const onForeignKeyChange = (index, event) => {
    handleForeignKeyChange(index, event, foreignKeys, setForeignKeys);
  };

  const onRemoveForeignKey = (index) => {
    handleRemoveForeignKey(index, foreignKeys, setForeignKeys);
  };

  const generateXml = () => {
    handleGenerateXML(
      fields,
      tableName,
      foreignKeys,
      indices,
      migrateTable,
      tableComment,
      tableResource,
      tableEngine,
      setXmlOutput
    );
  };

  const shouldDisplayXmlOutput = () => {
    return tableName && fields.some((field) => field.name);
  };

  const shouldDisplayJsonOutput = () => {
    return tableName && fields.some((field) => field.name);
  };

  return (
    <div className="container mt-5">
      <Header />
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
      </div>
      <hr />
      <Outputcontainer
        shouldDisplayXmlOutput={shouldDisplayXmlOutput()}
        shouldDisplayJsonOutput={shouldDisplayJsonOutput()}
        xmlOutput={xmlOutput}
        jsonOutput={jsonOutput}
        handleDownloadXML={onDownloadXML}
        handleCopyXML={onCopyXML}
        handleDownloadJSON={onDownloadJSON}
        handleCopyJSON={onCopyJSON}
      />
    </div>
  );
}

export default App;