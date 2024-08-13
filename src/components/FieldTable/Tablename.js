import React from 'react';

const Tablename = ({tableName, setTableName, handleReset}) => {
  return (
    <>
      <div className="form-group">
          <label>
            <b>Table Name</b>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Table Name"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
          />
        </div>
        <button className="resetBtn btn btn-primary ml-2" onClick={handleReset}>
          Reset All
        </button>
    </>
  );
};

export default Tablename;