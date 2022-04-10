import React, { Component } from 'react';
import { Container, Col, Form, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

// reigon array
const northEast = ["durham", "northumbria"];
const southWest = ["wiltshire", "gloucestshire", "devon-and-cornwall", "dorset"]
const southEast = ["thames-valley", "hertfordshire", "essex", "sussex", "kent", "cambridgeshire", "hampshire", "surrey"];
const northWest = ["greater-manchester", "lancashire", "cheshire", "merseyside", "cumbria"];
const yorkshireHumber = ["west-yorkshire", "south-yorkshire", "north-yorkshire", "humberside", "cleveland"];
const greaterLondon = ["metro", "city-of-london"];
const other = ["northern-ireland", "north-wales", "south-wales", "dyfed-powys"];
const eastOfEngland = ["norfolk", "suffolk"];
const eastMidlands = ["leicestershire, lincolnshire, northamptonshire, derbyshire, nottginhamshire"];
const westMidlands = ["wes-mercia", "warwickshire", "west-midlands", "staffordshire"];

class PoliceForceFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forceArr: this.props.forceArr,
      selectedReigon: [],
      eventValue: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event) {
    this.setArray(event.target.value);
  }

  setArray(event) {
    var value = event;
    var arr;

    if (value === 'north-east') {
      arr = northEast;
    }
    else if (value === 'south-west') {
      arr = southWest;
    }
    else if (value === 'south-east') {
      arr = southEast;
    }
    else if (value === 'north-west') {
      arr = northWest;
    }
    else if (value === 'yorkshire-humber') {
      arr = yorkshireHumber;
    }
    else if (value === 'greater-london') {
      arr = greaterLondon;
    }
    else if (value === 'other') {
      arr = other;
    }
    else if (value === 'east-of-england') {
      arr = eastOfEngland;
    }
    else if (value === 'east-midlands') {
      arr = eastMidlands;

    } else if (value === 'west-midlands') {
      arr = westMidlands;
    } else {
      console.log("error")
    }
    console.log(arr)
    this.filterArray(arr);
  }

  filterArray(arr) {
    const filteredForces = [];
    const forceArr = this.state.forceArr;
    for (let i = 0; i < arr.length; i++) {
      const arrayFilter = forceArr.filter(element => element.id === "essex");

      filteredForces.push(arrayFilter);
      console.log(filteredForces)
      console.log("filter array", arrayFilter)

    }
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
