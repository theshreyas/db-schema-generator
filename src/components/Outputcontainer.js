import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Outputcontainer = ({ shouldDisplaySchemaOutput, shouldDisplaySqlOutput, xmlOutput, mysqlOutput, handleDownloadSQL, handleCopySQL,handleDownloadXML, handleCopyXML, jsonOutput, handleDownloadJSON, handleCopyJSON }) => {
  return (
      <div className="output-container">
        {shouldDisplaySchemaOutput && (
          <div className="output-section">
            <h3>
              <b>db_schema.xml</b>
            </h3>
            <SyntaxHighlighter wrapLongLines="true" language="xml" style={dracula}>
              {xmlOutput}
            </SyntaxHighlighter>
            <button
              className="btn btn-secondary mr-2"
              onClick={handleDownloadXML}
            >
              Download
            </button>
            <button className="btn btn-secondary" onClick={handleCopyXML}>
              Copy Schema
            </button>
          </div>
        )}
        <div className="output-sub-container">
          {shouldDisplaySchemaOutput && (
            <div className="output-section">
              <h3>
                <b>db_schema_whitelist.json</b>
              </h3>
              <SyntaxHighlighter language="json" style={dracula}>
                {jsonOutput}
              </SyntaxHighlighter>
              <button
                className="btn btn-secondary mr-2"
                onClick={handleDownloadJSON}
              >
                Download
              </button>
              <button className="btn btn-secondary" onClick={handleCopyJSON}>
                Copy JSON
              </button>
            </div>
          )}

          {shouldDisplaySqlOutput && (
            <div className="output-section">
              <h3>
                <b>MySQL Query</b>
              </h3>
              <SyntaxHighlighter language="sql" style={dracula}>
                {mysqlOutput}
              </SyntaxHighlighter>
              <button
                className="btn btn-secondary mr-2"
                onClick={handleDownloadSQL}
              >Download</button>
              <button className="btn btn-secondary" onClick={handleCopySQL}>
                Copy Query
              </button>
            </div>
          )}
        </div>
      </div>
  );
};

export default Outputcontainer;