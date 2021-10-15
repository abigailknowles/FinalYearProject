import { Button, Col, Row, Container } from 'react-bootstrap';
import { withRouter, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import MainMenu from '../components/MainMenu';


function PatientAnalytics() {
  return (
    <>
      <MainMenu></MainMenu>

      <Container>
        <Row>
          <Col sm={1}></Col>
          <Col sm={5}>
            <h3 className="home-page-header">Welcome back!</h3>
          </Col>
          <Col sm={5}>
          </Col>
          <Col sm={1}></Col>

        </Row>
        <Row>
          <Col sm={1}></Col>
          <Col sm={5}>
            <NavLink to="/manage-holidays">
              <Button variant="light" className="home-page-buttons">
                <h3 className="home-page-buttons-text">
                  Create Patient Account
                </h3>
              </Button>
            </NavLink>
          </Col>
          <Col sm={5}>
            <NavLink to="/personal-details">
              <Button variant="light" className="home-page-buttons">
                <h3 className="home-page-buttons-text">
                  Edit Patient Account
                </h3>
              </Button>
            </NavLink>
          </Col>
          <Col sm={1}></Col>
        </Row>
        <Row className="padding"></Row>
        <Row>
          <Col sm={1}></Col>
          <Col sm={5}>
            <NavLink to="/company-details">
              <Button variant="light" className="home-page-buttons">
                <h3 className="home-page-buttons-text">
                  Delete Patient Account
                </h3>
              </Button>
            </NavLink>
          </Col>
          <Col sm={5}>
            <NavLink to="/manage-account">
              <Button variant="light" className="home-page-buttons">
                <h3 className="home-page-buttons-text">
                  Patient Analytics
                </h3>
              </Button>
            </NavLink>
          </Col>
          <Col sm={1}></Col>
        </Row>
      </Container>
    </>
  );
}

export default withRouter(PatientAnalytics);
