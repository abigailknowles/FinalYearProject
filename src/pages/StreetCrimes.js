import React, { } from "react";
import { Container, Row, Button, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import NavBar from '../components/NavBar';
import LastUpdated from '../components/LastUpdated';
import Loading from '../components/Loading';
import StreetCrimesFilter from "../components/StreetCrimesFilter";
import Select from 'react-select';


const outcomes = [
  { value: 'resolved', label: 'Resolved' },
  { value: 'ongoing', label: 'Ongoing' }
];
const months = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];
const years = [
  { value: '2014', label: '2014' },
  { value: '2015', label: '2015' },
  { value: '2016', label: '2016' },
  { value: '2017', label: '2017' },
  { value: '2018', label: '2018' },
  { value: '2019', label: '2019' },
  { value: '2020', label: '2020' },
  { value: '2021', label: '2021' }
];
class StreetCrimes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      date: '',
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

      ]
    };
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
  setIsShown(state, id, crime) {
    this.setState({ isShown: state, id: id, crime: crime })
  }
  toggle(state) {
    this.setState({ isClicked: state })
  }
  render() {
    const { shapes, categories, isLoaded, colours, isShown, id, isClicked } = this.state;
    return (
      <>
        <NavBar />
        <Container>

          <Container className="top-breadcrumb">
            <Breadcrumb >
              <Breadcrumb.Item href="/">Police Force - {this.textFormatter(this.state.policeForce)}</Breadcrumb.Item>
              <Breadcrumb.Item href="/neighbourhoods"> Neighbourhoods - {this.state.neighbourhood} </Breadcrumb.Item>
              <Breadcrumb.Item active> Street Crimes </Breadcrumb.Item>
            </Breadcrumb>
          </Container>
          <Row className="filter-padding">
          </Row>
          {!isClicked ?
            <>
              <Button className="filter-button" variant="light" onClick={() => { this.toggle(true) }}>
                Enable filters
              </Button>
            </>
            :
            <>
              <Button className="filter-button" variant="light" onClick={() => { this.toggle(false) }}>
                Disable filters
              </Button>
              <Row className="filter-padding"></Row>

            </>
          }
          {isClicked ?
            <>
              <div className="filter-box">
                <Container >
                  <Row className="filter-row">
                    <Col className="no-padding">
                      <h3 className="filter-text">Filter by</h3>
                    </Col>
                  </Row>
                  <Row className="filter-padding">
                    <Col >
                      <Select
                        placeholder="Crime "
                        value={this.selectedOption}
                        onChange={this.handleChange}
                        options={months}
                      />
                    </Col>
                    <Col>
                      <Select
                        placeholder="Month"
                        value={this.selectedOption}
                        onChange={this.handleChange}
                        options={months}
                      />
                    </Col>
                    <Col>
                      <Select
                        placeholder="Year"
                        value={this.selectedOption}
                        onChange={this.handleChange}
                        options={years}
                      />
                    </Col>
                  </Row>
                  <Row className="filter-padding">
                    <Col>
                      <Button className="filter-button" type="submit" variant="light">Update</Button>
                    </Col>
                  </Row>
                </Container>
              </div>            </>
            :
            <></>
          }

          {!isLoaded
            ? <div><Loading /></div>
            :
            <svg viewBox="0 0 100 70">

              <LastUpdated />
              <text x='1' y='3' fontSize="0.075em">Total street crimes: {categories.count}</text>
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
                      cy={shapes[i].ycords}
                      r={this.calculateBubbleSize(category.group.count, categories.count)}
                    />
                    {isShown && i === id ?
                      <>
                        <text x={shapes[i].xcords} y={shapes[i].ycords - 2} textAnchor='middle' alignmentBaseline="middle" fontSize="0.075em">{this.textFormatter(category.category)}</text>
                        <text x={shapes[i].xcords} y={shapes[i].ycords + 2} textAnchor='middle' alignmentBaseline="middle" fontSize="0.075em">{category.group.count} </text>
                        <text x={shapes[i].xcords} y={shapes[i].ycords + 4} textAnchor='middle' alignmentBaseline="middle" fontSize="0.075em">{this.calculatePercentage(category.group.count, categories.count)} %</text>
                      </>
                      :
                      <text x={shapes[i].xcords} y={shapes[i].ycords} textAnchor='middle' alignmentBaseline="middle" fontSize="0.075em">{this.textFormatter(category.category)}</text>
                    }
                  </NavLink>
                ))}
            </svg>
          }

        </Container>
      </>
    );
  }
}

export default StreetCrimes;