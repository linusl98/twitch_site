import React, { PropTypes } from 'react';

const propTypes = {};

const defaultProps = {};

function NonExistingPath(props) {
  return (
    <div className="container">
      <h1>The path you're looking for does not exist :(</h1>
    <style jsx>{`
      .container {
        text-align: center;
      }


    `}</style>
    </div>
  );
}

NonExistingPath.propTypes = propTypes;
NonExistingPath.defaultProps = defaultProps;

export default NonExistingPath;
