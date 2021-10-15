import React, { Component } from 'react';
import { Jumbotron, Form, Button, Col, Row, Container, Modal, InputGroup } from 'react-bootstrap';
import { withRouter, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import MainMenu from '../components/MainMenu';


class CreatePatientAccount extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      username: '',
      password: '',
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
  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  submitHandler = async event => {
    event.preventDefault();
    event.target.className += " was-validated";

    if (this.state.email === "" || this.state.username === "" || this.state.password === "") {
      return false;
    } else {
      event.preventDefault();
      event.stopPropagation();
    }
  };


  render() {
    return (
      <>
        <MainMenu></MainMenu>
        <Row className="top-padding"></Row>
        <Container>
          <Row>
            <Col>
              <h3 className="page-header">Create an account</h3>
            </Col>
            <Col>
              <NavLink to="/home">
                <FontAwesomeIcon icon={faArrowAltCircleLeft} className="previous-page-icon" size="2x" />
              </NavLink>
            </Col>
          </Row>
          <Row>
            <Col>
              <h6 className="page-sub-header">Here you can create a patient account</h6>
            </Col>
          </Row>
          <Row className="personal-details">
            <Col>
              <Jumbotron className="personal-details-jumbotron-background">
                <Jumbotron className="personal-details-jumbotron">
                  <Form onSubmit={this.submitHandler} noValidate>
                    <Row>
                      <Col>
                        <Row>
                          <Col>
                            <Form.Label className="create-account-label">Email</Form.Label>
                            <Form.Control
                              type="text"
                              value={this.state.email}
                              onChange={this.changeHandler}
                              className="form-control"
                              name="email"
                              required
                            />
                            <div className="invalid-feedback">
                              Please provide an email.
                            </div>
                          </Col>
                        </Row>
                        <Row className="create-account-padding"></Row>
                        <Row>
                          <Col>
                            <Form.Label className="create-account-label">Username</Form.Label>
                            <Form.Control
                              type="text"
                              value={this.state.username}
                              onChange={this.changeHandler}
                              className="form-control"
                              name="username"
                              required
                            />
                            <div className="invalid-feedback">
                              Please provide a username.
                            </div>
                          </Col>
                        </Row>
                        <Row className="create-account-padding"></Row>
                        <Row>
                          <Col>
                            <Form.Label className="create-account-label">Temporary Password</Form.Label>
                            <Form.Control
                              type="text"
                              value={this.state.password}
                              onChange={this.changeHandler}
                              className="form-control"
                              name="password"
                              required
                            />
                            <div className="invalid-feedback">
                              Please provide a temporary password.
                            </div>
                            <Form.Text className="text-muted">
                              Share this with your patients so they can log in, they can change this later
                            </Form.Text>
                          </Col>
                        </Row>
                        <Row>
                          <Col align="right">
                            <Button variant="light" className="apply-button" type="submit">
                              Create
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Form>
                </Jumbotron>
              </Jumbotron>
            </Col>
          </Row>
        </Container>

        <Modal show={this.state.show} handleClose={this.hideModal}>
          <Row>
            <Col align="right">
              <Button className="exit-modal" onClick={this.hideModal}>
                <FontAwesomeIcon className="exit" icon={faTimes} />
              </Button>
            </Col>
          </Row>
          <Col align="center">
            <Row>
              <Col>
                <h3 className="forgot-password-header">Confirm Account Creation</h3>
              </Col>
            </Row>
            <hr></hr>
            <Row>
              <Col>
                <h3 className="create-account-label">Email: {this.state.email}</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3 className="create-account-label">Username: {this.state.username}</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3 className="create-account-label">Temporary password: {this.state.password}</h3>
              </Col>
            </Row>
            <Row className="forgot-password-button">
              <Col>
                <NavLink to="/home">
                  <Button variant="light" className="login-button" >
                    Create
                  </Button>
                </NavLink>
              </Col>
            </Row>
          </Col>

        </Modal>
      </>
    );
  }
}

export default withRouter(CreatePatientAccount);
