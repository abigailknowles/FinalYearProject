import React, { } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner'

class Loading extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <>
        <Container>
          <Row>
            <Col sm={4}>
              <Spinner className="loading-spinner" animation="grow" />
            </Col>
            <Col sm={4}>
              <Spinner className="loading-spinner" animation="grow" />
            </Col>
            <Col sm={4}>
              <Spinner className="loading-spinner" animation="grow" />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default withRouter(Loading);
