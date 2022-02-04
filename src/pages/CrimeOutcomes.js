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
    fetch("https://data.police.uk/api/outcomes-at-location?date=2021-01&poly=52.268,0.543:52.794,0.238:52.130,0.478")
      .then(res => res.json())
      .then(
        (result) => {
          var outcomes = this.groupBy(result);
          console.log(outcomes)
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
  setIsShown(state, id) {
    this.setState({ isShown: state, id: id })
  }
  render() {
    const { shapes, categories, isLoaded, isShown, id } = this.state;
    return (
      <>
        <NavBar />
        <Container>
          <Container className="top-breadcrumb">
            <Breadcrumb >
              <Breadcrumb.Item href="/">Police Force - {this.textFormatter(this.state.policeForce)}</Breadcrumb.Item>
              <Breadcrumb.Item href="/neighbourhoods"> Neighbourhoods - {this.state.neighbourhood}</Breadcrumb.Item>
              <Breadcrumb.Item href="/street-crimes"> Street Crimes - {this.textFormatter(this.state.crime)}</Breadcrumb.Item>
              <Breadcrumb.Item active> Crime Outcomes </Breadcrumb.Item>
            </Breadcrumb>
          </Container>
          {!isLoaded
            ? <div><Loading /></div>
            :
            <svg viewBox="0 0 100 70">
              <LastUpdated />
              <text x='3' y='3' fontSize="0.075em">Total crime outcomes: {categories.count}</text>

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
        </Container>
      </>
    );
  }
}

export default StreetCrimes;