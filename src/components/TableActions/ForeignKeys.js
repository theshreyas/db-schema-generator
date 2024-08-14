import React from 'react';

const ForeignKeys = ({ foreignKeys, handleForeignKeyChange, fields, handleRemoveForeignKey }) => {
  return (
      <>
      {foreignKeys.length > 0 && (
        <table className="foreignKeys table mt-4">
          <thead>
            <tr>
              <th>🔑 Select Column</th>
              <th>Foreign Reference Table</th>
              <th>Reference Column</th>
              <th>
                On Delete <span className="infolink">
                  <span className="infotext">
                    If a record in the parent table (referenced table) is
                    deleted, then related records in the child table
                    (referencing table)
                    <br /><br />
                    CASCADE: Will be automatically deleted.
                    <br />
                    SET NULL: Will be set to NULL.
                    <br />
                    NO ACTION: Will be unchanged
                  </span>
                </span>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {foreignKeys.map((fk, index) => (
              <tr
                key={index}
                className={`${fk.isInvalid ? "tr-invalid tr-shake" : ""}`}
              >
                <td>
                  <select
                    aria-label="Current Column"
                    className="form-control"
                    name="currentColumn"
                    value={fk.currentColumn}
                    onChange={(e) => handleForeignKeyChange(index, e)}
                  >
                    <option value="">Select Column</option>
                    {fields
                      .filter((field) => field.name)
                      .map((field, index) => (
                        <option key={index} value={field.name}>
                          {field.name}
                        </option>
                      ))}
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    name="referenceTable"
                    value={fk.referenceTable}
                    onChange={(e) => handleForeignKeyChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    name="referenceColumn"
                    value={fk.referenceColumn}
                    onChange={(e) => handleForeignKeyChange(index, e)}
                  />
                </td>
                <td>
                  <select
                    aria-label="On Delete"
                    className="form-control"
                    name="onDelete"
                    value={fk.onDelete}
                    onChange={(e) => handleForeignKeyChange(index, e)}
                  >
                    <option value="CASCADE">CASCADE</option>
                    <option value="SET NULL">SET NULL</option>
                    <option value="NO ACTION">NO ACTION</option>
                  </select>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveForeignKey(index)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </>
  );
};

export default ForeignKeys;