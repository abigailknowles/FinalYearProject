import React, { Component } from 'react';
import { Jumbotron, Form, Button, Col, Row, Container, Modal, InputGroup } from 'react-bootstrap';
import { withRouter, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import MainMenu from '../components/MainMenu';


class DeletePatientAccount extends Component {
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
        <MainMenu></MainMenu>
        <Row className="top-padding"></Row>
        <Container>
          <Row>
            <Col>
              <h3 className="page-header">Delete an Account</h3>
            </Col>
            <Col>
              <NavLink to="/home">
                <FontAwesomeIcon icon={faArrowAltCircleLeft} className="previous-page-icon" size="2x" />
              </NavLink>
            </Col>
          </Row>
          <Row>
            <Col>
              <h6 className="page-sub-header">Here you can delete a patients account and remove their details from the database</h6>
            </Col>
          </Row>
          <Row className="personal-details">
            <Col>
              <Jumbotron className="personal-details-jumbotron-background">
                <Jumbotron className="personal-details-jumbotron">
                  <Row>
                    <Col>
                      <Row>
                        <Col>
                          <Form.Label className="create-account-label">Please enter the email of the patient account you wish to delete</Form.Label>
                          <Form.Control type="email" />
                        </Col>
                      </Row>
                      <Row className="create-account-padding"></Row>


                      <Row>
                        <Col align="right">
                          <Button variant="light" className="apply-button" onClick={this.showModal}>
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    </Col>

                  </Row>
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
                <h3 className="create-account-label">Email: abigailknowlesx@yahoo.co.uk</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3 className="create-account-label">Username: abigailknowlesx</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3 className="create-account-label">Temporary password: abigail</h3>
              </Col>
            </Row>
            <Row className="forgot-password-button">
              <Col>
                <NavLink to="/home">
                  <Button variant="light" className="login-button" >
                    Delete
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

export default withRouter(DeletePatientAccount);
