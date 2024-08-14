import React from 'react';

const Indices = ({ fields, indices, handleIndexChange, handleRemoveIndex }) => {
  return (
      <>
        {indices.length > 0 && (
          <table className="indices table mt-4">
            <thead>
              <tr>
                <th>🔍 Select Column to Index</th>
                <th>
                  Index Type <span className="infolink">
                    <span className="infotext">
                      BTREE: The default and most versatile for general indexing
                      needs. e.g.product sku,price
                      <br /><br />
                      FULLTEXT: Best for text-heavy columns where search queries
                      involve natural language. e.g.product description
                      <br /><br />
                      HASH: Best for quick lookups on columns with unique
                      values, efficient for exact matches.
                      e.g.customerToken,sessionId<br /><br />
                      Note: Although Magento Docs describes hash, innodb & myisam doesn't support Hash index type <a href="https://github.com/magento/magento2/issues/37327" target="_blank" rel="noopener noreferrer">Link</a>
                    </span>
                  </span>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {indices.map((fk, index) => (
                <tr
                  key={index}
                  className={`${fk.isInvalid ? "tr-invalid tr-shake" : ""}`}
                >
                  <td>
                    <select
                      aria-label="Select column"
                      className="form-control"
                      name="currentColumn"
                      value={fk.currentColumn}
                      onChange={(e) => handleIndexChange(index, e)}
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
                    <select
                      aria-label="Index Type"
                      className="form-control"
                      name="indexType"
                      value={fk.indexType}
                      onChange={(e) => handleIndexChange(index, e)}
                    >
                      <option value="btree">btree</option>
                      <option value="fulltext">fulltext</option>
                      <option value="hash">hash</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveIndex(index)}
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

export default Indices;