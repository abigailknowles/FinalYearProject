import React, { Component } from 'react';
import { Button, Navbar, Nav } from 'react-bootstrap';
import { withRouter, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie } from '@fortawesome/free-solid-svg-icons'

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <>
        <Navbar collapseOnSelect expand="lg" variant="dark" className="navbar-custom">
          <NavLink className="logo" to="/">
            <FontAwesomeIcon size="2x" className="nav-icon" icon={faChartPie} />
          </NavLink>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto" />
            <Nav>
              <NavLink className="nav-link" to="/">
                <h5 className="nav-bar-text">Home</h5>
              </NavLink>
              <NavLink className="nav-link" to="/about">
                <h5 className="nav-bar-text">About</h5>
              </NavLink>
              <NavLink className="nav-link" to="/">
                <Button variant="dark" className="button-logout">
                  Login
                </Button>
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default withRouter(NavBar);
