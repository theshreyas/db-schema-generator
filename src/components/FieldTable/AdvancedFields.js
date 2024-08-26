import React from 'react';
import { Form } from "react-bootstrap";

const AdvancedFieldsRow = ({ showAdvanced, index, field, handleFieldChange}) => {
  return (
      <>
      {showAdvanced[index] && (
        <tr>
          <td colSpan="3">
            <div className="row additional">
              {["int", "smallint", "bigint", "float"].includes(field.type) && (
                <>
                  <div className="col-md-3">
                    <label>Unsigned <span className="infolink">
                        <span className="infotext">UNSIGNED , if specified, disallows negative values</span>
                      </span></label>
                    <Form.Check
                      type="switch"
                      id={`unsigned-${index}`}
                      name="unsigned"
                      checked={field.unsigned || false}
                      onChange={(event) =>
                        handleFieldChange(index, event)
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label>Identity (Auto Increment)</label>
                    <Form.Check
                      type="switch"
                      id={`identity-${index}`}
                      name="identity"
                      checked={field.identity || false}
                      onChange={(event) =>
                        handleFieldChange(index, event)
                      }
                    />
                  </div>
                </>
              )}
              {field.type === "decimal" && (
                <>
                  <div className="col-md-3">
                    <label>
                      Precision <span className="infolink">
                        <span className="infotext">
                          The number of allowed digits.
                          <br/>
                          <br/> E.g. DECIMAL(7,3). (precision,scale){" "}
                          <br/>
                          This column will have a total size of 7
                          digits where 3 of these will be used for
                          precision representation.
                          <br/>
                          So, in summary, for that column you would
                          have a max value of: 9999.999 & min value of
                          -9999.999
                        </span>
                      </span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="precision"
                      min="1"
                      max="65"
                      value={field.precision || 10}
                      onChange={(event) =>
                        handleFieldChange(index, event)
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label>
                      Scale <span className="infolink">
                        <span className="infotext">
                          The number of digits after the decimal
                        </span>
                      </span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="scale"
                      min="0"
                      max="30"
                      value={field.scale || 0}
                      onChange={(event) =>
                        handleFieldChange(index, event)
                      }
                    />
                  </div>
                </>
              )}
              {["varchar", "char", "varbinary"].includes(field.type) && (
                <div className="col-md-3">
                  <label>Length</label>
                  <input
                    type="number"
                    className="form-control"
                    name="length"
                    min="1"
                    max="65535"
                    value={field.length || 255}
                    onChange={(event) =>
                      handleFieldChange(index, event)
                    }
                  />
                </div>
              )}
              <div className="col-md-3">
                <label>
                  Not Null (
                  {field.nullable || false
                    ? "nullable : false"
                    : "nullable : true"}
                  )
                </label>
                <Form.Check
                  type="switch"
                  id={`nullable-${index}`}
                  name="nullable"
                  checked={field.nullable || false}
                  onChange={(event) =>
                    handleFieldChange(index, event)
                  }
                />
              </div>
              {!["text", "blob", "json"].includes(field.type) && (
                <div className="col-md-3">
                  <label>Primary</label>
                  <Form.Check
                    type="switch"
                    id={`primary-${index}`}
                    name="primary"
                    checked={field.primary || false}
                    onChange={(event) =>
                      handleFieldChange(index, event)
                    }
                  />
                </div>
              )}
              {["datetime", "timestamp"].includes(field.type) && (
                <>
                  <div className="col-md-3">
                    <label>On Update <span className="infolink"><span className="infotext">If set to yes, whenever there is update in the row, it will update the column with current timestamp value.</span></span></label>
                    <Form.Check
                      type="switch"
                      id={`on_update-${index}`}
                      name="on_update"
                      checked={field.on_update || false}
                      onChange={(event) =>
                        handleFieldChange(index, event)
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label>Default Value</label>
                    <select
                      aria-label="Default"
                      className="form-control"
                      name="defaultTime"
                      value={field.defaultTime}
                      onChange={(event) => handleFieldChange(index,event)}
                    >
                        <option value="">No Default Value</option>
                        <option value="0">0000-00-00 00:00:00</option>
                        <option value="CURRENT_TIMESTAMP">Current Timestamp</option>
                    </select>
                  </div>
                </>
              )}
              {!["datetime", "timestamp", "text", "blob", "json"].includes(field.type) && !field.identity && (
                <div className="col-md-3">
                  <label>Default Value</label>
                  <input
                    type="text"
                    className="form-control"
                    name="defaultValue"
                    value={field.defaultValue || ""}
                    onChange={(event) =>
                      handleFieldChange(index, event)
                    }
                  />
                </div>
              )}
              <div className="col-md-3">
                <label>Comment</label>
                <input
                  type="text"
                  className="form-control"
                  name="comment"
                  value={field.comment || ""}
                  onChange={(event) =>
                    handleFieldChange(index, event)
                  }
                />
              </div>
            </div>
          </td>
        </tr>
      )}
      </>
  );
};

export default AdvancedFieldsRow;