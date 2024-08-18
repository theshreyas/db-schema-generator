import React from 'react';

const QueryBuilder = ({  mysqlQuery, setMysqlQuery, queryError }) => {
  return (
      <div className="querybuilder col-xs-10">
        <textarea rows="14" value={mysqlQuery || ""} placeholder="Enter MySQL create table Query" onChange={(e) => setMysqlQuery(e.target.value)} className={queryError ? "error form-control" : "form-control"}></textarea>
        {mysqlQuery && queryError && (
          <>
            <span className="validation">{queryError} <span>Check console for details or <a href="https://en.rakko.tools/tools/36/" target="_blank" rel="noopener noreferrer">validate online</a></span></span>
          </>
        )}
      </div>
  );
};

export default QueryBuilder;