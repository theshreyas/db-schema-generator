import React from 'react';
import GitHubButton from 'react-github-btn';

const Header = () => {
  return (
      <>
        <div className="github-buttons">
          <GitHubButton href="https://github.com/theshreyas/db-schema-generator/issues" data-color-scheme="no-preference: dark_high_contrast; light: light; dark: dark;" data-icon="octicon-issue" data-size="large" data-show-count="true" aria-label="Issue buttons/github-buttons on GitHub">Issue</GitHubButton>
          <GitHubButton href="https://github.com/theshreyas/db-schema-generator" data-color-scheme="no-preference: dark_high_contrast; light: light; dark: dark;" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star buttons/github-buttons on GitHub">Star</GitHubButton>
        </div>
        <h1>DB Schema Generator</h1>
      </>
  );
};

export default Header;