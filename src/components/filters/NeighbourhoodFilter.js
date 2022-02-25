import React, { Component } from 'react';
import { Container, Col, Form, Button, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';

class CrimeFilter extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {

    return (
      <>

        <Container >
          <h3 className="filter-text">Filter by</h3>
          <Row className="filter-padding">
            <Col >
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Row>
                  <Col>
                    <Form.Check type="checkbox" label="Anti Social" />
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" label="Theft" />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Check type="checkbox" label="Violent" />
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" label="Other" />
                  </Col>
                </Row>
              </Form.Group>
            </Col>
            <Row>
              <Col>
                <Form.Label htmlFor="inputPassword5">From</Form.Label>
                <DatePicker
                  selected={this.state.endDate}
                  onChange={this.handleDateChange}
                  name="endDate"
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date(2015, 1, 1)}
                  maxDate={new Date()}
                />
              </Col>
              <Col>
                <Form.Label htmlFor="inputPassword5">To</Form.Label>
                <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleDateChange}
                  name="startDate"
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date(2015, 1, 1)}
                  maxDate={new Date()}
                />
              </Col>
            </Row>
          </Row>
          <Row className="filter-padding">
            <Col>
              <Button className="filter-button" type="submit" variant="light">Update</Button>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default withRouter(CrimeFilter);
