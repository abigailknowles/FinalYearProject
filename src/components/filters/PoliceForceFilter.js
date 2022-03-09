import React, { Component } from 'react';
import { Container, Col, Form, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class PoliceForceFilter extends Component {
  constructor() {
    super();
    this.state = {
    };

  }

  render() {

    return (
      <>
        <Container >
          <Row className="filter-padding">
            <Col >
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Row>
                  <Col>
                    <Form.Check type="checkbox" label="North East" />
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" label="North West" />
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" label="East Midlands" />
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" label="East of England" />
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" label="London" />
                  </Col>
                </Row>
                <Row>

                  <Col>
                    <Form.Check type="checkbox" label="South East" />
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" label="South West" />
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" label="Wales" />
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" label="Northern Ireland" />
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" label="Yorkshire" />
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default withRouter(PoliceForceFilter);
