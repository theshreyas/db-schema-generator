import React from 'react';

const FieldRow = ({field, index, handleFieldChange, handleToggleAdvanced, showAdvanced, handleAddField, handleRemoveField}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          className="form-control"
          placeholder="Field Name"
          name="name"
          value={field.name}
          onChange={(event) => handleFieldChange(index, event)}
        />
      </td>
      <td>
        <select
          className="form-control"
          name="type"
          value={field.type}
          onChange={(event) => handleFieldChange(index, event)}>
          <optgroup label="Int">
            <option value="int">Integer</option>
            <option value="smallint">Smallint</option>
            <option value="bigint">Bigint</option>
          </optgroup>
          <optgroup label="Number">
            <option value="float">Float</option>
            <option value="decimal">Decimal</option>
          </optgroup>
          <optgroup label="Text">
            <option value="text">Text</option>
            <option value="varchar">Varchar</option>
            <option value="char">Char</option>
            <option value="json">Json</option>
            <option value="blob">Blob</option>
          </optgroup>
          <optgroup label="Time">
            <option value="datetime">Datetime</option>
            <option value="timestamp">Timestamp</option>
          </optgroup>
        </select>
      </td>
      <td>
        <div className="d-flex align-items-center">
          <button
            className="btn btn-primary mr-2"
            onClick={() => handleToggleAdvanced(index)}
          >
            {showAdvanced[index] ? (
              <>
                Hide Advanced <svg xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-chevron-up"
                  viewBox="0 0 16 16"
                >
                  <path fillRule="evenodd"
                    d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"
                  />
                </svg>
              </>
            ) : (
              <>
                Show Advanced <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-chevron-down"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                  />
                </svg>
              </>
            )}
          </button>
          <button
            className="btn btn-success mr-2"
            onClick={() => handleAddField(index)}
          >
            +
          </button>
          <button
            className="btn btn-danger mr-2"
            onClick={() => handleRemoveField(index)}
          >
            -
          </button>
        </div>
      </td>
    </tr>
  );
};

export default FieldRow;