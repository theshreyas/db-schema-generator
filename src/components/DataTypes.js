import React from "react";

function DataTypesSection() {
  return (
      <div className="container mt-5">
        <h1 className="abHeading"> All MySQL Data types</h1>
          <div className="tg-wrap">
          <table id="tg-WCFlG" className="tg"><thead>
            <tr>
              <td className="tg-0pky">{{"key"\,"value"}}</td>
              <th className="tg-j1i3 width-6"></th>
              <th className="tg-dncm width-8">Data Type</th>
              <th className="tg-dncm width-6">Magento Type</th>
              <th className="tg-dncm">Description</th>
              <th className="tg-dncm">Range</th>
              <th className="tg-dncm width-6">Default Value</th>
              <th className="tg-dncm width-8">Storage Size</th>
              <th className="tg-dncm">Use Cases</th>
              <th className="tg-dncm">Example Values</th>
              <th className="tg-dncm width-6">Auto Increment</th>
              <th className="tg-dncm width-6">Indexable</th>
              <th className="tg-dncm width-6">Partitioning</th>
              <th className="tg-dncm width-6">Performance Impact</th>
            </tr></thead>
            <tbody>
              <tr>
                <td className="tg-fymr" rowSpan="8">Numeric Data Types</td>
                <td className="tg-phtq bold">TINYINT</td>
                <td className="tg-phtq bold">boolean</td>
                <td className="tg-phtq">A very small integer.</td>
                <td className="tg-phtq">-128 to 127 (signed) / 0 to 255 (unsigned)</td>
                <td className="tg-phtq">0</td>
                <td className="tg-phtq">1 byte</td>
                <td className="tg-phtq">Boolean flags, small counters</td>
                <td className="tg-phtq">0, 1, 127</td>
                <td className="tg-phtq">Yes</td>
                <td className="tg-phtq">Yes</td>
                <td className="tg-phtq">Yes</td>
                <td className="tg-phtq">Low</td>
              </tr>
              <tr>
                <td className="tg-0pky bold">SMALLINT</td>
                <td className="tg-0pky bold">smallint</td>
                <td className="tg-0pky">A small integer.</td>
                <td className="tg-0pky">-32,768 to 32,767 (signed) / 0 to 65,535 (unsigned)</td>
                <td className="tg-0pky">0</td>
                <td className="tg-0pky">2 bytes</td>
                <td className="tg-0pky">Small counters, status codes</td>
                <td className="tg-0pky">100, 30000</td>
                <td className="tg-0pky">Yes</td>
                <td className="tg-0pky">Yes</td>
                <td className="tg-0pky">Yes</td>
                <td className="tg-0pky">Low</td>
              </tr>
              <tr>
                <td className="tg-phtq bold">MEDIUMINT</td>
                <td className="tg-phtq bold">int</td>
                <td className="tg-phtq">A medium-sized integer.</td>
                <td className="tg-phtq">-8,388,608 to 8,388,607 (signed) / 0 to 16,777,215 (unsigned)</td>
                <td className="tg-phtq">0</td>
                <td className="tg-phtq">3 bytes</td>
                <td className="tg-phtq">Large counters, file sizes</td>
                <td className="tg-phtq">1000, 7000000</td>
                <td className="tg-phtq">Yes</td>
                <td className="tg-phtq">Yes</td>
                <td className="tg-phtq">Yes</td>
                <td className="tg-phtq">Low</td>
              </tr>
              <tr>
                <td className="tg-0pky bold">INT or INTEGER</td>
                <td className="tg-0pky bold">int</td>
                <td className="tg-0pky">A standard integer.</td>
                <td className="tg-0pky">-2,147,483,648 to 2,147,483,647 (signed) / 0 to 4,294,967,295 (unsigned)</td>
                <td className="tg-0pky">0</td>
                <td className="tg-0pky">4 bytes</td>
                <td className="tg-0pky">Primary keys, large counters</td>
                <td className="tg-0pky">100000, 2147483647</td>
                <td className="tg-0pky">Yes</td>
                <td className="tg-0pky">Yes</td>
                <td className="tg-0pky">Yes</td>
                <td className="tg-0pky">Low</td>
              </tr>
              <tr>
                <td className="tg-phtq bold">BIGINT</td>
                <td className="tg-phtq bold">bigint</td>
                <td className="tg-phtq">A large integer.</td>
                <td className="tg-phtq">-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 (signed) / 0 to 18,446,744,073,709,551,615 (unsigned)</td>
                <td className="tg-phtq">0</td>
                <td className="tg-phtq">8 bytes</td>
                <td className="tg-phtq">Large integers, file sizes, IDs</td>
                <td className="tg-phtq">1000000000, 9223372036854775807</td>
                <td className="tg-phtq">Yes</td>
                <td className="tg-phtq">Yes</td>
                <td className="tg-phtq">Yes</td>
                <td className="tg-phtq">Medium</td>
              </tr>
              <tr>
                <td className="tg-0pky bold">FLOAT</td>
                <td className="tg-0pky bold">decimal</td>
                <td className="tg-0pky">A floating-point number.</td>
                <td className="tg-0pky">-3.402823466E+38 to 3.402823466E+38 (approx.)</td>
                <td className="tg-0pky">NULL</td>
                <td className="tg-0pky">4 bytes</td>
                <td className="tg-0pky">Precise floating-point numbers</td>
                <td className="tg-0pky">3.14, 2.71828</td>
                <td className="tg-0pky">No</td>
                <td className="tg-0pky">No</td>
                <td className="tg-0pky">No</td>
                <td className="tg-0pky">Medium</td>
              </tr>
              <tr>
                <td className="tg-phtq bold">DOUBLE</td>
                <td className="tg-phtq bold">decimal</td>
                <td className="tg-phtq">A double-precision floating-point number.</td>
                <td className="tg-phtq">-1.7976931348623157E+308 to 1.7976931348623157E+308 (approx.)</td>
                <td className="tg-phtq">NULL</td>
                <td className="tg-phtq">8 bytes</td>
                <td className="tg-phtq">Double-precision floating-point numbers</td>
                <td className="tg-phtq">1.234567, 9.87654321</td>
                <td className="tg-phtq">No</td>
                <td className="tg-phtq">No</td>
                <td className="tg-phtq">No</td>
                <td className="tg-phtq">Medium</td>
              </tr>
              <tr>
                <td className="tg-0pky bold">DECIMAL</td>
                <td className="tg-0pky bold">decimal</td>
                <td className="tg-0pky">A fixed-point number. Can store exact values without rounding errors.</td>
                <td className="tg-0pky">Varies depending on the specified precision and scale</td>
                <td className="tg-0pky">0</td>
                <td className="tg-0pky">Varies</td>
                <td className="tg-0pky">Fixed-point numbers, currency</td>
                <td className="tg-0pky">123.45, 67890.1234</td>
                <td className="tg-0pky">No</td>
                <td className="tg-0pky">No</td>
                <td className="tg-0pky">No</td>
                <td className="tg-0pky">High</td>
              </tr>
              <tr>
                <td className="tg-fymr" rowSpan="5">Date and Time Data Types</td>
                <td className="tg-phtq bold">DATE</td>
                <td className="tg-phtq bold">date</td>
                <td className="tg-phtq">A date value in 'YYYY-MM-DD' format.</td>
                <td className="tg-phtq">1000-01-01 to 9999-12-31</td>
                <td className="tg-phtq">0000-00-00</td>
                <td className="tg-phtq">3 bytes</td>
                <td className="tg-phtq">Date without time</td>
                <td className="tg-phtq">'2024-08-21</td>
                <td className="tg-phtq">No</td>
                <td className="tg-phtq">Yes</td>
                <td className="tg-phtq">Yes</td>
                <td className="tg-phtq">Low</td>
              </tr>
              <tr>
                <td className="tg-0pky bold">DATETIME</td>
                <td className="tg-0pky bold">datetime</td>
                <td className="tg-0pky">A date and time combination in 'YYYY-MM-DD HH:MM' format.</td>
                <td className="tg-0pky">1000-01-01 00:00:00 to '9999-12-31 23:59:59'</td>
                <td className="tg-0pky">0000-00-00 00:00:00</td>
                <td className="tg-0pky">5 bytes</td>
                <td className="tg-0pky">Date and time</td>
                <td className="tg-0pky">'2024-08-21 15:30:00'</td>
                <td className="tg-0pky">No</td>
                <td className="tg-0pky">Yes</td>
                <td className="tg-0pky">Yes</td>
                <td className="tg-0pky">Low</td>
              </tr>
              <tr>
                <td className="tg-phtq bold">TIMESTAMP</td>
                <td className="tg-phtq bold">timestamp</td>
                <td className="tg-phtq">A timestamp value in 'YYYY-MM-DD HH:MM' format. Automatically updates when the row is modified.</td>
                <td className="tg-phtq">1970-01-01 00:00:01' UTC to '2038-01-19 03:14:07' UTC</td>
                <td className="tg-phtq">CURRENT_TIMESTAMP</td>
                <td className="tg-phtq">4 bytes</td>
                <td className="tg-phtq">Date and time with timezone</td>
                <td className="tg-phtq">'2024-08-21 15:30:00'</td>
                <td className="tg-phtq">No</td>
                <td className="tg-phtq">Yes</td>
                <td className="tg-phtq">Yes</td>
                <td className="tg-phtq">Low</td>
              </tr>
              <tr>
                <td className="tg-0pky bold">TIME</td>
                <td className="tg-0pky bold">time</td>
                <td className="tg-0pky">A time value in 'HH:MM' format.</td>
                <td className="tg-0pky">-838:59:59' to '838:59:59'</td>
                <td className="tg-0pky">00:00:00</td>
                <td className="tg-0pky">3 bytes</td>
                <td className="tg-0pky">Time without date</td>
                <td className="tg-0pky">'15:30:00'</td>
                <td className="tg-0pky">No</td>
                <td className="tg-0pky">No</td>
                <td className="tg-0pky">No</td>
                <td className="tg-0pky">Low</td>
              </tr>
              <tr>
                <td className="tg-phtq bold">YEAR</td>
                <td className="tg-phtq bold">No</td>
                <td className="tg-phtq">A year value in YYYY format.</td>
                <td className="tg-phtq">1901 to 2155</td>
                <td className="tg-phtq">0</td>
                <td className="tg-phtq">1 byte</td>
                <td className="tg-phtq">Year</td>
                <td className="tg-phtq">2024</td>
                <td className="tg-phtq">No</td>
                <td className="tg-phtq">Yes</td>
                <td className="tg-phtq">Yes</td>
                <td className="tg-phtq">Low</td>
              </tr>
              <tr>
                <td className="tg-fymr" rowSpan="14">String Data Types</td>
                <td className="tg-0pky bold">CHAR</td>
                <td className="tg-0pky bold">text</td>
                <td className="tg-0pky">A fixed-length string.</td>
                <td className="tg-0pky">0 to 255 characters</td>
                <td className="tg-0pky">' (empty string)</td>
                <td className="tg-0pky">1 byte per char</td>
                <td className="tg-0pky">Fixed-length strings</td>
                <td className="tg-0pky">'A', 'Hello'</td>
                <td className="tg-0pky">No</td>
                <td className="tg-0pky">Yes</td>
                <td className="tg-0pky">No</td>
                <td className="tg-0pky">Low</td>
              </tr>
              <tr>
                <td className="tg-phtq bold">VARCHAR</td>
                <td className="tg-phtq bold">text</td>
                <td className="tg-phtq">A variable-length string.</td>
                <td className="tg-phtq">0 to 65,535 characters, depending on the maximum row size</td>
                <td className="tg-phtq">NULL</td>
                <td className="tg-phtq">Varies</td>
                <td className="tg-phtq">Variable-length strings</td>
                <td className="tg-phtq">'Example', 'Test123'</td>
                <td className="tg-phtq">No</td>
                <td className="tg-phtq">Yes</td>
                <td className="tg-phtq">No</td>
                <td className="tg-phtq">Medium</td>
              </tr>
              <tr>
                <td className="tg-0pky bold">BINARY</td>
                <td className="tg-0pky bold">No</td>
                <td className="tg-0pky">Similar to CHAR, but stores binary byte strings.</td>
                <td className="tg-0pky">0 to 255 bytes</td>
                <td className="tg-0pky">\0'</td>
                <td className="tg-0pky">1 byte per char</td>
                <td className="tg-0pky">Fixed-length binary data</td>
                <td className="tg-0pky">'\0\0\0', '\x01\x02\x03'</td>
                <td className="tg-0pky">No</td>
                <td className="tg-0pky">Yes</td>
                <td className="tg-0pky">No</td>
                <td className="tg-0pky">Medium</td>
              </tr>
              <tr>
                <td className="tg-phtq bold">VARBINARY</td>
                <td className="tg-phtq bold">No</td>
                <td className="tg-phtq">Similar to VARCHAR, but stores binary byte strings.</td>
                <td className="tg-phtq">0 to 65,535 bytes, depending on the maximum row size</td>
                <td className="tg-phtq">NULL</td>
                <td className="tg-phtq">Varies</td>
                <td className="tg-phtq">Variable-length binary data</td>
                <td className="tg-phtq">'\x00', '\xFF\xFE'</td>
                <td className="tg-phtq">No</td>
                <td className="tg-phtq">Yes</td>
                <td className="tg-phtq">No</td>
                <td className="tg-phtq">Medium</td>
              </tr>
              <tr>
                <td className="tg-0pky bold">TINYBLOB</td>
                <td className="tg-0pky bold">blob</td>
                <td className="tg-0pky">A tiny BLOB (binary large object).</td>
                <td className="tg-0pky">0 to 255 bytes</td>
                <td className="tg-0pky">NULL</td>
                <td className="tg-0pky">Varies (up to 255 bytes)</td>
                <td className="tg-0pky">Small binary data</td>
                <td className="tg-0pky">Binary data</td>
                <td className="tg-0pky">No</td>
                <td className="tg-0pky">No</td>
                <td className="tg-0pky">No</td>
                <td className="tg-0pky">Medium</td>
              </tr>
              <tr>
                <td className="tg-phtq bold">BLOB</td>
                <td className="tg-phtq bold">blob</td>
                <td className="tg-phtq">A BLOB (binary large object).</td>
                <td className="tg-phtq">0 to 65,535 bytes</td>
                <td className="tg-phtq">NULL</td>
                <td className="tg-phtq">Varies (up to 65,535 bytes)</td>
                <td className="tg-phtq">Binary large objects</td>
                <td className="tg-phtq">Binary data</td>
                <td className="tg-phtq">No</td>
                <td className="tg-phtq">No</td>
                <td className="tg-phtq">No</td>
                <td className="tg-phtq">Medium</td>
              </tr>
              <tr>
                <td className="tg-0pky bold">MEDIUMBLOB</td>
                <td className="tg-0pky bold">No</td>
                <td className="tg-0pky">A medium-sized BLOB.</td>
                <td className="tg-0pky">0 to 16,777,215 bytes</td>
                <td className="tg-0pky">NULL</td>
                <td className="tg-0pky">Varies (up to 16 MB)</td>
                <td className="tg-0pky">Medium-sized binary data</td>
                <td className="tg-0pky">Binary data</td>
                <td className="tg-0pky">No</td>
                <td className="tg-0pky">No</td>
                <td className="tg-0pky">No</td>
                <td className="tg-0pky">High</td>
              </tr>
              <tr>
                <td className="tg-phtq bold">LONGBLOB</td>
                <td className="tg-phtq bold">No</td>
                <td className="tg-phtq">A large BLOB.</td>
                <td className="tg-phtq">0 to 4,294,967,295 bytes</td>
                <td className="tg-phtq">NULL</td>
                <td className="tg-phtq">Varies (up to 4 GB)</td>
                <td className="tg-phtq">Large binary data</td>
                <td className="tg-phtq">Binary data</td>
                <td className="tg-phtq">No</td>
                <td className="tg-phtq">No</td>
                <td className="tg-phtq">No</td>
                <td className="tg-phtq">High</td>
              </tr>
              <tr>
                <td className="tg-0pky bold">TINYTEXT</td>
                <td className="tg-0pky bold">text</td>
                <td className="tg-0pky">A very small text string.</td>
                <td className="tg-0pky">0 to 255 characters</td>
                <td className="tg-0pky">NULL</td>
                <td className="tg-0pky">Varies (up to 255 characters)</td>
                <td className="tg-0pky">Small text data</td>
                <td className="tg-0pky">'Short text'</td>
                <td className="tg-0pky">No</td>
                <td className="tg-0pky">No</td>
                <td className="tg-0pky">No</td>
                <td className="tg-0pky">Medium</td>
              </tr>
              <tr>
                <td className="tg-phtq bold">TEXT</td>
                <td className="tg-phtq bold">text</td>
                <td className="tg-phtq">A small text string.</td>
                <td className="tg-phtq">0 to 65,535 characters</td>
                <td className="tg-phtq">NULL</td>
                <td className="tg-phtq">Varies (up to 65,535 characters)</td>
                <td className="tg-phtq">Text data</td>
                <td className="tg-phtq">'Regular text'</td>
                <td className="tg-phtq">No</td>
                <td className="tg-phtq">No</td>
                <td className="tg-phtq">No</td>
                <td className="tg-phtq">Medium</td>
              </tr>
              <tr>
                <td className="tg-0pky bold">MEDIUMTEXT</td>
                <td className="tg-0pky bold">text</td>
                <td className="tg-0pky">A medium-sized text string.</td>
                <td className="tg-0pky">0 to 16,777,215 characters</td>
                <td className="tg-0pky">NULL</td>
                <td className="tg-0pky">Varies (up to 16 MB)</td>
                <td className="tg-0pky">Medium-sized text data</td>
                <td className="tg-0pky">'Medium-sized text'</td>
                <td className="tg-0pky">No</td>
                <td className="tg-0pky">No</td>
                <td className="tg-0pky">No</td>
                <td className="tg-0pky">High</td>
              </tr>
              <tr>
                <td className="tg-phtq bold">LONGTEXT</td>
                <td className="tg-phtq bold">text</td>
                <td className="tg-phtq">A large text string.</td>
                <td className="tg-phtq">0 to 4,294,967,295 characters</td>
                <td className="tg-phtq">NULL</td>
                <td className="tg-phtq">Varies (up to 4 GB)</td>
                <td className="tg-phtq">Large text data</td>
                <td className="tg-phtq">'Very large text data'</td>
                <td className="tg-phtq">No</td>
                <td className="tg-phtq">No</td>
                <td className="tg-phtq">No</td>
                <td className="tg-phtq">High</td>
              </tr>
              <tr>
                <td className="tg-0pky bold">ENUM</td>
                <td className="tg-0pky bold">No</td>
                <td className="tg-0pky">A string object that can have one of several values.</td>
                <td className="tg-0pky">Up to 65,535 distinct values</td>
                <td className="tg-0pky">NULL</td>
                <td className="tg-0pky">1 or 2 bytes</td>
                <td className="tg-0pky">Enumeration of values</td>
                <td className="tg-0pky">'Value1', 'Value2'</td>
                <td className="tg-0pky">No</td>
                <td className="tg-0pky">Yes</td>
                <td className="tg-0pky">No</td>
                <td className="tg-0pky">Low</td>
              </tr>
              <tr>
                <td className="tg-phtq bold">SET</td>
                <td className="tg-phtq bold">No</td>
                <td className="tg-phtq">A string object that can have 0 or more values, each of which must be chosen from a list of permitted values.</td>
                <td className="tg-phtq">Up to 64 distinct values</td>
                <td className="tg-phtq">NULL</td>
                <td className="tg-phtq">1, 2, 3, 4, or 8 bytes</td>
                <td className="tg-phtq">Set of values</td>
                <td className="tg-phtq">'Value1,Value2'</td>
                <td className="tg-phtq">No</td>
                <td className="tg-phtq">No</td>
                <td className="tg-phtq">No</td>
                <td className="tg-phtq">Medium</td>
              </tr>
              <tr>
                <td className="tg-fymr">JSON Data Types</td>
                <td className="tg-0pky bold">JSON</td>
                <td className="tg-0pky bold">json</td>
                <td className="tg-0pky">Stores JSON (JavaScript Object Notation) data.</td>
                <td className="tg-0pky">N/A</td>
                <td className="tg-0pky">NULL</td>
                <td className="tg-0pky">Varies</td>
                <td className="tg-0pky">JSON formatted data</td>
                <td className="tg-0pky">`{"key","value"}`</td>
                <td className="tg-0pky">No</td>
                <td className="tg-0pky">No</td>
                <td className="tg-0pky">No</td>
                <td className="tg-0pky">High</td>
              </tr>
              <tr>
                <td className="tg-fymr" rowSpan="8">Spatial Data Types</td>
                <td className="tg-phtq bold">POINT</td>
                <td className="tg-phtq bold">No</td>
                <td className="tg-phtq">Stores a single point in 2D space.</td>
                <td className="tg-phtq">N/A</td>
                <td className="tg-phtq">NULL</td>
                <td className="tg-phtq">25 bytes</td>
                <td className="tg-phtq">Geographical locations</td>
                <td className="tg-phtq">POINT(1 1)</td>
                <td className="tg-phtq">No</td>
                <td className="tg-phtq">Yes</td>
                <td className="tg-phtq">Yes</td>
                <td className="tg-phtq">Medium</td>
              </tr>
              <tr>
                <td className="tg-0pky bold">LINESTRING</td>
                <td className="tg-0pky bold">No</td>
                <td className="tg-0pky">Stores a sequence of points representing a path.</td>
                <td className="tg-0pky">N/A</td>
                <td className="tg-0pky">NULL</td>
                <td className="tg-0pky">Depends on the number of points</td>
                <td className="tg-0pky">Roads, rivers</td>
                <td className="tg-0pky">LINESTRING(0 0, 1 1)</td>
                <td className="tg-0pky">No</td>
                <td className="tg-0pky">Yes</td>
                <td className="tg-0pky">Yes</td>
                <td className="tg-0pky">Medium</td>
              </tr>
              <tr>
                <td className="tg-phtq bold">POLYGON</td>
                <td className="tg-phtq bold">No</td>
                <td className="tg-phtq">Stores a polygon, which is a collection of LINESTRING values.</td>
                <td className="tg-phtq">N/A</td>
                <td className="tg-phtq">NULL</td>
                <td className="tg-phtq">Depends on the number of points</td>
                <td className="tg-phtq">Boundaries, regions</td>
                <td className="tg-phtq">POLYGON((0 0, 1 1, 1 0, 0 0))</td>
                <td className="tg-phtq">No</td>
                <td className="tg-phtq">Yes</td>
                <td className="tg-phtq">Yes</td>
                <td className="tg-phtq">Medium</td>
              </tr>
              <tr>
                <td className="tg-0pky bold">MULTIPOINT</td>
                <td className="tg-0pky bold">No</td>
                <td className="tg-0pky">Stores a collection of POINT values.</td>
                <td className="tg-0pky">N/A</td>
                <td className="tg-0pky">NULL</td>
                <td className="tg-0pky">25 bytes per point</td>
                <td className="tg-0pky">Multiple locations</td>
                <td className="tg-0pky">MULTIPOINT((1 1), (2 2))</td>
                <td className="tg-0pky">No</td>
                <td className="tg-0pky">Yes</td>
                <td className="tg-0pky">Yes</td>
                <td className="tg-0pky">Medium</td>
              </tr>
              <tr>
                <td className="tg-phtq bold">MULTILINESTRING</td>
                <td className="tg-phtq bold">No</td>
                <td className="tg-phtq">Stores a collection of LINESTRING values.</td>
                <td className="tg-phtq">N/A</td>
                <td className="tg-phtq">NULL</td>
                <td className="tg-phtq">Depends on the number of points</td>
                <td className="tg-phtq">Multiple paths</td>
                <td className="tg-phtq">MULTILINESTRING((0 0, 1 1), (2 2, 3 3))</td>
                <td className="tg-phtq">No</td>
                <td className="tg-phtq">Yes</td>
                <td className="tg-phtq">Yes</td>
                <td className="tg-phtq">Medium</td>
              </tr>
              <tr>
                <td className="tg-0pky bold">MULTIPOLYGON</td>
                <td className="tg-0pky bold">No</td>
                <td className="tg-0pky">Stores a collection of POLYGON values.</td>
                <td className="tg-0pky">N/A</td>
                <td className="tg-0pky">NULL</td>
                <td className="tg-0pky">Depends on the number of points</td>
                <td className="tg-0pky">Multiple regions</td>
                <td className="tg-0pky">MULTIPOLYGON(((0 0, 1 1, 1 0, 0 0)), ((2 2, 3 3, 3 2, 2 2)))</td>
                <td className="tg-0pky">No</td>
                <td className="tg-0pky">Yes</td>
                <td className="tg-0pky">Yes</td>
                <td className="tg-0pky">Medium</td>
              </tr>
              <tr>
                <td className="tg-phtq bold">GEOMETRYCOLLECTION</td>
                <td className="tg-phtq bold">No</td>
                <td className="tg-phtq">Stores a collection of geometry objects (POINT, LINESTRING, POLYGON).</td>
                <td className="tg-phtq">N/A</td>
                <td className="tg-phtq">NULL</td>
                <td className="tg-phtq">Depends on the number of objects</td>
                <td className="tg-phtq">Complex spatial structures</td>
                <td className="tg-phtq">GEOMETRYCOLLECTION(POINT(1 1), LINESTRING(0 0, 1 1))</td>
                <td className="tg-phtq">No</td>
                <td className="tg-phtq">Yes</td>
                <td className="tg-phtq">Yes</td>
                <td className="tg-phtq">Medium</td>
              </tr>
              <tr>
                <td className="tg-0pky bold">GEOMETRY</td>
                <td className="tg-0pky bold">No</td>
                <td className="tg-0pky">Stores any type of geometry object (POINT, LINESTRING, POLYGON).</td>
                <td className="tg-0pky">N/A</td>
                <td className="tg-0pky">NULL</td>
                <td className="tg-0pky">Depends on the type of object</td>
                <td className="tg-0pky">General spatial data</td>
                <td className="tg-0pky">GEOMETRY(POINT(1 1))</td>
                <td className="tg-0pky">No</td>
                <td className="tg-0pky">Yes</td>
                <td className="tg-0pky">Yes</td>
                <td className="tg-0pky">Medium</td>
              </tr>
            </tbody>
          </table>
          <hr/>
        </div>
      </div>
  );
}

export default DataTypesSection;