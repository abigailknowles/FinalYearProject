import { Button, Col, Row, Container } from 'react-bootstrap';
import { withRouter, NavLink } from 'react-router-dom';
import MainMenu from '../components/MainMenu';


function HomePage() {
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
            <NavLink to="/create-account">
              <Button variant="light" className="home-page-buttons">
                <h3 className="home-page-buttons-text">
                  Create Patient Account
                </h3>
              </Button>
            </NavLink>
          </Col>
          <Col sm={5}>
            <NavLink to="/edit-account">
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
            <NavLink to="/delete-account">
              <Button variant="light" className="home-page-buttons">
                <h3 className="home-page-buttons-text">
                  Delete Patient Account
                </h3>
              </Button>
            </NavLink>
          </Col>
          <Col sm={5}>
            <NavLink to="/patient-analytics">
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

export default withRouter(HomePage);
