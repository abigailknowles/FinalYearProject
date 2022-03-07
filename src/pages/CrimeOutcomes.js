import React, { } from "react";
import { Container, Row, Button, Col, Form, Jumbotron } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import NavBar from '../components/NavBar';
import LastUpdated from '../components/LastUpdated';
import Loading from '../components/Loading';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'

class StreetCrimes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      selectedOption: null,
      policeForce: props.location.aboutProps.selectedPoliceForce,
      neighbourhood: props.location.aboutProps.selectedNeighbourhood,
      crime: props.location.aboutProps.selectedCrime,
      shapes: [
        { colour: "#74bec8", xcords: 50, ycords: 28 },
        { colour: "#ccf3ff", xcords: 29, ycords: 22 },
        { colour: "#d8bfff", xcords: 31, ycords: 38 },
        { colour: "#f75e5b", xcords: 69, ycords: 21.5 },
        { colour: "#fff88b", xcords: 69, ycords: 36 },
        { colour: "#e80b8c", xcords: 43, ycords: 47 },
        { colour: "#938fff", xcords: 83, ycords: 30 },
        { colour: "#f7c6af", xcords: 58, ycords: 46 },
      ]
    };
  }

  isGroupInArray(groups, code) {
    var isFound = false;
    for (var key in groups) {
      if (groups[key].code === code) {
        isFound = true;
      }
    }

    return isFound;
  }

  getByGroupName(arr, code) {
    var group = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].category.name === code) {
        group.push(arr[i]);
      }
    }
    return { group: group, count: group.length };
  }

  groupBy(arr) {
    var groups = [];

    for (var i = 0; i < arr.length; i++) {
      var code = arr[i].category.name;
      if (this.isGroupInArray(groups, code) === false)
        groups.push({ code: code, group: this.getByGroupName(arr, code) })
    }

    return { groups: groups, count: arr.length };
  }

  textFormatter(force) {
    const police = force;
    const formatForce = police.charAt(0).toUpperCase() + police.slice(1);
    return formatForce;
  }
  calculatePercentage(value, totalValue) {
    var percentage = (value / totalValue * 100).toFixed(2);
    return percentage;
  }

  calculateBubbleSize(value, totalValue) {
    var percentage = (value / totalValue * 100).toFixed(2);
    var size = 0;
    if (percentage <= 10) {
      size = "7"
    }
    else if (percentage <= 20) {
      size = "7"
    }
    else if (percentage <= 30) {
      size = "8"
    }
    else if (percentage <= 40) {
      size = "9"
    }
    else if (percentage <= 50) {
      size = "10"
    }
    else if (percentage <= 60) {
      size = "11"
    }
    else if (percentage <= 70) {
      size = "12"
    }
    else if (percentage <= 80) {
      size = "13"
    }
    else if (percentage <= 90) {
      size = "14"
    }
    else if (percentage <= 100) {
      size = "15"
    }
    return size
  }
  componentDidMount() {
    fetch(`https://data.police.uk/api/forces/bedfordshire`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            categories: result.description,
          });
          console.log("description", result.description)
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  policeForceInformation(text) {
    var description = text
    console.log(description.replace(" world", ""))

  }
  componentDidMount() {
    fetch("https://data.police.uk/api/outcomes-at-location?date=2021-01&poly=52.268,0.543:52.794,0.238:52.130,0.478")
      .then(res => res.json())
      .then(
        (result) => {
          var outcomes = this.groupBy(result);
          this.setState({
            isLoaded: true,
            categories: outcomes,
          });
          console.log("outcomes", outcomes);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  setIsShown(state, id) {
    this.setState({ isShown: state, id: id })
  }
  toggle(state) {
    this.setState({ isClicked: state })
  }

  render() {
    const { shapes, categories, isLoaded, isShown, id } = this.state;
    return (
      <>

        {/* <DonutChart
                    size={250}
                    title={title}
                    data={data}
                    onHover={i => {
                      if (i >= 0) {
                        console.log("Selected ", data[i].name);
                        this.setState({
                          active: i
                        });
                      } else {
                        console.log("Mouse left donut");
                      }
                    }}
                    innerRaduis={0.5}
                    outerRadius={0.9}
                  />
                  <div id="label">
                    {active >= 0
                      ? data[active].name + " " + data[active].value + " %"
                      : "Hover"}
                  </div> */}
        <NavBar />
        <Container className="top-breadcrumb">
          <Row>
            <Col >
              <Breadcrumb >
                <Breadcrumb.Item href="/">Police Force - {this.textFormatter(this.state.policeForce)}</Breadcrumb.Item>
                <Breadcrumb.Item href="/neighbourhoods"> Neighbourhoods - {this.state.neighbourhood} </Breadcrumb.Item>
                <Breadcrumb.Item href="/street-crimes"> Street Crimes - {this.textFormatter(this.state.crime)}</Breadcrumb.Item>
                <Breadcrumb.Item active> Crime Outcomes </Breadcrumb.Item>              </Breadcrumb>
            </Col>
          </Row>
        </Container>
        <Row className="filter-padding">
          {this.state.categories}
        </Row>
        <Container fluid className="personal-details-jumbotron">
          <Row>
            <Col sm={4}>
              <Row>
                <Jumbotron className="personal-details-jumbotron" align="center">
                </Jumbotron>
              </Row>
              <Row>
                <Jumbotron className="personal-details-jumbotron">
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
                </Jumbotron>
              </Row>
            </Col>
            <Col sm={8}>
              <Jumbotron className="personal-details-jumbotron">
                <FontAwesomeIcon size="2x" className="download-icon" icon={faDownload} />
                {!isLoaded
                  ? <div><Loading /></div>
                  :
                  <svg viewBox="0 0 100 70">
                    <LastUpdated />
                    <text x='1' y='3' fontSize="0.075em">Total crime outcomes: {categories.count}</text>

                    {
                      categories.groups.map((category, i) => (
                        <NavLink key={i} className="nav-link"
                          onMouseEnter={() => { this.setIsShown(true, i, category.category) }}
                          onMouseLeave={() => { this.setIsShown(false, i, category.category) }}
                          to={{
                            pathname: 'crime-outcomes',
                            aboutProps: {
                              selectedPoliceForce: this.state.policeForce,
                              selectedNeighbourhood: this.state.neighbourhood,
                              selectedCrime: this.state.crime
                            }
                          }}>
                          <circle
                            className="circle-css"
                            style={{
                              fill: shapes[i].colour
                            }}
                            cx={shapes[i].xcords}
                            cy={shapes[i].ycords}
                            r={this.calculateBubbleSize(category.group.count, categories.count)}
                          />
                          {isShown && i === id ?
                            <>
                              <text x={shapes[i].xcords} y={shapes[i].ycords - 2} textAnchor='middle' alignmentBaseline="middle" fontSize="0.075em">{category.code}</text>
                              <text x={shapes[i].xcords} y={shapes[i].ycords + 2} textAnchor='middle' alignmentBaseline="middle" fontSize="0.075em">{category.group.count} </text>
                              <text x={shapes[i].xcords} y={shapes[i].ycords + 4} textAnchor='middle' alignmentBaseline="middle" fontSize="0.075em">{this.calculatePercentage(category.group.count, categories.count)} %</text>
                            </>
                            :
                            <text x={shapes[i].xcords} y={shapes[i].ycords} textAnchor='middle' alignmentBaseline="middle" fontSize="0.075em">{category.code}</text>
                          }
                        </NavLink>
                      ))}
                  </svg>
                }
              </Jumbotron>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default StreetCrimes;