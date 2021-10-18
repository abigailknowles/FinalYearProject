import React, { Component } from 'react';
import { Button, Form, Row, Col, InputGroup, Modal } from 'react-bootstrap';
import { withRouter, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      show: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  async login(e) {
    // add entity - POST
    e.preventDefault();
    // creates entity
    return await axios.post(process.env.REACT_APP_API_URL
      , {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        debugger;
        console.log(response)
        return response;
      })
      .catch(err => {
        debugger;
        console.log(err);
        return err;
      });
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  submitHandler = async event => {
    event.preventDefault();
    event.target.className += " was-validated";

    if (this.state.username === "" || this.state.password === "") {
      return false;
    } else {
      var response = await this.login(event);
      if (response.status === 200) {
        this.props.history.push('/home');
      }
      else {
        alert('Incorrect login details');
      }
    }

  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };


  render() {
    return (
      <>
        <Row className="full-width">
          <Col sm={6} align="center">
            <Form onSubmit={this.submitHandler} noValidate>
              <h3 className="login-header">Patient Warning App</h3>

              <Form.Group as={Col} md="5" controlId="validationCustomUsername">
                <InputGroup>
                  <Form.Control
                    value={this.state.username}
                    onChange={this.changeHandler}
                    type="text"
                    id="defaultFormRegisterPasswordEx4"
                    className="form-control"
                    name="username"
                    placeholder="Username / Email"
                    required
                  />
                  <div className="invalid-feedback">
                    Please provide your username or email.
                  </div>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="5" controlId="validationCustomUsername">
                <InputGroup>
                  <Form.Control
                    value={this.state.password}
                    onChange={this.changeHandler}
                    type="text"
                    id="defaultFormRegisterPasswordEx4"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    required
                  />
                  <div className="invalid-feedback">
                    Please provide your password.
                  </div>
                </InputGroup>
              </Form.Group>
              <Form.Text className="text-muted">
                <NavLink to="#" onClick={this.showModal}>
                  Forgotten password?
                </NavLink>
              </Form.Text>
              <Button variant="light" className="login-button" type="submit">
                Login
              </Button>
            </Form>
          </Col>
          <Col sm={6}>
            <div class="square">
              <h5 className="login-page-text">Here you can manage patient accounts, your account and view patient analytics</h5>
            </div>
          </Col>
        </Row>

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
                <h3 className="forgot-password-header">Forgotten password</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5 className="forgot-password-sub-header">Please enter your email and we will send you a reset password link</h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="validationCustomUsername">
                  <InputGroup>
                    <Form.Control
                      type="text"
                      id="defaultFormRegisterPasswordEx4"
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      required
                    />
                  </InputGroup>
                </Form.Group>
                <Row className="forgot-password-button">
                  <Col>
                    <NavLink to="/home">
                      <Button variant="light" className="login-button" >
                        Submit
                      </Button>
                    </NavLink>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Modal>
      </>
    );
  }
}

export default withRouter(LoginPage);