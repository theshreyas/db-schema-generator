import React from 'react';

const ActionButtons = ({ handleAddForeignKey, handleAddIndex, handleTableData}) => {
  return (
      <>
      <div className="row">
          <div className="col-sm-2">
            <button className="btn btn-primary" onClick={handleAddForeignKey}>
              Add Foreign Key
            </button>
          </div>
          <div className="col-sm-2">
            <button className="btn btn-primary" onClick={handleAddIndex}>
              Add Index
            </button>
          </div>
          <div className="col-sm-2">
            <button className="btn btn-primary" onClick={handleTableData}>
              Table Metadata
            </button>
          </div>
        </div>
      </>
  );
};

export default ActionButtons;