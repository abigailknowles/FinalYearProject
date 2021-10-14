import React, { Component } from 'react';
import { Button, Navbar, Nav, Modal, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { withRouter, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

class MainMenu extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <>
        <Navbar collapseOnSelect expand="lg" variant="dark" className="navbar-custom">
          <NavLink className="logo" to="/home">
            <Navbar.Brand> <h4 >Patient Warning App</h4> </Navbar.Brand>
          </NavLink>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto" />
            <Nav>
              <Nav.Link >

              </Nav.Link>
              <NavLink className=" nav-link" to="/personal-details">
                <h5 className="nav-bar-text">Abigail Knowles</h5>
              </NavLink>
              <NavLink className=" nav-link" to="/manage-account">
                <h5 className="nav-bar-text">My Account</h5>
              </NavLink>
              <NavLink className=" nav-link" to="/">
                <Button variant="dark" className="button-logout">
                  Logout
                </Button>
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default withRouter(MainMenu);
