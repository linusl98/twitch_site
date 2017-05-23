import React, { Component, PropTypes } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import Home from './Home.jsx';


const propTypes = {};

const defaultProps = {};

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Route exactPath="/" component={Home} />
        </BrowserRouter>
      </div>
    );
  }
}

Root.propTypes = propTypes;
Root.defaultProps = defaultProps;

export default Root;
