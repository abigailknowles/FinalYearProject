import React, { } from "react";
import { Container } from 'react-bootstrap';
import NavBar from '../components/NavBar';

class StopAndSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      shapes: [
        { colour: "#74bec8", size: '10.2', xcords: 23.5, ycords: 22.5 },
        // row one
        { colour: "#ccf3ff", size: '10.2', xcords: 23.5, ycords: 22.5 },
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
        // row five
        { colour: "#f0f0f5", size: '7', xcords: 22, ycords: 53 },
        { colour: "#ffdd99", size: '8', xcords: 69, ycords: 66 },
        { colour: "#ffe0e0", size: '8', xcords: 31, ycords: 66 },
        { colour: "#b3d9ff", size: '10', xcords: 50, ycords: 65 },
        { colour: "#ff6666", size: '5', xcords: 83, ycords: 66 },
        { colour: "#99ff99", size: '8', xcords: 64, ycords: 50 },
        // row six
        { colour: "#b8ffdb", size: '9.4', xcords: 40, ycords: 83 },
        { colour: "#e6e6ff ", size: '8', xcords: 59, ycords: 82 },
        { colour: "#ff80aa", size: '10', xcords: 78, ycords: 82 },
        { colour: "#adebeb", size: '5.8', xcords: 24, ycords: 79 },
        { colour: "#ccccff", size: '7', xcords: 15, ycords: 68 },
        //row 7
        { colour: "#00cccc", size: '8.3', xcords: 67.5, ycords: 98 },
        { colour: "#ff9999", size: '5.9', xcords: 38, ycords: 99 },
        { colour: "#fff88d", size: '6.8', xcords: 83.5, ycords: 99 },
        { colour: "#99ffff", size: '7', xcords: 51.5, ycords: 96.5 },
        { colour: "#ffa366", size: '9', xcords: 23, ycords: 94.6 },
        { colour: "#ebfafa", size: '5', xcords: 12.2, ycords: 82 },
        //row 8
        { colour: "#ffffcc", size: '5', xcords: 16.5, ycords: 108 },
        { colour: "#f9e6ff", size: '7', xcords: 29.5, ycords: 110 },
        { colour: "#faebf5", size: '6.2', xcords: 64, ycords: 113 },
        { colour: "#ffe6cc", size: '10', xcords: 47, ycords: 113.5 },
        { colour: "#e6e6e6", size: '9', xcords: 80, ycords: 115 },
        //row 9
        { colour: "#6666cc", size: '9.2', xcords: 18, ycords: 123 },
        { colour: "#ffdd99", size: '5', xcords: 33, ycords: 122.5 },
        { colour: "#b3ffb3", size: '9', xcords: 62, ycords: 129 },
        { colour: "#80ffdf", size: '7.9', xcords: 44, ycords: 132.5 },
        { colour: "#b3d9ff", size: '8', xcords: 80, ycords: 133 },
        { colour: "#a0a1f5", size: '5.3', xcords: 30, ycords: 133 },
      ]
    };
  }

  componentDidMount() {
    fetch("https://data.police.uk/api/forces")
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
            {categories.map((category, i) => (
              <a key={i} href="/neighbourhoods" className="mylink">
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
              </a>
            ))}
          </svg>
        </Container>
      </>
    );
  }
}

export default StopAndSearch;