import React, { } from "react";
import { Container, Col, Row, Jumbotron, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import NavBar from '../components/NavBar';
import Loading from '../components/Loading';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import PoliceForceSummary from "../components/summaries/PoliceForceSummary";
import PoliceForceInfo from "../components/information/PoliceForceInfo";
import StopAndSearchChart from "../components/visualisations/StopAndSearchChart";

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

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      forceArr: [],
      isShown: false,
      selectedReigon: [],
      eventValue: "",
      setIsShown: false,
      colours: ['#ccf3ff', '#74bec8', '#d8bfff', '#f75e5b', '#92f4b3', '#e80b8c', '#938fff', '#f7c6af', '#ffa661', '#7ee9cf', '#ffeefe',
        '#d2f9d0', '#e0f49c', '#02ccf9', '#ffc1f8', '#ffa0ab', '#e09393', '#ffe0e0', '#ff6666', '#99ff99', '#b8ffdb', '#e6e6ff', '#ff80aa',
        '#adebeb', '#ffa276', '#ffe5e0', '#ff9999', '#fff88d', '#99ffff', '#ffa366', '#ebfafa', '#ffffcc', '#f9e6ff', '#faebf5', '#ffe6cc',
        '#e6e6e6', '#6666cc', '#ffdd99', '#b3ffb3', '#80ffdf', '#b3d9ff', '#a0a1f5', '#ffccff', '#b3ccff', '#9fdfbf', '#a3a3c2', '#6699cc'],
      shapes: [
        { xcords: 12, ycords: 17 },
        { xcords: 28.5, ycords: 14 },
        { xcords: 45, ycords: 13 },
        { xcords: 84, ycords: 66.5 },
        { xcords: 63, ycords: 33 },
        { xcords: 74.5, ycords: 106.5 },
        { xcords: 79, ycords: 81.5 },
        { xcords: 42, ycords: 104.5 },
        { xcords: 36.5, ycords: 74 },
        { xcords: 41, ycords: 60 },
        { xcords: 78.5, ycords: 35 },
        { xcords: 54, ycords: 120 },
        { xcords: 11.6, ycords: 32.5 },
        { xcords: 27, ycords: 30.5 },
        { xcords: 18, ycords: 46 },
        { xcords: 12, ycords: 88 },
        { xcords: 67.5, ycords: 49 },
        { xcords: 63.5, ycords: 15 },
        { xcords: 54.5, ycords: 90 },
        { xcords: 40.5, ycords: 119 },
        { xcords: 84, ycords: 50 },
        { xcords: 11, ycords: 61.5 },
        { xcords: 27, ycords: 61 },
        { xcords: 54, ycords: 63.5 },
        { xcords: 45.5, ycords: 31.5 },
        { xcords: 68.5, ycords: 64.5 },
        { xcords: 89, ycords: 107 },
        { xcords: 34.5, ycords: 47 },
        { xcords: 51, ycords: 48.5 },
        { xcords: 11, ycords: 116 },
        { xcords: 20, ycords: 75.5 },
        { xcords: 83, ycords: 18 },
        { xcords: 25.5, ycords: 90 },
        { xcords: 58.5, ycords: 105 },
        { xcords: 83, ycords: 120.5 },
        { xcords: 68.5, ycords: 120 },
        { xcords: 82.5, ycords: 95 },
        { xcords: 51, ycords: 76.5 },
        { xcords: 64.5, ycords: 79 },
        { xcords: 12, ycords: 101.5 },
        { xcords: 26.5, ycords: 104.5 },
        { xcords: 40, ycords: 89 },
        { xcords: 26, ycords: 120 },
        { xcords: 69, ycords: 93 },
      ],
    };
    this.handleChange = this.handleChange.bind(this);

  }

  calculateBubbleSize(categoryName) {
    console.log("length test", categoryName)
    var length = categoryName.length;
    var size = 0;

    if (length <= 10) {
      size = "5"
    }
    else if (length > 10 && length <= 15) {
      size = "6"
    }
    else if (length > 15 && length <= 20) {
      size = "7"
    }
    else if (length > 20 && length <= 25) {
      size = "8"
    }
    else if (length > 25 && length <= 30) {
      size = "9"
    }
    else if (length > 30 && length <= 35) {
      size = "10"
    }
    else if (length > 35 && length <= 40) {
      size = "11"
    }

    return size
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

  componentDidMount() {
    fetch("https://data.police.uk/api/forces")
      .then(res => res.json())
      .then((result) => {
        this.setState({
          isLoaded: true,
          categories: result,
          forceArr: result,
          unfilteredForceArray: result
        });
        console.log("original", result)
      },
        (error) => {
          this.setState({
            isLoaded: false,
            error
          });
        }
      )
  }

  neighbourhoodCount() {
    return this.state.length;
  }

  setIsNotShown() {
    this.setState({ isShown: false });
  }

  setIsShown(id, policeForce) {
    fetch(`https://data.police.uk/api/${policeForce}/neighbourhoods`)
      .then(res => res.json())
      .then((result) => {
        this.setState({
          isLoaded: true,
          length: result.length,
          isShown: true,
          id: id,
          policeForce: policeForce
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
  handleChange(event) {
    console.log("event", event.target.checked);
    //if (event.target.checked === false) {
    //  this.setState({ categories: this.state.unfilteredForceArray });
    //} else {
    this.setArray(event.target.value);
    //}
  }

  setArray(value) {
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
    let filteredForces = [];

    const forceArr = this.state.forceArr;
    for (let i = 0; i < arr.length; i++) {
      filteredForces = filteredForces.concat(forceArr.filter(element => element.id === arr[i]));
      console.log("second", filteredForces)

    }

    console.log("filteredforces before state", filteredForces)
    this.setState({
      categories: filteredForces
    });
  }

  render() {
    console.log("state:", this.state)
    const { shapes, categories, isLoaded, colours, isShown, id } = this.state;
    return (
      <>
        <NavBar />
        <Container className="top-breadcrumb">
          <Row>
            <Col>
              <Breadcrumb >
                <Breadcrumb.Item href="/">Police Force </Breadcrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
        </Container>
        <Row className="filter-padding">
        </Row>
        <Container fluid className="personal-details-container">
          <Row>
            <Col sm={4}>
              <Row>
                <PoliceForceSummary stopAndSearch={this.state.stopSearchResult} filtered={this.state.filteredData} policeCount={categories.length} />
              </Row>
              <Row>
                <StopAndSearchChart />
              </Row>
              <Row>
                <PoliceForceInfo force={this.state.policeForce} />
              </Row>
            </Col>
            <Col sm={8}>
              <Jumbotron className="personal-details-jumbotron">
                {/* <PoliceForceFilter forceArr={this.state.forceArr} stopAndSearch={this.state.stopSearchResult} /> */}
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
                {!isLoaded
                  ? <div><Loading /></div>
                  :
                  <svg viewBox="0 0 100 132">
                    {categories.map((category, i) => (
                      <NavLink key={i} className="nav-link"
                        onMouseEnter={() => { this.setIsShown(i, category.id) }}
                        onMouseLeave={() => {
                          this.setIsNotShown()
                        }} to={{
                          pathname: '/neighbourhoods',
                          aboutProps: {
                            selectedPoliceForce: this.state.policeForce
                          }
                        }}>
                        <circle
                          className="circle-css"
                          style={{
                            fill: colours[i]
                          }}
                          cx={shapes[i].xcords}
                          cy={shapes[i].ycords - 1}
                          r={this.calculateBubbleSize(category.name)}
                        />
                        {isShown && i === id ?
                          <>
                            <text x={shapes[i].xcords} y={shapes[i].ycords - 3} textAnchor='middle' alignmentBaseline="middle" fontSize="0.075em">{category.name}</text>
                            <text x={shapes[i].xcords} y={shapes[i].ycords - -1} textAnchor='middle' alignmentBaseline=" middle" fontSize="0.075em">{this.neighbourhoodCount()} neighbourhoods</text>
                          </>
                          :
                          <text x={shapes[i].xcords} y={shapes[i].ycords - 1} textAnchor='middle' alignmentBaseline="middle" fontSize="0.075em">{category.name}</text>
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
export default Home;