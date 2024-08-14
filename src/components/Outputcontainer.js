import React from 'react';

const Outputcontainer = ({ shouldDisplayOutput, xmlOutput, mysqlOutput, handleDownloadSQL,handleCopySQL,handleDownloadXML, handleCopyXML, jsonOutput, handleDownloadJSON, handleCopyJSON }) => {
  return (
      <div className="output-container">
        {shouldDisplayOutput && (
          <div className="output-section">
            <h3>
              <b>db_schema.xml</b>
            </h3>
            <pre>{xmlOutput}</pre>
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
          {shouldDisplayOutput && (
            <div className="output-section">
              <h3>
                <b>db_schema_whitelist.json</b>
              </h3>
              <pre>{jsonOutput}</pre>
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

          {shouldDisplayOutput && (
            <div className="output-section">
              <h3>
                <b>MySQL Query</b>
              </h3>
              <pre>{mysqlOutput}</pre>
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