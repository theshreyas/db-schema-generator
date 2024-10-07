import React from "react";

function AboutSection() {
  return (
    <div className="container mt-5 aboutSection">
        <h1 className="abHeading">About Schema Generator</h1>
        <p className="about">This tool streamlines the process of creating db_schema.xml files for Magento 2 projects. Whether you're inputting field details through our user-friendly UI or converting MySQL CREATE TABLE queries, the tool generates the necessary XML files in seconds, helping you save time and avoid manual errors.</p>
        <p className="about">If you encounter any issues or have feature suggestions, please create an issue on <a href="https://github.com/theshreyas/db-schema-generator">GitHub</a> repository. And if you liked this tool, feel free to leave a star!</p>
        <div className="about">
          <ul className="task-list">
              <li><span className="status completed">Completed</span> <p className="complete">Create about, mysqldatatypes & quiz pages</p>
              </li>
              <li><span className="status completed">Completed</span> <p className="complete">Handle unique keys & index on multiple columns</p>
              </li>
              <li><span className="status completed">Completed</span>  Add syntax highlighter 
              </li>
              <li><span className="status planned">Planned</span>  MySQL select query to magento query generator </li>
              <li><span className="status planned">Planned</span>  System configuration generator 
              </li>
          </ul>
        </div>
        <div className="about">
          <strong>Other Resources/Tools</strong>
          <ul className="task-list">
              <li><a href="https://www.sdj.pw/posts/magento2-db-schema-diff/">Comparing Magento 2 DB Schema Changes</a>
              </li>
              <li><a href="https://swiftotter.com/technical/quick-tips/generating-schema-whitelist">How SchemaDiff is Executed</a>
              </li>
          </ul>
        </div>
    </div>
  );
}

export default AboutSection;