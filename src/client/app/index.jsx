/* global document , fetch */
/* eslint no-undef: "error" */

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Navbar, Nav, NavItem, MenuItem } from 'react-bootstrap';
import Root from './components/Root.jsx';
import Header from './components/Header.jsx';
import 'bootstrap/dist/css/bootstrap-theme.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Header />
        <Root />
        {/* <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">React-Bootstrap</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="#">Link</NavItem>
              <NavItem eventKey={2} href="#">Link</NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">Link Right</NavItem>
              <NavItem eventKey={2} href="#">Link Right</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar> */}
        <style jsx global>{`
          html {
            height: 100%;
          }

          body {
            background-color: #414956;
            min-height: 100%;
          }

          .container {
            display: flex;


          }

        `}</style>
      </div>
    );
  }
}


render(<App />, document.getElementById('root'));
