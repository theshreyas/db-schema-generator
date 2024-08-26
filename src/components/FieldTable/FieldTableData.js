import React from 'react';
import FieldRow from "./FieldRow.js";
import AdvancedFieldsRow from "./AdvancedFields.js";

const FieldTableData = ({fields, handleFieldChange, handleToggleAdvanced, showAdvanced, handleAddField, handleRemoveField}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Field Name</th>
          <th>Input Type <a className="infolink" href="/db-schema-generator/#/datatypes" target="_blank" rel="noopener noreferrer"> </a>
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {fields.map((field, index) => (
          <React.Fragment key={index}>
            <FieldRow field={field} index={index} handleFieldChange={handleFieldChange} handleToggleAdvanced={handleToggleAdvanced} showAdvanced={showAdvanced} handleAddField={handleAddField} handleRemoveField={handleRemoveField} />
            <AdvancedFieldsRow showAdvanced={showAdvanced} index={index} field={field} handleFieldChange={handleFieldChange} />
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default FieldTableData;