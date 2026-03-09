import React, { useState, useEffect, useCallback, useMemo, Suspense, lazy } from "react";
import { ToastContainer } from 'react-toastify';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { debounce } from "./utils/debounceUtils";
import ErrorBoundary from "./components/ErrorBoundary";
import Loading from "./components/Loading";
import Header from "./components/Header";
import Inputcontainer from "./components/Inputcontainer.js";
import Outputcontainer from "./components/Outputcontainer.js";
import {
  handleAddIndex,
  handleIndexChange,
  handleRemoveIndex,
  handleAddForeignKey,
  handleAddUniqueKey,
  handleForeignKeyChange,
  handleUniqueKeyChange,
  handleRemoveForeignKey,
  handleRemoveUniqueKey,
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

// Lazy load route components for code splitting
const About = lazy(() => import('./components/AboutSection'));
const Quiz = lazy(() => import('./components/Quiz'));
const DataTypes = lazy(() => import('./components/DataTypesSection'));
const QueryBuilder = lazy(() => import('./components/QueryBuilder.js'));

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
  const [tableCommentAdded, setTableCommentAdded] = useState(false);
  const [tableName, setTableName] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(fields.map(() => false));
  const [foreignKeys, setForeignKeys] = useState([]);
  const [uniqueKeys, setUniqueKeys] = useState([]);
  const [indices, setIndices] = useState([]);

  const generateJson = useCallback(() => {
    handleGenerateJSON(fields, indices, tableName, foreignKeys, setJsonOutput);
  }, [fields, indices, tableName, foreignKeys]);

  const generateSQL = useCallback(() => {
    !queryBuilder && handleGenerateSQL(fields, tableName, foreignKeys, uniqueKeys, indices, tableComment, tableEngine, setMysqlOutput);
  }, [fields, tableName, foreignKeys, uniqueKeys, indices, tableComment, tableEngine, queryBuilder]);

  const generateXml = useCallback(() => {
    handleGenerateXML(
      fields,
      tableName,
      foreignKeys,
      uniqueKeys,
      indices,
      migrateTable,
      tableComment,
      tableResource,
      tableEngine,
      setXmlOutput
    );
  }, [fields, tableName, foreignKeys, uniqueKeys, indices, migrateTable, tableComment, tableResource, tableEngine]);

  // Create debounced versions of output generators (300ms delay)
  const debouncedGenerateXml = useMemo(() => debounce(generateXml, 300), [generateXml]);
  const debouncedGenerateJson = useMemo(() => debounce(generateJson, 300), [generateJson]);
  const debouncedGenerateSQL = useMemo(() => debounce(generateSQL, 300), [generateSQL]);

  useEffect(() => {
    debouncedGenerateXml();
    debouncedGenerateJson();
    debouncedGenerateSQL();
  }, [debouncedGenerateXml, debouncedGenerateJson, debouncedGenerateSQL]);

  const queryToSchemaXml = useCallback(() => {
    queryBuilder && queryToSchema(mysqlQuery, setTableName, setIndices, setForeignKeys, setUniqueKeys, setTableEngine, setTableComment, setFields, setXmlOutput, setQueryError);
  }, [mysqlQuery, queryBuilder]);

  useEffect(() => {
    queryToSchemaXml();
  }, [queryToSchemaXml]);

  // Field handlers
  const onAddField = useCallback((index) => {
    handleAddField(index, fields, setFields, setShowAdvanced, showAdvanced);
  }, [fields, showAdvanced]);

  const onRemoveField = useCallback((index) => {
    handleRemoveField(index, fields, setFields, showAdvanced, setShowAdvanced);
  }, [fields, showAdvanced]);

  const onFieldChange = useCallback((index, event) => {
    handleFieldChange(index, event, fields, setFields, foreignKeys);
  }, [fields, foreignKeys]);

  const onToggleAdvanced = useCallback((index) => {
    handleToggleAdvanced(index, showAdvanced, setShowAdvanced);
  }, [showAdvanced]);

  // Foreign key handlers
  const onForeignKeyAdd = useCallback(() => {
    handleAddForeignKey(foreignKeys, setForeignKeys, indices, setIndices);
  }, [foreignKeys, indices]);

  const onForeignKeyChange = useCallback((index, event) => {
    handleForeignKeyChange(index, event, foreignKeys, setForeignKeys, fields);
  }, [foreignKeys, fields]);

  const onRemoveForeignKey = useCallback((index) => {
    handleRemoveForeignKey(index, foreignKeys, setForeignKeys);
  }, [foreignKeys]);

  // Unique key handlers
  const onUniqueKeyAdd = useCallback(() => {
    handleAddUniqueKey(uniqueKeys, setUniqueKeys);
  }, [uniqueKeys]);

  const onUniqueKeyChange = useCallback((index, selectedValues) => {
    handleUniqueKeyChange(index, selectedValues, uniqueKeys, setUniqueKeys);
  }, [uniqueKeys]);

  const onRemoveUniqueKey = useCallback((index) => {
    handleRemoveUniqueKey(index, uniqueKeys, setUniqueKeys);
  }, [uniqueKeys]);

  // Index handlers
  const onIndexAdd = useCallback(() => {
    handleAddIndex(indices, setIndices, foreignKeys, setForeignKeys);
  }, [indices, foreignKeys]);

  const onIndexChange = useCallback((index, selectedValue) => {
    handleIndexChange(index, selectedValue, indices, setIndices, fields);
  }, [indices, fields]);

  const onIndexRemove = useCallback((index) => {
    handleRemoveIndex(index, indices, setIndices);
  }, [indices]);

  // Table data handlers
  const onAddTableData = useCallback(() => {
    handleTableData(
      tableCommentAdded,
      setTableCommentAdded
    );
  }, [tableCommentAdded]);

  const onRemoveTableData = useCallback(() => {
    removeTableData(
      setTableCommentAdded,
      setTableEngine,
      setMigrateTable,
      setTableComment,
      setTableResource
    );
  }, []);

  const resetAll = useCallback(() => {
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
      setUniqueKeys,
      setIndices
    );
  }, []);

  // Output handlers
  const onDownloadXML = useCallback(() => {
    handleDownloadXML(xmlOutput);
  }, [xmlOutput]);

  const onCopyXML = useCallback(() => {
    handleCopyXML(xmlOutput);
  }, [xmlOutput]);

  const onDownloadSQL = useCallback(() => {
    handleDownloadSQL(tableName, mysqlOutput);
  }, [tableName, mysqlOutput]);

  const onCopySQL = useCallback(() => {
    handleCopySQL(mysqlOutput);
  }, [mysqlOutput]);

  const onDownloadJSON = useCallback(() => {
    handleDownloadJSON(jsonOutput);
  }, [jsonOutput]);

  const onCopyJSON = useCallback(() => {
    handleCopyJSON(jsonOutput);
  }, [jsonOutput]);

  // Memoize handler collections to prevent prop drilling inefficiencies
  const inputContainerProps = useMemo(() => ({
    fields,
    tableName,
    tableComment,
    tableCommentAdded,
    tableEngine,
    tableResource,
    migrateTable,
    showAdvanced,
    foreignKeys,
    uniqueKeys,
    indices,
    setTableName,
    setTableComment,
    setTableEngine,
    setTableResource,
    setMigrateTable,
    onAddField,
    onRemoveField,
    onFieldChange,
    onToggleAdvanced,
    onAddForeignKey: onForeignKeyAdd,
    onForeignKeyChange,
    onRemoveForeignKey,
    onAddUniqueKey: onUniqueKeyAdd,
    onUniqueKeyChange,
    onRemoveUniqueKey,
    onAddIndex: onIndexAdd,
    onIndexChange,
    onIndexRemove,
    onAddTableData,
    onRemoveTableData,
    onReset: resetAll,
  }), [fields, tableName, tableComment, tableCommentAdded, tableEngine, tableResource, 
      migrateTable, showAdvanced, foreignKeys, uniqueKeys, indices, setTableName, 
      setTableComment, setTableEngine, setTableResource, setMigrateTable, onAddField, 
      onRemoveField, onFieldChange, onToggleAdvanced, onForeignKeyAdd, onForeignKeyChange, 
      onRemoveForeignKey, onUniqueKeyAdd, onUniqueKeyChange, onRemoveUniqueKey, onIndexAdd, 
      onIndexChange, onIndexRemove, onAddTableData, onRemoveTableData, resetAll]);

  const shouldDisplaySchemaOutput = useMemo(
    () => tableName && fields.some(field => field.name) &&
      (!queryBuilder || (mysqlQuery && !queryError)),
    [tableName, fields, queryBuilder, mysqlQuery, queryError]
  );

  const shouldDisplaySqlOutput = useMemo(
    () => shouldDisplaySchemaOutput && !queryBuilder,
    [shouldDisplaySchemaOutput, queryBuilder]
  );

  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/datatypes" element={<DataTypes />} />
            <Route path="/" element={
          <div className="container mt-5">
            <Header queryBuilder={queryBuilder} setQueryBuilder={setQueryBuilder} />
            {!queryBuilder && (
              <Inputcontainer {...inputContainerProps} />
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
              shouldDisplaySchemaOutput={shouldDisplaySchemaOutput}
              shouldDisplaySqlOutput={shouldDisplaySqlOutput}
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
          } 
        />
      </Routes>
        </Suspense>
        <div className="footer">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/datatypes">MySQL DataTypes</Link>
          <Link to="/quiz">Quiz</Link>
          <a href="/system-config-generator">System Config Generator</a>
        </div>
        <ToastContainer hideProgressBar={true} autoClose={1900} theme="dark" />
      </Router>
    </ErrorBoundary>
  );
}

export default App;