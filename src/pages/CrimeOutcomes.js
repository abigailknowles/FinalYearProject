import React, { } from "react";
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb'

import NavBar from '../components/NavBar';
import LastUpdated from '../components/LastUpdated';
import Loading from '../components/Loading';

class StreetCrimes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      date: '',
      shapes: [
        { colour: "#74bec8", xcords: 50, ycords: 28 },
        { colour: "#ccf3ff", xcords: 33, ycords: 20 },
        { colour: "#d8bfff", xcords: 33, ycords: 33.5 },
        { colour: "#f75e5b", xcords: 65.5, ycords: 21.5 },
        { colour: "#fff88b", xcords: 66.5, ycords: 32 },
        { colour: "#e80b8c", xcords: 51, ycords: 45 },
        { colour: "#938fff", xcords: 41, ycords: 42 },
        { colour: "#f7c6af", xcords: 61, ycords: 41 },
      ]
    };
  }

  isGroupInArray(groups, code) {
    var isFound = false;
    for (var key in groups) {
      if (groups[key].code == code) {
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
      if (this.isGroupInArray(groups, code) == false)
        groups.push({ code: code, group: this.getByGroupName(arr, code) })
    }

    return { groups: groups, count: arr.length };
  }

  calculatePercentage(value, totalValue) {
    var percentage = (value / totalValue * 100).toFixed(2);
    return percentage;
  }

  calculateBubbleSize(value, totalValue) {
    var percentage = (value / totalValue * 100).toFixed(2);

    if (percentage <= 10) {
      var size = "4.8"
    }
    else if (percentage <= 20) {
      var size = "5.8"
    }
    else if (percentage <= 30) {
      var size = "6.8"
    }
    else if (percentage <= 40) {
      var size = "7.8"
    }
    else if (percentage <= 50) {
      var size = "8.8"
    }
    else if (percentage <= 60) {
      var size = "9.8"
    }
    else if (percentage <= 70) {
      var size = "10.8"
    }
    else if (percentage <= 80) {
      var size = "11.8"
    }
    else if (percentage <= 90) {
      var size = "12.8"
    }
    else if (percentage <= 100) {
      var size = "13.8"
    }
    return size
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
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { shapes, categories, isLoaded } = this.state;
    if (!isLoaded) return <div>
      <Loading />
    </div >;
    return (
      <>
        <NavBar />
        <Container>
          <Container>
            <Breadcrumb >
              <Breadcrumb.Item href="/">Police Force</Breadcrumb.Item>
              <Breadcrumb.Item href="/neighbourhoods"> Neighbourhoods </Breadcrumb.Item>
              <Breadcrumb.Item href="/street-crimes"> Street Crimes </Breadcrumb.Item>
              <Breadcrumb.Item active> Crime Outcomes </Breadcrumb.Item>
            </Breadcrumb>
          </Container>
          <svg viewBox="0 0 100 70">
            <LastUpdated />
            <text x='1' y='6' fontSize="0.075em">Total crime outcomes: {categories.count}</text>

            {
              categories.groups.map((category, i) => (
                <NavLink key={i} to="/police-force" className="nav-link">
                  <circle
                    className="circle-css"
                    style={{
                      fill: shapes[i].colour
                    }}
                    cx={shapes[i].xcords}
                    cy={shapes[i].ycords}
                    r={this.calculateBubbleSize(category.group.count, categories.count)}
                  />
                  <text x={shapes[i].xcords} y={shapes[i].ycords} textAnchor='middle' alignmentBaseline="middle" fontSize="0.075em">{category.code}</text>
                  <text x={shapes[i].xcords} y={shapes[i].ycords + 2} textAnchor='middle' alignmentBaseline="middle" fontSize="0.075em">{category.group.count}</text>
                  <text x={shapes[i].xcords} y={shapes[i].ycords + 4} textAnchor='middle' alignmentBaseline="middle" fontSize="0.075em">{this.calculatePercentage(category.group.count, categories.count)} %</text>
                </NavLink>
              ))}
          </svg>
        </Container>
      </>
    );
  }
}

export default StreetCrimes;