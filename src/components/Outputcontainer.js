import React from 'react';

const Outputcontainer = ({ shouldDisplayXmlOutput, xmlOutput, handleDownloadXML, handleCopyXML, shouldDisplayJsonOutput, jsonOutput, handleDownloadJSON, handleCopyJSON }) => {
  return (
      <div className="output-container">
        {shouldDisplayXmlOutput && (
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

        {shouldDisplayJsonOutput && (
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
      </div>
  );
};

export default Outputcontainer;