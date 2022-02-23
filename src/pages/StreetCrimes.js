import React, { } from "react";
import { Container, Row, Jumbotron, Col, Button, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import NavBar from '../components/NavBar';
import Loading from '../components/Loading';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import DonutChart from "react-svg-donut";
import Chart from "react-apexcharts";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'

const title = "Crimes"
const data = [
  { name: "Anti Social Behaviour", value: 4 },
  { name: "Theft", value: 5 },
  { name: "Vehicle Crime", value: 6 },
  { name: "Buglary", value: 1 },
  { name: "Shoplifting", value: 1 },
  { name: "Criminal Damage and Arson", value: 1 },
  { name: "Drugs", value: 1 },
  { name: "Possesion Of Weapons", value: 4 },
  { name: "Public Order", value: 4 },
  { name: "Other Crime ", value: 4 },
  { name: "Other Theft", value: 4 }
]
var test = "hello"
class StreetCrimes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      startDate: new Date(),
      endDate: new Date(),
      selectedOption: null,
      policeForce: props.location.aboutProps.selectedPoliceForce,
      neighbourhood: props.location.aboutProps.selectedNeighbourhood,
      colours: ['#ccf3ff', '#74bec8', '#d8bfff', '#f75e5b', '#fff88b', '#e80b8c', '#938fff', '#f7c6af', '#ffa661', '#7ee9cf', '#ffeefe',
        '#d2f9d0', '#e0f49c', '#02ccf9', '#ffc1f8', '#ffa0ab', '#f0f0f5', '#ffdd99', '#ffe0e0', '#b3d9ff', '#ff6666', '#99ff99', '#b8ffdb',
        '#e6e6ff', '#ff80aa', '#adebeb', '#ccccff', '#00cccc', '#ff9999', '#fff88d', '#99ffff', '#ffa366', '#ebfafa', '#ffffcc', '#f9e6ff', '#faebf5',
        '#ffe6cc', '#e6e6e6', '#6666cc', '#ffdd99', '#b3ffb3', '#80ffdf', '#b3d9ff', '#a0a1f5', '#ffccff', '#b3ccff', '#9fdfbf', '#a3a3c2', '#6699cc'],
      shapes: [
        { xcords: 37, ycords: 21 },
        { xcords: 23, ycords: 27 },
        { xcords: 79, ycords: 39 },
        { xcords: 62, ycords: 19 },
        { xcords: 42, ycords: 48 },
        { xcords: 29, ycords: 50 },
        { xcords: 34, ycords: 36.5 },
        { xcords: 69, ycords: 30 },
        { xcords: 66, ycords: 43 },
        { xcords: 52, ycords: 33 },
        { xcords: 55, ycords: 50 },
      ],
      options: {
        chart: {
          height: 350,
          type: 'rangeBar'

        },
        colors: [
          "#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0",
          "#3F51B5", "#546E7A", "#D4526E", "#8D5B4C", "#F86624",
          "#D7263D", "#1B998B", "#2E294E", "#F46036", "#E2C044"
        ],
        fill: {
          type: 'solid'
        },
        xaxis: {
          categories: [test, "Stolen goods", "Offensive weapons", 1995, 1996, 1997, 1998, 1999]
        }
      },
      series: [
        {
          name: "series-1",
          data: [50, 100, 150, 200, 250, 300, 350, 400, 450, 500]
        }
      ]
    };
    this.handleChange = this.handleChange.bind(this);
  }

  isGroupInArray(groups, category) {
    var isFound = false;
    for (var key in groups) {
      if (groups[key].category === category) {
        isFound = true;
      }
    }

    return isFound;
  }

  getByGroupName(arr, category) {
    var group = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].category === category) {
        group.push(arr[i]);
      }
    }
    return { group: group, count: group.length };
  }

  groupBy(arr) {
    var groups = [];

    for (var i = 0; i < arr.length; i++) {
      var category = arr[i].category;
      if (this.isGroupInArray(groups, category) === false)
        groups.push({ category: category, group: this.getByGroupName(arr, category) })
    }

    return { groups: groups, count: arr.length };
  }

  calculatePercentage(value, totalValue) {
    var percentage = (value / totalValue * 100).toFixed(2);
    return percentage;
  }
  textFormatter(category) {
    const cat = category;
    const capitalCat = cat.charAt(0).toUpperCase() + cat.slice(1);
    return capitalCat.replaceAll('-', ' ');
  }
  calculateBubbleSize(value, totalValue) {
    var percentage = (value / totalValue * 100).toFixed(2);
    var size = 0;

    if (percentage <= 10) {
      size = "6"
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

  handleDateChange = (date) => {
    var selectedDate = date
    this.setState({ startDate: selectedDate });
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption }
    );
  };

  componentDidMount() {
    fetch("https://data.police.uk/api/crimes-street/all-crime?poly=52.268,0.543:52.794,0.238:52.130,0.478")
      .then(res => res.json())
      .then(
        (result) => {
          var categories = this.groupBy(result);
          this.setState({
            isLoaded: true,
            categories: categories
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  isGroupInOutcomesArray(groups, code) {
    var isFound = false;
    for (var key in groups) {
      if (groups[key].code === code) {
        isFound = true;
      }
    }

    return isFound;
  }

  getByOutcomesGroupName(arr, code) {
    var group = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].category.name === code) {
        group.push(arr[i]);
      }
    }
    return { group: group, count: group.length };
  }

  groupByOutcomes(arr) {
    var groups = [];

    for (var i = 0; i < arr.length; i++) {
      var code = arr[i].category.name;
      if (this.isGroupInOutcomesArray(groups, code) === false)
        groups.push({ code: code, group: this.getByOutcomesGroupName(arr, code) })
    }

    return { groups: groups, count: arr.length };
  }

  crimeOutcomes() {
    fetch("https://data.police.uk/api/outcomes-at-location?date=2021-01&poly=52.268,0.543:52.794,0.238:52.130,0.478")
      .then(res => res.json())
      .then(
        (result) => {
          var out = this.groupByOutcomes(result);
          this.setState({
            outcomes: out,
            total: result.length
          });
          // console.log(out.groups[0].code);
          // console.log(out.groups[0].group.count);
        },
        (error) => {
          this.setState({
            error
          });
        }
      )

    return "Total: " + this.state.total
  }

  setIsShown(state, id, crime) {
    this.setState({ isShown: state, id: id, crime: crime })
  }

  crimeDefinition(category) {
    var definition = "";
    if (category === "public-order") {
      definition = "Public order is a condition characterized by the absence of widespread criminal and political violence, such as kidnapping, murder, riots, arson, and intimidation against targeted groups or individuals.";
    }
    else if (category === "burglary") {
      definition = "Burglary is the act of entering a building or other areas without permission, with the intention of committing a criminal offence.";
    }
    else if (category === "drugs") {
      definition = "Drugs are related to crime in multiple ways. Most directly, it is a crime to use, possess, manufacture, or distribute drugs classified as having a potential for abuse. Cocaine, heroin, marijuana, and amphetamines are examples of drugs classified to have abuse potential.";
    }
    else if (category === "violent-crime") {
      definition = "Violent crime, is when a victim is harmed by or threatened with violence. Crimes include rape and sexual assault, robbery, assault and murder.";
    }
    else if (category === "anti-social-behaviour") {
      definition = "Anti-social behaviour includes a range of nuisance and criminal behaviours which are causing distress to others. Whether someone's actions can be classed as anti-social behaviour relies heavily on the impact it has on other people.";
    }
    else if (category === "shoplifting") {
      definition = "Shoplifting is the theft of goods from an open retail establishment, typically by concealing a store item on one's person, in pockets, under clothes, or in a bag, and leaving the store without paying.";
    }
    else if (category === "possession-of-weapons") {
      definition = "Criminal possession of a weapon is the unlawful possession of a weapon by an individual.";
    }
    else if (category === "other-theft") {
      definition = "Criminal possession of a weapon is the unlawful possession of a weapon by an individual. ... Such crimes are public order crimes and are considered mala prohibita, in that the possession of a weapon in and of itself is not evil.";
    }
    else if (category === "other-crime") {
      definition = "Criminal possession of a weapon is the unlawful possession of a weapon by an individual. ... Such crimes are public order crimes and are considered mala prohibita, in that the possession of a weapon in and of itself is not evil.";
    }
    else if (category === "vehicle-crime") {
      definition = "Vehicle crime refers to the theft and trafficking of vehicles and the illicit trade in spare parts. Stolen vehicles are frequently trafficked in order to finance and carry out other criminal activities, ranging from drug trafficking, arms dealing, people smuggling and international terrorism.";
    }
    else if (category === "criminal-damage-arson") {
      definition = "Criminal damage is the intentional damage to a home or property. Arson is the act of deliberately setting fire to property, including buildings and vehicles.";
    }
    return definition
  }
  render() {
    const { shapes, categories, isLoaded, colours, isShown, id } = this.state;
    const active = this.state.active;

    return (
      <>
        <NavBar />
        <Container className="top-breadcrumb">
          <Row>
            <Col>
              <Breadcrumb >
                <Breadcrumb.Item href="/">Police Force - {this.textFormatter(this.state.policeForce)}</Breadcrumb.Item>
                <Breadcrumb.Item href="/neighbourhoods"> Neighbourhoods - {this.state.neighbourhood} </Breadcrumb.Item>
                <Breadcrumb.Item active> Street Crimes </Breadcrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
        </Container>
        <Row className="filter-padding">
        </Row>
        <Container fluid className="personal-details-jumbotron">
          <Row>
            <Col sm={4}>
              <Row>
                <Jumbotron className="personal-details-jumbotron" align="center">
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
                  <div className="app">
                    <div className="row">
                      <div className="mixed-chart">
                        <Chart
                          options={this.state.options}
                          series={this.state.series}
                          type="bar"
                          width="460"
                        />
                      </div>
                    </div>
                  </div>
                  <h6>          {this.crimeOutcomes()}
                  </h6>
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
                  <svg viewBox="0 0 100 65">
                    {/* <LastUpdated /> */}
                    {/* <text x='1' y='3' fontSize="0.075em">Total street crimes: {categories.count}</text> */}
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
                              fill: colours[i]
                            }}
                            cx={shapes[i].xcords}
                            cy={shapes[i].ycords - 2}
                            r={this.calculateBubbleSize(category.group.count, categories.count)}
                          />
                          {isShown && i === id ?
                            <>
                              <text x={40} y={2} textAnchor='middle' alignmentBaseline="middle" fontSize="0.075em">{this.crimeDefinition(category.category)}</text>
                              <text x={shapes[i].xcords} y={shapes[i].ycords - 2} textAnchor='middle' alignmentBaseline="middle" fontSize="0.075em">{this.textFormatter(category.category)}</text>
                              <text x={shapes[i].xcords} y={shapes[i].ycords + 2} textAnchor='middle' alignmentBaseline="middle" fontSize="0.075em">{category.group.count} </text>
                              <text x={shapes[i].xcords} y={shapes[i].ycords + 4} textAnchor='middle' alignmentBaseline="middle" fontSize="0.075em">{this.calculatePercentage(category.group.count, categories.count)} %</text>
                            </>
                            :
                            <text x={shapes[i].xcords} y={shapes[i].ycords - 2} textAnchor='middle' alignmentBaseline="middle" fontSize="0.075em">{this.textFormatter(category.category)}</text>
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