/* eslint linebreak-style: ["error", "windows"] */
import React, { Component, PropTypes } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './Home.jsx';
import NonExistingPath from './NonExistingPath.jsx';
import Header from './Header.jsx';

const propTypes = {};

const defaultProps = {};

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exactPath="/" component={Home} />
            <Route path="*" component={NonExistingPath} />
          </Switch>
        </div>
      </Router>
    );
  }
}

Root.propTypes = propTypes;
Root.defaultProps = defaultProps;

export default Root;
