import React from 'react';
import Select from 'react-select';

const Indices = ({ fields, indices, handleIndexChange, handleRemoveIndex }) => {

  const columnOptions = fields.map((field) => ({
    value: field.name,
    label: field.name
  }));
  const indexTypeOptions = [
    { value: 'btree', label: 'btree' },
    { value: 'fulltext', label: 'fulltext' },
    { value: 'hash', label: 'hash' }
  ];
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
              {indices.map((row, index) => (
                <tr
                  key={index}
                  className={`${row.isInvalid ? "tr-invalid tr-shake" : ""}`}
                >
                  <td>
                    <Select
                      value={columnOptions.filter(option => row.columnsToIndex.includes(option.value))}
                      aria-label="Columns to Index"
                      isMulti 
                      name="columnsToIndex"
                      options={columnOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={(selectedOptions) => {
                        const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
                        handleIndexChange(index, selectedValues);
                      }}
                    />
                  </td>
                  <td>
                    <Select
                      value={indexTypeOptions.find(option => option.value === row.indexType)}
                      onChange={(selectedOption) => handleIndexChange(index, selectedOption.value)}
                      options={indexTypeOptions}
                      className="basic-single"
                      classNamePrefix="select"
                      name="indexType"
                      aria-label="Index Type"
                    />
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