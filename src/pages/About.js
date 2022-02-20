import React from 'react';
import NavBar from '../components/NavBar';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDatabase } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons'
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'

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
        <Row className="about-padding"> </Row>
        <div className="banner"></div>
        <Container>
          <Row className="about-padding">
            <Col sm={3} >
              <Container className="about-icon">
                <FontAwesomeIcon size="4x" icon={faDatabase} />
              </Container>
            </Col>
            <Col sm={3}>
              <Container className="about-icon">
                <FontAwesomeIcon size="4x" className="about-icon" icon={faGlobe} />
              </Container>
            </Col>
            <Col sm={3}>
              <Container className="about-icon">
                <FontAwesomeIcon size="4x" className="about-icon" icon={faCalendarDay} />
              </Container>
            </Col>
            <Col sm={3}>
              <Container className="about-icon">
                <FontAwesomeIcon size="4x" className="about-icon" icon={faAddressBook} />
              </Container>
            </Col>
          </Row>
          <Row>
            <Col sm={3}>
              <h3 className="about-icon-header">Data Source</h3>
            </Col>
            <Col sm={3}>
              <h3 className="about-icon-header">Location</h3>
            </Col>
            <Col sm={3}>
              <h3 className="about-icon-header">From</h3>
            </Col>
            <Col sm={3}>
              <h3 className="about-icon-header">Contacts</h3>
            </Col>
          </Row>
          <Row>
            <Col sm={3}>
              <h6 className="about-icon-text">text</h6>
            </Col>
            <Col>
              <h6 className="about-icon-text">text</h6>
            </Col>
            <Col sm={3}>
              <h6 className="about-icon-text">text</h6>
            </Col>
            <Col>
              <h6 className="about-icon-text">text</h6>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="about-padding">
            <Col>
              <h4 className="about-header">What is the purpose of the project?</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at diam ultricies lacus scelerisque tempus. Aenean eget ex dapibus, hendrerit tortor id, iaculis lacus. Duis ut metus et metus iaculis aliquet a quis massa. Nulla facilisi. Etiam nunc libero, pellentesque nec est porttitor, tempus porta erat. Aliquam finibus lorem egestas metus porttitor, id porta quam congue. Nulla ullamcorper mi ut tristique consequat. Sed vestibulum sapien at felis iaculis, sit amet vulputate nunc consequat. Donec eu dui in purus elementum posuere. Etiam dictum posuere urna a porttitor. Mauris molestie blandit congue. Nulla leo turpis, pharetra vitae augue quis, volutpat porttitor enim.</p>
            </Col>
          </Row>
          <Row className="about-padding">
            <Col>
              <h4 className="about-header">Where has the data come from?</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at diam ultricies lacus scelerisque tempus. Aenean eget ex dapibus, hendrerit tortor id, iaculis lacus. Duis ut metus et metus iaculis aliquet a quis massa. Nulla facilisi. Etiam nunc libero, pellentesque nec est porttitor, tempus porta erat. Aliquam finibus lorem egestas metus porttitor, id porta quam congue. Nulla ullamcorper mi ut tristique consequat. Sed vestibulum sapien at felis iaculis, sit amet vulputate nunc consequat. Donec eu dui in purus elementum posuere. Etiam dictum posuere urna a porttitor. Mauris molestie blandit congue. Nulla leo turpis, pharetra vitae augue quis, volutpat porttitor enim.</p>
            </Col>
          </Row>
          <Row className="about-padding">
            <Col>
              <h4 className="about-header">What is the quality of the data like?</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at diam ultricies lacus scelerisque tempus. Aenean eget ex dapibus, hendrerit tortor id, iaculis lacus. Duis ut metus et metus iaculis aliquet a quis massa. Nulla facilisi. Etiam nunc libero, pellentesque nec est porttitor, tempus porta erat. Aliquam finibus lorem egestas metus porttitor, id porta quam congue. Nulla ullamcorper mi ut tristique consequat. Sed vestibulum sapien at felis iaculis, sit amet vulputate nunc consequat. Donec eu dui in purus elementum posuere. Etiam dictum posuere urna a porttitor. Mauris molestie blandit congue. Nulla leo turpis, pharetra vitae augue quis, volutpat porttitor enim.</p>
            </Col>
          </Row>
          <Row className="about-padding">
            <Col>
              <h4 className="about-header">How can I work with this data source?</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at diam ultricies lacus scelerisque tempus. Aenean eget ex dapibus, hendrerit tortor id, iaculis lacus. Duis ut metus et metus iaculis aliquet a quis massa. Nulla facilisi. Etiam nunc libero, pellentesque nec est porttitor, tempus porta erat. Aliquam finibus lorem egestas metus porttitor, id porta quam congue. Nulla ullamcorper mi ut tristique consequat. Sed vestibulum sapien at felis iaculis, sit amet vulputate nunc consequat. Donec eu dui in purus elementum posuere. Etiam dictum posuere urna a porttitor. Mauris molestie blandit congue. Nulla leo turpis, pharetra vitae augue quis, volutpat porttitor enim.</p>
            </Col>
          </Row>
          <Row className="about-padding">
            <Col>
              <h4 className="about-header">Who can I contact regarding this project?</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at diam ultricies lacus scelerisque tempus. Aenean eget ex dapibus, hendrerit tortor id, iaculis lacus. Duis ut metus et metus iaculis aliquet a quis massa. Nulla facilisi. Etiam nunc libero, pellentesque nec est porttitor, tempus porta erat. Aliquam finibus lorem egestas metus porttitor, id porta quam congue. Nulla ullamcorper mi ut tristique consequat. Sed vestibulum sapien at felis iaculis, sit amet vulputate nunc consequat. Donec eu dui in purus elementum posuere. Etiam dictum posuere urna a porttitor. Mauris molestie blandit congue. Nulla leo turpis, pharetra vitae augue quis, volutpat porttitor enim.</p>
            </Col>
          </Row>
          <Row className="about-padding"></Row>

          <Container>
            <div className="question-box">
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Example textarea</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
              </Form>
              <Button variant="light">Submit</Button>
            </div>
          </Container>
        </Container>

      </>


    );
  }
}
export default About