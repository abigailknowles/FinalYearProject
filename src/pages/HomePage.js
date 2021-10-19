import { Col, Row, Container } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import MainMenu from '../components/MainMenu';


function HomePage() {
  return (
    <>
      <MainMenu></MainMenu>

      <Container>
        <Row>
          <Col sm={1}></Col>
          <Col sm={5}>
            <h3 className="home-page-header">Data Visulisation</h3>
          </Col>
          <Col sm={5}>
          </Col>
          <Col sm={1}></Col>
        </Row>
      </Container>
    </>
  );
}

export default withRouter(HomePage);
