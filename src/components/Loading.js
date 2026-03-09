import React from 'react';

const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
      <div className="text-center">
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted">Loading component...</p>
      </div>
    </div>
  );
};

export default Loading;
