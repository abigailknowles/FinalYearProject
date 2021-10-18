import React, { Component } from 'react';
import { Jumbotron, Table, Button, Col, Row, Container, Modal } from 'react-bootstrap';
import { withRouter, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import MainMenu from '../components/MainMenu';


class EditPatientAccount extends Component {
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
              <h3 className="page-header">Edit an account</h3>
            </Col>
            <Col>
              <NavLink to="/home">
                <FontAwesomeIcon icon={faArrowAltCircleLeft} className="previous-page-icon" size="2x" />
              </NavLink>
            </Col>
          </Row>
          <Row>
            <Col>
              <h6 className="page-sub-header">Here you can edit a patients account</h6>
            </Col>
          </Row>
          <Row className="personal-details">
            <Col>
              <Jumbotron className="personal-details-jumbotron-background">
                <Jumbotron className="personal-details-jumbotron">
                  <Row>
                    <Col>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Patient Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>DOB</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>6993992</td>
                            <td>Tom</td>
                            <td>Jones</td>
                            <td>tomjones99</td>
                            <td>tomjones@yahoo.co.uk</td>
                            <td>31/10/1977</td>
                            <td>
                              <FontAwesomeIcon icon={faEdit} className="previous-page-icon" size="1x" />
                            </td>
                          </tr>
                          <tr>
                            <td>06949393</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>jacobthornton01</td>
                            <td>jacobthornton@hotmail.com</td>
                            <td>04/02/1999</td>
                            <td>
                              <FontAwesomeIcon icon={faEdit} className="previous-page-icon" size="1x" />
                            </td>
                          </tr>
                          <tr>
                            <td>79593939</td>
                            <td>Sophie</td>
                            <td>Smith</td>
                            <td>sophiesmith1</td>
                            <td>sophiesmithx@hotmail.com</td>
                            <td>04/03/2001</td>
                            <td>
                              <FontAwesomeIcon icon={faEdit} className="previous-page-icon" size="1x" />
                            </td>                          </tr>
                        </tbody>
                      </Table>


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

export default withRouter(EditPatientAccount);
