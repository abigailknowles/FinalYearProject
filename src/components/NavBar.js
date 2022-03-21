import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { withRouter, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie } from '@fortawesome/free-solid-svg-icons'
import PdfGenerator from '../components/PdfGenerator';

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
          <NavLink className="nav-logo" to="/">
            <FontAwesomeIcon size="2x" className="nav-icon" icon={faChartPie} />
          </NavLink>
          <NavLink className="logo" to="/">
            <h3 className="nav-logo-text">CRIMEDATA</h3>
          </NavLink>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto" />
            <Nav>
              <NavLink className="nav-link" to="/">
                <h5 className="nav-text">Home</h5>
              </NavLink>
              <NavLink className="nav-link" to="/about">
                <h5 className="nav-text">About</h5>
              </NavLink>
              <NavLink className="nav-link" to="/">
                <PdfGenerator />
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default withRouter(NavBar);
