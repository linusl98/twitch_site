import React, { Component, PropTypes } from 'react';

const propTypes = {};

const defaultProps = {};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container">

        <div className="left">
          <h1>SMALL</h1>
        </div>
        <div className="center">
          <h1>Welcome to twitch viewer</h1>
        </div>
        <div className="right">
          <h1>SMALL</h1>
        </div>

        <style jsx>{`
          .container {
            width: 85%;
            display: flex;
            flex-direction: row;
          }

          .content {
            display: flex;
          }

          .left {

          }

          .right {

          }

          .center {
            text-align: center;
            flex-grow: 1;
          }
        `}</style>
      </div>
    );
  }
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
