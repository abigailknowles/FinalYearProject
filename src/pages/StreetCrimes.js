import React, { } from "react";
import { Container, Row, Jumbotron, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb'

import NavBar from '../components/NavBar';
import Loading from '../components/Loading';
import PdfGenerator from '../components/PdfGenerator';
import LineChart from "../components/visualisations/LineChart";
import CrimeSummary from "../components/summaries/CrimeSummary";
import CrimeOutcomesChart from "../components/visualisations/CrimeOutcomesChart";

class StreetCrimes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      selectedOption: null,
      policeForce: props.location.aboutProps.selectedPoliceForce,
      neighbourhood: props.location.aboutProps.selectedNeighbourhood,
      neighbourhoodCode: props.location.aboutProps.selectedNeighbourhoodCode,
      colours: ['#ccf3ff', '#74bec8', '#d8bfff', '#f75e5b', '#fff88b', '#e80b8c', '#938fff', '#f7c6af', '#ffa661', '#7ee9cf', '#ffeefe',
        '#d2f9d0', '#e0f49c', '#02ccf9', '#ffc1f8', '#ffa0ab', '#f0f0f5', '#ffdd99', '#ffe0e0', '#b3d9ff', '#ff6666', '#99ff99', '#b8ffdb',
        '#e6e6ff', '#ff80aa', '#adebeb', '#ccccff', '#00cccc', '#ff9999', '#fff88d', '#99ffff', '#ffa366', '#ebfafa', '#ffffcc', '#f9e6ff', '#faebf5',
        '#ffe6cc', '#e6e6e6', '#6666cc', '#ffdd99', '#b3ffb3', '#80ffdf', '#b3d9ff', '#a0a1f5', '#ffccff', '#b3ccff', '#9fdfbf', '#a3a3c2', '#6699cc'],
      shapes: [
        { xcords: 35.5, ycords: 21 },
        { xcords: 20, ycords: 19 },
        { xcords: 54, ycords: 38 },
        { xcords: 72.5, ycords: 20 },
        { xcords: 68, ycords: 34 },
        { xcords: 24, ycords: 35 },
        { xcords: 39.5, ycords: 35 },
        { xcords: 82.5, ycords: 33 },
        { xcords: 54, ycords: 19.5 },
        { xcords: 87, ycords: 19 },

      ]
    };
    this.handleChange = this.handleChange.bind(this);
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
      size = "7"
    }
    else if (percentage <= 20) {
      size = "8"
    }
    else if (percentage <= 30) {
      size = "9"
    }
    else if (percentage <= 40) {
      size = "10"
    }
    else if (percentage <= 50) {
      size = "11"
    }
    else if (percentage <= 60) {
      size = "12"
    }
    else if (percentage <= 70) {
      size = "13"
    }
    else if (percentage <= 80) {
      size = "14"
    }
    else if (percentage <= 90) {
      size = "15"
    }
    else if (percentage <= 100) {
      size = "16"
    }
    return size
  }

  highestMonth(unorderedList) {
    let orderedList = unorderedList.sort(function (a, b) { return a.data - b.data; });
    const date = new Date(orderedList[5].month)
    var month = date.toLocaleString('default', { month: 'long' })
    this.setState({
      highestCrimeMonth: month
    });
  }




  componentDidMount() {
    this.defineCoords();
    this.streetCrimes();
    this.crimeOutcomes();
    this.stopAndSearch();
    this.chartResults();
  }

  getByKey(key, arr) {
    var array = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].category === key) {
        array.push(arr[i]);
      }
    }
    return { outcomes: array, count: array.length };
  }

  groupCrimes(arr) {
    var groups = [];

    for (var i = 0; i < arr.length; i++) {
      var key = arr[i].category;
      if (this.exists(key, groups) === false)
        groups.push({ key: key, outcomes: this.getByKey(key, arr) })
    }

    return { groups: groups, count: arr.length };
  }

  getMostCommonCrime(groups) {
    var sortedArray = groups.sort((elmement1, element2) => {
      return elmement1.outcomes.count - element2.outcomes.count;
    });

    return sortedArray[sortedArray.length - 1];
  }

  defineCoords() {
    let poly = [];
    fetch(`https://data.police.uk/api/${this.state.policeForce}/${this.state.neighbourhoodCode}/boundary`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            coords: result,
          });
          for (let i = 0; i < result.length; i++) {
            poly.push(`${result[i].latitude},${result[i].longitude}`);
            this.setState({
              coordsArr: poly.join(":")
            });
          }
          this.streetCrimes(this.state.coordsArr)
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }

  chartResults(selection) {
    const months = ["2021-09", "2021-10", "2021-11", "2021-12", "2022-01", "2022-02"];
    const orderedData = [];
    let unorderedList = [];
    let counter = 0;
    for (let i = 0; i < months.length; i++) {
      fetch(`https://data.police.uk/api/crimes-street/${selection}?poly=${this.state.coordsArr}&date=${months[i]}`)
        .then(res => res.json())
        .then(
          (result) => {
            unorderedList.push({ "month": months[i], data: result.length });

            counter++;
            if (counter === 6) {
              let orderedList = unorderedList.sort(function (a, b) { return new Date(a.month) - new Date(b.month); });
              for (let i = 0; i < orderedList.length; i++) {
                orderedData.push(orderedList[i].data)

              }
              this.setState({
                isShown: true,
                unorderedList: unorderedList,
                series: [{
                  data: orderedData
                }],
              });
              this.highestMonth(this.state.unorderedList);
            }
          },
          (error) => {
            this.setState({
              error
            });
          }
        )
    }
  }

  streetCrimes() {
    fetch(`https://data.police.uk/api/crimes-street/all-crime?poly=${this.state.coordsArr}`)
      .then(res => res.json())
      .then(
        (result) => {
          var categories = this.groupBy(result);
          var crimes = this.groupCrimes(result);
          var commonCrime = this.getMostCommonCrime(crimes.groups)
          this.setState({
            isLoaded: true,
            categories: categories,
            count: categories.count,
            streetCrimesResponse: result,
            mostCommonCrime: this.textFormatter(commonCrime.key)
          });
        },
        (error) => {
          this.setState({
            isLoaded: false,
            error
          });
        }
      )
  }

  crimeOutcomes() {
    fetch(`https://data.police.uk/api/outcomes-at-location?poly=${this.state.coordsArr}`)
      .then(r => r.json())
      .then((res) => {
        this.setState({
          outcomesCount: res.length,
        });
      },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }

  stopAndSearch() {
    fetch(`https://data.police.uk/api/stops-force?force=${this.state.policeForce}`)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          ssCount: data.length,
        });
      },
        (error) => {
          this.setState({
            error
          });
        }
      )
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
      definition = "Violent crime includes rape and sexual assault, robbery, assault and murder.";
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
    else if (category === "theft-from-person") {
      definition = "Theft from person is commited if they steal property while the property is being held or carried by the victim.";
    }
    return definition
  }
  handleChange(e) {
    this.setState({ selection: e.target.value });
  }

  render() {
    const { shapes, categories, isLoaded, colours, isShown, id } = this.state;

    return (
      <>
        <NavBar />

        <Container className="top-breadcrumb">
          <Row>
            <Col sm={9}>
              <Breadcrumb >
                <Breadcrumb.Item href="/">Police Force - {this.textFormatter(this.state.policeForce)}</Breadcrumb.Item>
                <Breadcrumb.Item href="/neighbourhoods"> Neighbourhoods - {this.state.neighbourhood} </Breadcrumb.Item>
                <Breadcrumb.Item active> Street Crimes </Breadcrumb.Item>
              </Breadcrumb>
            </Col>
            <Col sm={3} align="right">
              <PdfGenerator criminals={categories.count} stopAndSearch={this.state.ssCount} commonCrime={this.state.mostCommonCrime} crimeOutcomes={this.state.outcomesCount} highestMonth={this.state.highestCrimeMonth} />
            </Col>
          </Row>
        </Container>
        <Container fluid className="personal-details-container">
          <Row>
            <Col sm={4}>
              <Row>
                <Jumbotron className="personal-details-jumbotron" >
                  <CrimeSummary crimeCount={categories.count} streetCrimesResponse={this.state.streetCrimesResponse} commonCrime={this.state.mostCommonCrime} highestMonth={this.state.highestCrimeMonth} poly={this.state.coordsArr} />
                </Jumbotron>
              </Row>
            </Col>
            <Col sm={8}>
              <Jumbotron className="personal-details-jumbotron" align="center">
                <LineChart poly={this.state.coordsArr} />
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col sm={5}>
              <Jumbotron className="personal-details-jumbotron" align="center">
                <CrimeOutcomesChart poly={this.state.coordsArr} />
              </Jumbotron>
            </Col>
            <Col sm={7}>
              <Jumbotron className="personal-details-jumbotron">
                <h5 className="crimes-header">Street Crimes for the past month</h5>
                {!isLoaded
                  ? <div><Loading /></div>
                  :
                  <svg viewBox="0 0 100 41">
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
                            <>
                              <text x={shapes[i].xcords - 4} y={shapes[i].ycords - 5} textAnchor='middle' alignmentBaseline="middle" fontSize="0.075em">{this.textFormatter(category.category)}</text>
                            </>
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