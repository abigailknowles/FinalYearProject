import React from 'react';
import NavBar from '../components/NavBar';
import { Container, Row, Col } from 'react-bootstrap';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <>
        <NavBar />
        <Container>
          <Row>
            <Col>
              <h1>ABOUT</h1>
            </Col>
          </Row>
          <Row>
            <Col>
            </Col>
          </Row>
        </Container>
      </>


    );
  }
}
export default About