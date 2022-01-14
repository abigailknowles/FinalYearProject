import React, { } from "react";
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import NavBar from '../components/NavBar';
import LastUpdated from '../components/LastUpdated';

class Neighbourhoods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      date: '',
      shapes: [
        { colour: "#74bec8", size: '10', xcords: 23.5, ycords: 22.5 },
        // row one
        { colour: "#ccf3ff", size: '10', xcords: 23.5, ycords: 22.5 },
        { colour: "#d8bfff", size: '5.3', xcords: 39.5, ycords: 21 },
        { colour: "#f75e5b", size: '7.1', xcords: 52, ycords: 17 },
        { colour: "#fff88b", size: '8.3', xcords: 68, ycords: 20 },
        { colour: "#e80b8c", size: '5.4', xcords: 81.7, ycords: 25 },
        // row two
        { colour: "#938fff", size: '6', xcords: 24, ycords: 39.4 },
        { colour: "#f7c6af", size: '8', xcords: 38.2, ycords: 35 },
        { colour: "#ffa661", size: '9.3', xcords: 56.2, ycords: 34 },
        { colour: "#7ee9cf", size: '7', xcords: 73.6, ycords: 36 },
        { colour: "#ffeefe", size: '5.2', xcords: 13, ycords: 35 },
        // row three
        { colour: "#d2f9d0", size: '7', xcords: 37, ycords: 51 },
        { colour: "#e0f49c", size: '9', xcords: 82, ycords: 51 },
        { colour: "#02ccf9", size: '6.5', xcords: 88, ycords: 36 },
        // row four
        { colour: "#ffc1f8", size: '5', xcords: 50, ycords: 49 },
        { colour: "#ffa0ab", size: '8', xcords: 64, ycords: 50 },
      ]
    };
  }

  componentDidMount() {
    fetch("https://data.police.uk/api/northamptonshire/neighbourhoods")
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
    const { shapes, categories } = this.state;

    return (
      <>
        <NavBar />
        <Container>
          <svg viewBox="0 0 100 70">
            <LastUpdated />
            {categories.map((category, i) => (
              <NavLink key={i} to="/street-crimes" className="nav-link">
                <circle
                  className="circle-css"
                  style={{
                    fill: shapes[i].colour
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

export default Neighbourhoods;