import React, { Component } from 'react';
import { Container, Col, Form, Button, Row } from 'react-bootstrap';
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
          {/* <h3 className="filter-text">Filter by</h3> */}
          <Row className="filter-padding">
            <Col >
              {/* <Form.Label htmlFor="inputPassword5">Reigons</Form.Label> */}
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
                    <Form.Check type="checkbox" label="Yorkshire and The Humber" />
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>
          {/* <Row className="filter-padding">
            <Col>
              <Button className="filter-button" type="submit" variant="light">Update</Button>
            </Col>
          </Row> */}
        </Container>
      </>
    );
  }
}

export default withRouter(PoliceForceFilter);
