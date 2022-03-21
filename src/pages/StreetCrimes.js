import React, { } from "react";
import { Container, Row, Jumbotron, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Chart from "react-apexcharts";

import NavBar from '../components/NavBar';
import Loading from '../components/Loading';
import LineChart from "../components/visualisations/LineChart";
import CrimeSummary from "../components/summaries/CrimeSummary";

class StreetCrimes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      selectedOption: null,
      policeForce: props.location.aboutProps.selectedPoliceForce,
      neighbourhood: props.location.aboutProps.selectedNeighbourhood,
      colours: ['#ccf3ff', '#74bec8', '#d8bfff', '#f75e5b', '#fff88b', '#e80b8c', '#938fff', '#f7c6af', '#ffa661', '#7ee9cf', '#ffeefe',
        '#d2f9d0', '#e0f49c', '#02ccf9', '#ffc1f8', '#ffa0ab', '#f0f0f5', '#ffdd99', '#ffe0e0', '#b3d9ff', '#ff6666', '#99ff99', '#b8ffdb',
        '#e6e6ff', '#ff80aa', '#adebeb', '#ccccff', '#00cccc', '#ff9999', '#fff88d', '#99ffff', '#ffa366', '#ebfafa', '#ffffcc', '#f9e6ff', '#faebf5',
        '#ffe6cc', '#e6e6e6', '#6666cc', '#ffdd99', '#b3ffb3', '#80ffdf', '#b3d9ff', '#a0a1f5', '#ffccff', '#b3ccff', '#9fdfbf', '#a3a3c2', '#6699cc'],
      shapes: [
        { xcords: 37, ycords: 19.8 },
        { xcords: 22.5, ycords: 24 },
        { xcords: 68, ycords: 36 },
        { xcords: 64.5, ycords: 22.5 },
        { xcords: 77.2, ycords: 24 },
        { xcords: 21.7, ycords: 38 },
        { xcords: 33.8, ycords: 33.4 },
        { xcords: 50.5, ycords: 32.8 },
        { xcords: 82, ycords: 36 },
      ],
      options: {
        fill: {
          type: 'solid'
        },
        colors: [
          '#02ccf9'
        ],
        xaxis: {
          categories: []
        }
      },
      series: [
        {
          name: "series-1",
          data: []
        }
      ]
    };
  }

  exists(key, array) {
    var isFound = false;
    for (let i = 0; i < array.length; i++) {
      if (array[i].key === key) {
        isFound = true;
      }
    }
    return isFound;
  }

  getByKey(key, arr) {
    var array = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].object_of_search === key) {
        array.push(arr[i]);
      }
    }
    return { outcomes: array, count: array.length };
  }

  groupOutcomes(arr) {
    var groups = [];

    for (var i = 0; i < arr.length; i++) {
      var key = arr[i].object_of_search;
      if (this.exists(key, groups) === false)
        groups.push({ key: key, outcomes: this.getByKey(key, arr) })
    }

    return { groups: groups, count: arr.length };
  }


  // street crimes
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

  // crime outcomes
  isOutcomeInArray(groups, code) {
    var isFound = false;
    for (var key in groups) {
      if (groups[key].code === code) {
        isFound = true;
      }
    }

    return isFound;
  }

  getByOutcomeName(arr, code) {
    var group = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].category.name === code) {
        group.push(arr[i]);
      }
    }
    return { group: group, count: group.length };
  }

  groupByOutcome(arr) {
    var groups = [];

    for (var i = 0; i < arr.length; i++) {
      var code = arr[i].category.name;
      if (this.isOutcomeInArray(groups, code) === false)
        groups.push({ code: code, group: this.getByOutcomeName(arr, code) })
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

  componentDidMount() {
    this.StreetCrimes();
    this.crimeOutcomes();
  }

  crimeOutcomes() {
    const categories = [];
    fetch("https://data.police.uk/api/outcomes-at-location?date=2021-01&poly=52.268,0.543:52.794,0.238:52.130,0.478")
      .then(r => r.json())
      .then((res) => {
        var out = this.groupByOutcome(res);
        for (let i = 0; i < out.groups.length; i++) {
          categories.push(out.groups[i].code);
        }
        const data = [];
        for (let i = 0; i < out.groups.length; i++) {
          data.push(out.groups[i].group.count);
        }
        this.setState({
          series: [
            {
              data: data
            }
          ],
          options: {
            labels: categories
          }
        });
      },
        (error) => {
          this.setState({
            error
          });
        }
      )
    return "Total: " + this.state.total
  }

  StreetCrimes() {
    fetch("https://data.police.uk/api/crimes-street/all-crime?poly=52.268,0.543:52.794,0.238:52.130,0.478")
      .then(res => res.json())
      .then(
        (result) => {
          var categories = this.groupBy(result);
          this.setState({
            isLoaded: true,
            categories: categories,
            count: categories.count
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

  stopAndSearch() {
    fetch(`https://data.police.uk/api/stops-force?force=bedfordshire`)
      .then(res => res.json())
      .then((data) => {
        var labels = [];
        var result = this.groupOutcomes(data);
        for (let i = 0; i < result.groups.length; i++) {
          labels.push(result.groups[i].key);
        }
        this.setState({
          isLoaded: true,
          result: data,
          total: data.length,
          isShown: true,
          options: {
            labels: labels
          }
        });
      },
        (error) => {
          this.setState({
            isLoaded: true,
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
      definition = "Public order involves kidnapping, murder, riots, arson, and intimidation against targeted groups or individuals.";
    }
    else if (category === "burglary") {
      definition = "Burglary is the act of entering a building or other areas without permission, usually with the intent to steal.";
    }
    else if (category === "drugs") {
      definition = "It is a crime to use, possess, manufacture, or distribute drugs classified as having a potential for abuse.";
    }
    else if (category === "violent-crime") {
      definition = "Violent crime, is when a victim is harmed by or threatened with violence. Crimes include rape and sexual assault, robbery, assault and murder.";
    }
    else if (category === "anti-social-behaviour") {
      definition = "Anti-social behaviour includes a range of nuisance and criminal behaviours which are causing distress to others.";
    }
    else if (category === "shoplifting") {
      definition = "Shoplifting is the theft of goods from an open retail establishment.";
    }
    else if (category === "possession-of-weapons") {
      definition = "Criminal possession of a weapon is the unlawful possession of a weapon by an individual.";
    }
    else if (category === "other-theft") {
      definition = "Other theft describes thef not relating to vehicles, buglary or shoplifting.";
    }
    else if (category === "other-crime") {
      definition = "Other crime covers things such as domestic abuse, organised crime, sexual assult etc.";
    }
    else if (category === "vehicle-crime") {
      definition = "Vehicle crime refers to the theft and trafficking of vehicles and the illicit trade in spare parts.";
    }
    else if (category === "criminal-damage-arson") {
      definition = "Criminal damage is the intentional damage to a home or property. Arson is the act of deliberately setting fire to property.";
    }
    return definition
  }
  render() {
    const { shapes, categories, isLoaded, colours, isShown, id } = this.state;

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
        <Container fluid className="personal-details-container">
          <Row>
            <Col sm={4}>
              <Row>
                <Jumbotron className="personal-details-jumbotron" >
                  <CrimeSummary crimeCount={categories.count} />
                </Jumbotron>
              </Row>
            </Col>
            <Col sm={8}>
              <Jumbotron className="personal-details-jumbotron" align="center">

                <LineChart />
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col sm={5}>
              <Jumbotron className="personal-details-jumbotron" align="center">
                <div className="app">
                  <div className="row">
                    <div className="mixed-chart">
                      <Chart
                        options={this.state.options}
                        series={this.state.series}
                        type="bar"
                        width="530"
                        height="320"
                      />
                    </div>
                  </div>
                </div>
              </Jumbotron>
            </Col>
            <Col sm={7}>
              <Jumbotron className="personal-details-jumbotron">
                {!isLoaded
                  ? <div><Loading /></div>
                  :
                  <svg viewBox="0 0 100 44">
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
                            cx={shapes[i].xcords - 4}
                            cy={shapes[i].ycords - 5}
                            r={this.calculateBubbleSize(category.group.count, categories.count)}
                          />
                          {isShown && i === id ?
                            <>
                              <text x={40} y={2} textAnchor='middle' alignmentBaseline="middle" fontSize="0.085em">{this.crimeDefinition(category.category)}</text>
                              <text x={shapes[i].xcords - 4} y={shapes[i].ycords - 6} textAnchor='middle' alignmentBaseline="middle" fontSize="0.075em">{this.textFormatter(category.category)}</text>
                              <text x={shapes[i].xcords - 4} y={shapes[i].ycords - 2} textAnchor='middle' alignmentBaseline="middle" fontSize="0.075em">{category.group.count} </text>
                              <text x={shapes[i].xcords - 4} y={shapes[i].ycords} textAnchor='middle' alignmentBaseline="middle" fontSize="0.075em">{this.calculatePercentage(category.group.count, categories.count)} %</text>
                            </>
                            :
                            <text x={shapes[i].xcords - 4} y={shapes[i].ycords - 5} textAnchor='middle' alignmentBaseline="middle" fontSize="0.075em">{this.textFormatter(category.category)}</text>
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