import React from 'react';

const TableMetaData = ({ tableCommentAdded, tableTwiceClick, tableComment, setTableComment, tableEngine, setTableEngine, tableResource, setTableResource, migrateTable, setMigrateTable, removeTableData  }) => {
  return (
      <>
      {tableCommentAdded && (
          <table className="indices table mt-4">
            <thead>
              <tr>
                <th>💾 Table Comment</th>
                <th>
                  Engine <span className="infolink">
                    <span className="infotext">
                      <b>InnoDB</b>: Use this engine for most tables in Magento,
                      especially those that require data integrity, support for
                      transactions, and relationships between tables.
                      <br />
                      <br />
                      <b>Memory</b>: Use this engine for tables that need to be
                      accessed quickly and where data loss is acceptable, such
                      as temporary storage for session data or caching.
                    </span>
                  </span>
                </th>
                <th>
                  Resource <span className="infolink">
                    <span className="infotext">
                      <b>Resource</b> attribute is used to specify the database
                      shard where a particular table should be created.
                      <br />
                      <br />
                      By directing specific tables to different database shards,
                      Magento can distribute database load more efficiently.
                      This is particularly useful in high-traffic environments
                      where separating checkout and sales data from the main
                      database can help prevent bottlenecks.
                      <br />
                      <br />
                      <b>default</b>: For general-purpose tables.
                      <br />
                      <b>checkout</b>: For tables related to the checkout
                      process.
                      <br />
                      <b>sales</b>: For tables handling sales order data
                    </span>
                  </span>
                </th>
                <th>
                  Migrate Data From <span className="infolink">
                    <span className="infotext">
                      This is a DML trigger that allows you to move data from an
                      existing table to a newly created table. This trigger
                      works only when a table is created.
                    </span>
                  </span>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className={`${tableTwiceClick ? "tr-invalid tr-shake" : ""}`}>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    name="tableComment"
                    value={tableComment}
                    onChange={(e) => setTableComment(e.target.value)}
                  />
                </td>
                <td>
                  <select
                    className="form-control"
                    name="tableEngine"
                    value={tableEngine}
                    onChange={(e) => setTableEngine(e.target.value)}
                  >
                    <option value="">Select Engine</option>
                    <option value="innodb">innodb</option>
                    <option value="memory">memory</option>
                  </select>
                </td>
                <td>
                  <select
                    className="form-control"
                    name="tableResource"
                    value={tableResource}
                    onChange={(e) => setTableResource(e.target.value)}
                  >
                    <option value="">Select Resource</option>
                    <option value="default">default</option>
                    <option value="checkout">checkout</option>
                    <option value="sales">sales</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="tablename"
                    className="form-control"
                    name="migrateTable"
                    value={migrateTable}
                    onChange={(e) => setMigrateTable(e.target.value)}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeTableData()}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </>
  );
};

export default TableMetaData;