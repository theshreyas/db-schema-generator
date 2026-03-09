import { toast } from 'react-toastify';

/**
 * Consolidated file download utility
 * Handles downloading content as a file with proper cleanup
 * @param {string} content - The content to download
 * @param {string} filename - The name of the file to download as
 * @param {string} mimeType - The MIME type of the file (default: 'text/plain')
 */
export const downloadFile = (content, filename, mimeType = 'text/plain') => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

/**
 * Copy text to clipboard with toast notification
 * @param {string} text - The text to copy
 * @param {string} successMessage - Custom success message (optional)
 */
export const copyToClipboard = (text, successMessage = 'Copied to clipboard!') => {
  navigator.clipboard.writeText(text);
  toast.success(successMessage);
};

/**
 * Download SQL file
 * @param {string} tableName - The table name
 * @param {string} sqlOutput - The SQL content
 */
export const downloadSQL = (tableName, sqlOutput) => {
  downloadFile(sqlOutput, `create_table_${tableName}.sql`, 'text/plain');
};

/**
 * Copy SQL to clipboard
 * @param {string} sqlOutput - The SQL content
 */
export const copySQL = (sqlOutput) => {
  copyToClipboard(sqlOutput, 'Query copied to clipboard!');
};

/**
 * Download XML file
 * @param {string} xmlOutput - The XML content
 */
export const downloadXML = (xmlOutput) => {
  downloadFile(xmlOutput, 'db_schema.xml', 'application/xml');
};

/**
 * Copy XML to clipboard
 * @param {string} xmlOutput - The XML content
 */
export const copyXML = (xmlOutput) => {
  copyToClipboard(xmlOutput, 'Schema copied to clipboard!');
};

/**
 * Download JSON file
 * @param {string} jsonOutput - The JSON content
 */
export const downloadJSON = (jsonOutput) => {
  downloadFile(jsonOutput, 'db_schema_whitelist.json', 'application/json');
};

/**
 * Copy JSON to clipboard
 * @param {string} jsonOutput - The JSON content
 */
export const copyJSON = (jsonOutput) => {
  copyToClipboard(jsonOutput, 'Whitelist JSON copied to clipboard!');
};
