import React, { } from "react";
import { Container, Jumbotron, Col, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import "react-datepicker/dist/react-datepicker.css";

import NavBar from '../components/NavBar';
import Loading from '../components/Loading';
import NeighbourhoodPriorities from "../components/information/NeighbourhoodPriorities";
import NeighbourhoodEvents from "../components/information/NeighbourhoodEvents";

import NeighbourhoodSummary from "../components/summaries/NeighbourhoodSummary";
import StreetCrimesTree from "../components/visualisations/StreetCrimesTree";

class Neighbourhoods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      policeForce: props.location.aboutProps.selectedPoliceForce,
      colours: ['#ccf3ff', '#74bec8', '#d8bfff', '#f75e5b', '#fff88b', '#e80b8c', '#938fff', '#f7c6af', '#ffa661', '#7ee9cf', '#ffeefe',
        '#d2f9d0', '#e0f49c', '#02ccf9', '#ffc1f8', '#ffa0ab', '#f0f0f5', '#ffdd99', '#ffe0e0', '#b3d9ff', '#ff6666', '#99ff99', '#b8ffdb',
        '#e6e6ff', '#ff80aa', '#adebeb', '#ccccff', '#00cccc', '#ff9999', '#fff88d', '#99ffff', '#ffa366', '#ebfafa', '#ffffcc', '#f9e6ff', '#faebf5',
        '#ffe6cc', '#e6e6e6', '#6666cc', '#ffdd99', '#b3ffb3', '#80ffdf', '#b3d9ff', '#a0a1f5', '#ffccff', '#b3ccff', '#9fdfbf', '#a3a3c2', '#6699cc'],
      shapes: [
        { size: 7, xcords: 8.5, ycords: 23.5 },
        { size: 8, xcords: 23.5, ycords: 18.5 },
        { size: 6, xcords: 37, ycords: 12 },
        { size: 7, xcords: 51, ycords: 14 },
        { size: 6, xcords: 66, ycords: 13 },
        { size: 12, xcords: 82, ycords: 23 },
        { size: 9, xcords: 20, ycords: 36 },
        { size: 11, xcords: 40, ycords: 30 },
        { size: 9, xcords: 61, ycords: 28 },
        { size: 8, xcords: 18, ycords: 54 },
        { size: 8, xcords: 34, ycords: 49 },
        { size: 10, xcords: 54, ycords: 47 },
        { size: 9, xcords: 73, ycords: 43 },
        { size: 8, xcords: 44, ycords: 63 },
        { size: 8, xcords: 68, ycords: 60 },
        { size: 8, xcords: 85, ycords: 57 },
        { size: 6, xcords: 12, ycords: 88 },
        // { xcords: 84, ycords: 50 },
        // { xcords: 11, ycords: 61.5 },
        // { xcords: 27, ycords: 61 },
        // { xcords: 54, ycords: 63.5 },
        // { xcords: 45.5, ycords: 31.5 },
        // { xcords: 68.5, ycords: 64.5 },
        // { xcords: 89, ycords: 107 },
        // { xcords: 34.5, ycords: 47 },
        // { xcords: 51, ycords: 48.5 },
        // { xcords: 11, ycords: 116 },
        // { xcords: 20, ycords: 75.5 },
        // { xcords: 83, ycords: 18 },
        // { xcords: 25.5, ycords: 90 },
        // { xcords: 58.5, ycords: 105 },
        // { xcords: 83, ycords: 120.5 },
        // { xcords: 68.5, ycords: 120 },
        // { xcords: 82.5, ycords: 95 },
        // { xcords: 51, ycords: 76.5 },
        // { xcords: 64.5, ycords: 79 },
        // { xcords: 12, ycords: 101.5 },
        // { xcords: 26.5, ycords: 104.5 },
        // { xcords: 40, ycords: 89 },
        // { xcords: 26, ycords: 120 },
        // { xcords: 69, ycords: 93 },
      ],
    }
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
  calculateBubbleSize(forceLength) {
    var length = forceLength.length;
    var size = 0;

    if (length <= 10) {
      size = "5"
    }
    else if (length <= 15) {
      size = "6"
    }
    else if (length <= 20) {
      size = "7"
    }
    else if (length <= 25) {
      size = "8"
    }
    else if (length <= 30) {
      size = "9"
    }
    else if (length <= 35) {
      size = "10"
    }
    else if (length <= 40) {
      size = "11"
    } else {
      size = "11.8"
    }

    return size
  }

  componentDidMount() {
    fetch(`https://data.police.uk/api/${this.state.policeForce}/neighbourhoods`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            categories: result,
            count: result.length
          });
          console.log("neighbourhoods", result)
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  coordCalculator(policeForce) {
    var lat;
    var lng;

    if (policeForce === "bedfordshire") {
      lat = 52.135712;
      lng = -0.468040
    }
    else if (policeForce === "cambridgeshire") {
    }
    else if (policeForce === "city-of-london") {
      lat = 51.513329;
      lng = 0.088950;
    }
    else if (policeForce === "mersyside") {
      lat = 53.40505862970294;
      lng = -2.986139308510133;
    }
    else if (policeForce === "north-yorkshire") {
    }
    else if (policeForce === "north-hamptonshire") {
    }
    else if (policeForce === "wiltshire") {
    }
  }
  render() {
    const { shapes, categories, isLoaded, colours } = this.state;
    return (
      <>
        <NavBar />
        <Container className="top-breadcrumb">
          <Row>
            <Col >
              <Breadcrumb >
                <Breadcrumb.Item href="/">Police Force - {this.textFormatter(this.state.policeForce)}</Breadcrumb.Item>
                <Breadcrumb.Item active> Neighbourhoods </Breadcrumb.Item>
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
                <Jumbotron className="personal-details-jumbotron">
                  <NeighbourhoodSummary force={this.state.policeForce} neighbourhoodCount={this.state.count} />
                </Jumbotron>
              </Row>
              <Row>
                <StreetCrimesTree />
              </Row >
            </Col >
            <Col sm={8}>
              <Jumbotron className="personal-details-jumbotron">
                {!isLoaded
                  ? <div><Loading /></div>
                  :
                  <svg viewBox="0 0 100 72">
                    {/* <LastUpdated /> */}
                    {/* <text x='3' y='3' fontSize="0.075em">Total neighbourhoods: {categories.length}</text> */}
                    {categories.map((category, i) => (
                      <NavLink key={i} className="nav-link"
                        onMouseEnter={() => {
                          this.setState({ neighbourhood: category.name })
                        }} to={{
                          pathname: 'street-crimes',
                          aboutProps: {
                            selectedPoliceForce: this.state.policeForce,
                            selectedNeighbourhood: this.state.neighbourhood
                          }
                        }}>
                        <circle
                          className="circle-css"
                          style={{
                            fill: colours[i]
                          }}
                          cx={shapes[i].xcords}
                          cy={shapes[i].ycords}
                          r={shapes[i].size}
                        />
                        <text x={shapes[i].xcords} y={shapes[i].ycords} textAnchor='middle' alignmentBaseline="middle" fontSize="0.075em">{category.name}</text>
                      </NavLink>
                    ))}
                  </svg>
                }
              </Jumbotron>

            </Col>
          </Row >
          <Row>
            <NeighbourhoodPriorities policeForce={this.state.policeForce} />
          </Row>
        </Container >
      </>
    );
  }
}

export default Neighbourhoods;