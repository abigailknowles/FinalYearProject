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
      colours: ['#ccf3ff', '#74bec8', '#d8bfff', '#f75e5b', '#fff88b', '#e80b8c', '#938fff', '#f7c6af', '#ffa661', '#7ee9cf', '#ffeefe',
        '#d2f9d0', '#e0f49c', '#02ccf9', '#ffc1f8', '#ffa0ab', '#f0f0f5', '#ffdd99', '#ffe0e0', '#b3d9ff', '#ff6666', '#99ff99', '#b8ffdb',
        '#e6e6ff', '#ff80aa', '#adebeb', '#ccccff', '#00cccc', '#ff9999', '#fff88d', '#99ffff', '#ffa366', '#ebfafa', '#ffffcc', '#f9e6ff', '#faebf5',
        '#ffe6cc', '#e6e6e6', '#6666cc', '#ffdd99', '#b3ffb3', '#80ffdf', '#b3d9ff', '#a0a1f5', '#ffccff', '#b3ccff', '#9fdfbf', '#a3a3c2', '#6699cc'],
      shapes: [
        { size: '10.2', xcords: 23.5, ycords: 22.5 },
        { size: '10.2', xcords: 23.5, ycords: 22.5 },
        { size: '5.3', xcords: 39.5, ycords: 21 },
        { size: '7.1', xcords: 52, ycords: 17 },
        { size: '8.3', xcords: 68, ycords: 20 },
        { size: '5.4', xcords: 81.7, ycords: 25 },
        { size: '6', xcords: 24, ycords: 39.4 },
        { size: '8', xcords: 38.2, ycords: 35 },
        { size: '9.3', xcords: 56.2, ycords: 34 },
        { size: '7', xcords: 73.6, ycords: 36 },
        { size: '5.6', xcords: 33, ycords: 48.5 },
        { size: '9', xcords: 82, ycords: 51 },
        { size: '6.5', xcords: 88, ycords: 36 },
        { size: '8', xcords: 47, ycords: 50 },
        { size: '8', xcords: 64, ycords: 50 },
      ]
    };
  }

  componentDidMount() {
    fetch("https://data.police.uk/api/crime-categories")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            categories: result,
          });
          console.log(result)
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
    const { shapes, categories, isLoaded, colours } = this.state;
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
              <Breadcrumb.Item active> Street Crimes </Breadcrumb.Item>
            </Breadcrumb>
          </Container>
          <svg viewBox="0 0 100 70">
            <LastUpdated />
            {
              categories.map((category, i) => (
                <NavLink key={i} to="/crime-outcomes" className="nav-link">
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
        </Container>
      </>
    );
  }
}

export default StreetCrimes;