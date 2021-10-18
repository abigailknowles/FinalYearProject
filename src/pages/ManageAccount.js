import { Jumbotron, Col, Row, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';

import MainMenu from '../components/MainMenu';

function ManageAccount() {
  return (
    <>
      <MainMenu></MainMenu>
      <Row className="top-padding"></Row>
      <Container>
        <Row>
          <Col>
            <h3 className="page-header">Manage Account</h3>
          </Col>
          <Col>
            <NavLink to="/home">
              <FontAwesomeIcon icon={faArrowAltCircleLeft} className="previous-page-icon" size="2x" />
            </NavLink>
          </Col>
        </Row>
        <Row>
          <Col>
            <h6 className="page-sub-header">Here you can view and edit your personal and account details</h6>
          </Col>
        </Row>
        <Row className="personal-details">
          <Col>
            <Jumbotron className="personal-details-jumbotron-background">
              <Jumbotron className="personal-details-jumbotron">
                <Row>
                  <Col lg={2}>
                    <Row>
                      <h5>Patient Id</h5>
                    </Row>
                    <Row>
                      <h6>A0694JD</h6>
                    </Row>
                  </Col>
                  <Col lg={1}>
                    <Row>
                      <h5>Title</h5>
                    </Row>
                    <Row>
                      <h6>Miss</h6>
                    </Row>
                  </Col>
                  <Col lg={2}>
                    <Row>
                      <h5>First Name</h5>
                    </Row>
                    <Row>
                      <h6>Abigail</h6>
                    </Row>
                  </Col>
                  <Col lg={2}>
                    <Row>
                      <h5>Surname</h5>
                    </Row>
                    <Row>
                      <h6>Knowles</h6>
                    </Row>
                  </Col>
                  <Col lg={2}>
                    <Row>
                      <h5>Gender</h5>
                    </Row>
                    <Row>
                      <h6>Female</h6>
                    </Row>
                  </Col>
                  <Col lg={2}>
                    <Row>
                      <h5>Birthday</h5>
                    </Row>
                    <Row>
                      <h6>08/08/2000</h6>
                    </Row>
                  </Col>
                  <Col lg={1}>
                    <Row>
                      <h5>Age</h5>
                    </Row>
                    <Row>
                      <h6>21</h6>
                    </Row>
                  </Col>
                </Row>
              </Jumbotron>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col>
            <Jumbotron className="personal-details-jumbotron-background">
              <Jumbotron className="personal-details-jumbotron">
                <Row className="personal-details">
                  <Col lg={6}>
                    <h5>Role</h5>
                  </Col>
                  <Col lg={6}>
                    <h6>Practioner</h6>
                  </Col>
                </Row>
                <Row className="personal-details">
                  <Col lg={6}>
                    <h5>Surgery</h5>
                  </Col>
                  <Col lg={6}>
                    <h6>Roselea Surgery</h6>
                  </Col>
                </Row>
                <Row className="personal-details">
                  <Col lg={6}>
                    <h5>Surgery Address</h5>
                  </Col>
                  <Col lg={6}>
                    <h6>17 Balmoral Road, PR5 6TN</h6>
                  </Col>
                </Row>
                <Row className="personal-details">
                  <Col lg={6}>
                    <h5>Contact Number</h5>
                  </Col>
                  <Col lg={6}>
                    <h6>01772 818936</h6>
                  </Col>
                </Row>
              </Jumbotron>
            </Jumbotron>
          </Col>
          <Col>
            <Jumbotron className="personal-details-jumbotron-background">
              <Jumbotron className="personal-details-jumbotron">
                <Row className="personal-details">
                  <Col lg={6}>
                    <h5>Username</h5>
                  </Col>
                  <Col lg={6}>
                    <h6>abigailknowles01</h6>
                  </Col>
                </Row>
                <Row className="personal-details">
                  <Col lg={6}>
                    <h5>Email</h5>
                  </Col>
                  <Col lg={6}>
                    <h6>abigailknowlesx @yahoo.co.uk</h6>
                  </Col>
                </Row>
                <Row className="personal-details">
                  <Col lg={6}>
                    <h5>Password</h5>
                  </Col>
                  <Col lg={6}>
                    <h6>******</h6>
                  </Col>
                </Row>
                <Row className="personal-details">
                  <Col lg={6}>
                    <h5>Account Type</h5>
                  </Col>
                  <Col lg={6}>
                    <h6>Admin</h6>
                  </Col>
                </Row>
              </Jumbotron>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default ManageAccount;
