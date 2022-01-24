import React, { } from "react";
import { Container, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

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
        { colour: "#74bec8", size: '10', xcords: 25, ycords: 28 },
        { colour: "#ccf3ff", size: '7', xcords: 37, ycords: 14 },
        { colour: "#d8bfff", size: '5.3', xcords: 42, ycords: 26.4 },
        { colour: "#f75e5b", size: '7.1', xcords: 52, ycords: 17 },
        { colour: "#fff88b", size: '8.3', xcords: 68, ycords: 20 },
        { colour: "#e80b8c", size: '5.4', xcords: 70.5, ycords: 34.5 },
        { colour: "#938fff", size: '6.9', xcords: 39.2, ycords: 39.4 },
        { colour: "#f7c6af", size: '8.8', xcords: 55, ycords: 35 },
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
      if (arr[i].category.code === code) {
        group.push(arr[i]);
      }
    }
    return group;
  }

  groupBy(arr) {
    var groups = [];

    for (var i = 0; i < arr.length; i++) {
      var code = arr[i].category.code;
      if (this.isGroupInArray(groups, code) == false)
        groups.push({ code: code, items: this.getByGroupName(arr, code) })
    }

    return groups;
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
          console.log(outcomes);
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
    const { shapes, categories } = this.state;

    return (
      <>
        <NavBar />
        <Container>
          <Container>
            <Navbar collapseOnSelect expand="lg" variant="dark" >
              <NavLink className="nav-link" to="/">
                <h5 className="nav-link-text">Police Force</h5>
              </NavLink>
              <h5 className="nav-link-text">
                <FontAwesomeIcon size="1x" icon={faChevronRight} />
              </h5>
              <NavLink className="nav-link" to="/neighbourhoods">
                <h5 className="nav-link-text">Neighbourhoods</h5>
              </NavLink>
              <h5 className="nav-link-text">
                <FontAwesomeIcon size="1x" icon={faChevronRight} />
              </h5>
              <NavLink className="nav-link" to="/street-crimes">
                <h5 className="nav-link-text">Street Crimes</h5>
              </NavLink>
              <NavLink className="nav-link" to="/street-crimes">
                <h5 className="nav-link-text">Crime Outcomes </h5>
              </NavLink>
            </Navbar>
          </Container>
          <svg viewBox="0 0 100 70">
            <LastUpdated />
            {
              categories.map((category, i) => (
                <NavLink key={i} to="/police-force" className="nav-link">
                  <circle
                    className="circle-css"
                    style={{
                      fill: shapes[i].colour
                    }}
                    cx={shapes[i].xcords}
                    cy={shapes[i].ycords}
                    r={shapes[i].size}
                  />
                  <text x={shapes[i].xcords} y={shapes[i].ycords} textAnchor='middle' alignmentBaseline="middle" fontSize="0.075em">{category.code}</text>
                </NavLink>
              ))}
          </svg>
        </Container>
      </>
    );
  }
}

export default StreetCrimes;