import React from 'react';
import Select from 'react-select';

const UniqueKeys = ({ uniqueKeys, handleUniqueKeyChange, fields, handleRemoveUniqueKey }) => {
  const options = fields.map((field) => ({
    value: field.name,
    label: field.name
  }));
  return (
      <>
      {uniqueKeys.length > 0 && (
        <table className="foreignKeys table mt-4">
          <thead>
            <tr>
              <th>🏷️ Select Unique Constraint/s</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {uniqueKeys.map((uk, index) => (
              <tr
                key={index}
                className={`${uk.isInvalid ? "tr-invalid tr-shake" : ""}`}
              >
                <td>
                  <Select
                    value={options.filter(option => uk.uniqueColumns.includes(option.value))}
                    isMulti 
                    name="uniqueColumns"
                    options={options}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(selectedOptions) => {
                      const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
                      handleUniqueKeyChange(index, selectedValues);
                    }}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveUniqueKey(index)}
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

export default UniqueKeys;