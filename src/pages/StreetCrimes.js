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
      colours: ['#ccf3ff', '#74bec8', '#d8bfff', '#f75e5b', '#fff88b', '#e80b8c', '#938fff', '#f7c6af', '#ffa661', '#7ee9cf', '#ffeefe',
        '#d2f9d0', '#e0f49c', '#02ccf9', '#ffc1f8', '#ffa0ab', '#f0f0f5', '#ffdd99', '#ffe0e0', '#b3d9ff', '#ff6666', '#99ff99', '#b8ffdb',
        '#e6e6ff', '#ff80aa', '#adebeb', '#ccccff', '#00cccc', '#ff9999', '#fff88d', '#99ffff', '#ffa366', '#ebfafa', '#ffffcc', '#f9e6ff', '#faebf5',
        '#ffe6cc', '#e6e6e6', '#6666cc', '#ffdd99', '#b3ffb3', '#80ffdf', '#b3d9ff', '#a0a1f5', '#ffccff', '#b3ccff', '#9fdfbf', '#a3a3c2', '#6699cc'],
      shapes: [
        { xcords: 50, ycords: 20 },
        { xcords: 28.5, ycords: 33 },
        { xcords: 38, ycords: 39.5 },
        { xcords: 62, ycords: 25 },
        { xcords: 66.5, ycords: 35 },
        { xcords: 44, ycords: 48 },
        { xcords: 39, ycords: 28 },
        { xcords: 75, ycords: 42 },
        { xcords: 65, ycords: 45.5 },
        { xcords: 52, ycords: 36 },
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
      size = "4.8"
    }
    else if (percentage <= 20) {
      size = "5.8"
    }
    else if (percentage <= 30) {
      size = "6.8"
    }
    else if (percentage <= 40) {
      size = "7.8"
    }
    else if (percentage <= 50) {
      size = "8.8"
    }
    else if (percentage <= 60) {
      size = "9.8"
    }
    else if (percentage <= 70) {
      size = "10.8"
    }
    else if (percentage <= 80) {
      size = "11.8"
    }
    else if (percentage <= 90) {
      size = "12.8"
    }
    else if (percentage <= 100) {
      size = "13.8"
    }
    return size
  }
  componentDidMount() {
    fetch("https://data.police.uk/api/crimes-street/all-crime?poly=52.268,0.543:52.794,0.238:52.130,0.478")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
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
  render() {
    const { shapes, categories, isLoaded, colours, isShown, id, crime } = this.state;
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
          {/* <div className="App">
            <NavLink className="nav-link"
              onMouseEnter={() => { this.setIsShown(true) }}
              onMouseLeave={() => { this.setIsShown(false) }}
              to={{
                pathname: 'crime-outcomes',
                aboutProps: {
                  selectedPoliceForce: this.state.policeForce,
                  selectedNeighbourhood: this.state.neighbourhood,
                  selectedStreetCrime: this.state.crime
                }
              }}>
              Hover over me!
            </NavLink>
            {isShown && (
              <text x='6' y='3' fontSize="0.075em">Total street crimes: </text>
            )}
          </div> */}
          {!isLoaded
            ? <div><Loading /></div>
            :
            <svg viewBox="0 0 100 70">

              <LastUpdated />
              <text x='3' y='3' fontSize="0.075em">Total street crimes: {categories.count}</text>
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