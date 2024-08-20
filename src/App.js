import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header.js";
import Inputcontainer from "./components/Inputcontainer.js";
import Outputcontainer from "./components/Outputcontainer.js";
import QueryBuilder from "./components/QueryBuilder.js";
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
  queryToSchema
} from "./utils/QueryToSchemaActionUtils";

import {
  handleAddField,
  handleRemoveField,
  handleFieldChange,
  handleToggleAdvanced,
} from "./utils/FieldActionUtils";

import {
  handleGenerateSQL,
  handleDownloadSQL,
  handleCopySQL
} from "./utils/SqlActionUtils";

import {
  handleGenerateXML,
  handleDownloadXML,
  handleCopyXML
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
  const [mysqlQuery, setMysqlQuery] = useState("");
  const [queryError, setQueryError] = useState(false);
  const [queryBuilder, setQueryBuilder] = useState(false);
  const [mysqlOutput, setMysqlOutput] = useState("");
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
    generateSQL();
  }, [
    fields,
    tableName,
    foreignKeys,
    indices,
    migrateTable,
    tableComment,
    tableResource,
    tableEngine,
    mysqlQuery,
    queryBuilder
  ]);

  useEffect(() => {
    queryToSchemaXml();
  }, [
    mysqlQuery,
    tableName
  ]);

  const queryToSchemaXml = () => {
    queryBuilder && queryToSchema(mysqlQuery, setTableName, setIndices, setForeignKeys,setTableEngine, setTableComment, setFields, setXmlOutput, setQueryError);
  };

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
    handleFieldChange(index, event, fields, setFields, foreignKeys);
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

  const generateSQL = () => {
    !queryBuilder && handleGenerateSQL(fields, tableName, foreignKeys, indices, tableComment, tableEngine, setMysqlOutput);
  };

  const onDownloadSQL = () => {
    handleDownloadSQL(tableName, mysqlOutput);
  };

  const onCopySQL = () => {
    handleCopySQL(mysqlOutput);
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
    handleForeignKeyChange(index, event, foreignKeys, setForeignKeys, fields);
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

  const shouldDisplaySchemaOutput = () =>
    tableName && fields.some(field => field.name) &&
    (!queryBuilder || (queryBuilder && mysqlQuery && !queryError));

  const shouldDisplaySqlOutput = () => {
    return shouldDisplaySchemaOutput() && !queryBuilder;
  };

  return (
    <div className="container mt-5">
      <Header queryBuilder={queryBuilder} setQueryBuilder={setQueryBuilder} />
      {!queryBuilder && (
        <Inputcontainer 
          fields={fields}
          foreignKeys={foreignKeys}
          handleAddField={onAddField}
          handleAddForeignKey={onForeignKeyAdd}
          handleAddIndex={onIndexAdd}
          handleFieldChange={onFieldChange}
          handleForeignKeyChange={onForeignKeyChange}
          handleIndexChange={onIndexChange}
          handleRemoveField={onRemoveField}
          handleRemoveForeignKey={onRemoveForeignKey}
          handleRemoveIndex={onIndexRemove}
          handleReset={resetAll}
          handleTableData={onAddTableData}
          handleToggleAdvanced={onToggleAdvanced}
          indices={indices}
          migrateTable={migrateTable}
          onAddField={onAddField}
          onAddTableData={onAddTableData}
          onFieldChange={onFieldChange}
          onForeignKeyAdd={onForeignKeyAdd}
          onForeignKeyChange={onForeignKeyChange}
          onIndexAdd={onIndexAdd}
          onIndexChange={onIndexChange}
          onIndexRemove={onIndexRemove}
          onRemoveField={onRemoveField}
          onRemoveForeignKey={onRemoveForeignKey}
          onRemoveTableData={onRemoveTableData}
          onToggleAdvanced={onToggleAdvanced}
          removeTableData={onRemoveTableData}
          resetAll={resetAll}
          setMigrateTable={setMigrateTable}
          setTableComment={setTableComment}
          setTableEngine={setTableEngine}
          setTableName={setTableName}
          setTableResource={setTableResource}
          showAdvanced={showAdvanced}
          tableComment={tableComment}
          tableCommentAdded={tableCommentAdded}
          tableEngine={tableEngine}
          tableName={tableName}
          tableResource={tableResource}
          tableTwiceClick={tableTwiceClick}
        />
      )}
      {queryBuilder && (
        <QueryBuilder
          queryBuilder={queryBuilder}
          mysqlQuery={mysqlQuery}
          setMysqlQuery={setMysqlQuery}
          queryError={queryError}
        />
      )}
      <hr />
      <Outputcontainer
        shouldDisplaySchemaOutput={shouldDisplaySchemaOutput()}
        shouldDisplaySqlOutput={shouldDisplaySqlOutput()}
        xmlOutput={xmlOutput}
        mysqlOutput={mysqlOutput}
        jsonOutput={jsonOutput}
        handleDownloadXML={onDownloadXML}
        handleCopyXML={onCopyXML}
        handleDownloadSQL={onDownloadSQL}
        handleCopySQL={onCopySQL}
        handleDownloadJSON={onDownloadJSON}
        handleCopyJSON={onCopyJSON}
      />
    </div>
  );
}

export default App;