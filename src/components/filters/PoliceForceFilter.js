import React, { Component } from 'react';
import { Container, Col, Form, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

// reigon array
const northEast = ["durham", "northumbria"];
const southWest = ["wiltshire", "gloucestshire", "devon and cornwall", "dorset"]
const southEast = ["thames valley", "hertfordshire", "essex", "sussex", "kent", "cambridgeshire", "hampshire", "surrey"];
const northWest = ["greater manchester", "lancashire", "cheshire", "merseyside", "cumbria"];
const yorkshireHumber = ["west yorkshire", "south yorkshire", "north yorkshire", "humberside", "cleveland"];
const greaterLondon = ["metro", "city of london"];
const other = ["northern ireland", "north wales", "south wales", "dyfed-powys"];
const eastOfEngland = ["Norfolk", "Suffolk and Cambridgeshire"];
const eastMidlands = ["leicestershire, lincolnshire, northamptonshire, derbyshire, nottginhamshire"];
const westMidlands = ["wes mercia", "warwickshire", "west midlands", "staffordshire"];

const testArray = ["thames valley", "hertfordshire", "essex", "sussex", "kent", "cambridgeshire", "hampshire", "surrey", "wes mercia", "warwickshire", "west midlands", "staffordshire"];

class PoliceForceFilter extends Component {
  constructor() {
    super();
    this.state = {
    };

  }

  handleChange(event) {
    var arr;

    if (event.target.value === 'north-east') {
      arr = northEast;
    }
    else if (event.target.value === 'south-west') {
      arr = southWest;
    }
    else if (event.target.value === 'south-east') {
      arr = southEast;
    }
    else if (event.target.value === 'north-west') {
      arr = northWest;
    }
    else if (event.target.value === 'yorkshire-humber') {
      arr = yorkshireHumber;
    }
    else if (event.target.value === 'greater-london') {
      arr = greaterLondon;
    }
    else if (event.target.value === 'other') {
      arr = other;
    }
    else if (event.target.value === 'east-of-england') {
      arr = eastOfEngland;
    }
    else if (event.target.value === 'east-midlands') {
      arr = eastMidlands;

    } else if (event.target.value === 'west-midlands') {
      arr = westMidlands;
    } else {
      console.log("error")
    }
    console.log("chosen array:", arr);
    console.log("test results", testArray);

  }

  // updateArray(arr) {
  //   console.log("test:", arr)
  //   const t = ["kent", "essex"]
  //   console.log(places.find(p => p === t));
  // }

  render() {

    return (
      <>
        {/* {this.test()} */}
        {this.updateArray}
        <Container >
          <Row className="filter-padding">
            <Col >
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Row>
                  <Col>
                    <Form.Check type="checkbox" label="North East" value="north-east" onChange={this.handleChange} />
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" label="South East" value="south-east" onChange={this.handleChange} />
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" label="East Midlands" value="east-midlands" onChange={this.handleChange} />
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" label="East of England" value="east-of-england" onChange={this.handleChange} />
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" label="Greater London" value="greater-london" onChange={this.handleChange} />
                  </Col>

                </Row>
                <Row>
                  <Col>
                    <Form.Check type="checkbox" label="North West" value="north-west" onChange={this.handleChange} />
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" label="South West" value="south-west" onChange={this.handleChange} />
                  </Col>

                  <Col>
                    <Form.Check type="checkbox" label="West Midlands" value="west-midlands" onChange={this.handleChange} />
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" label="Yorkshire and the Humber" value="yorkshire-humber" onChange={this.handleChange} />
                  </Col>
                  <Col>
                    <Form.Check type="checkbox" label="Other" value="other" onChange={this.handleChange} />
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
