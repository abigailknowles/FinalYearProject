import React from 'react';
import MainMenu from '../components/MainMenu';
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
        <MainMenu />
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