import React, { } from "react";
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import NavBar from '../components/NavBar';
import LastUpdated from '../components/LastUpdated';
import Loading from '../components/Loading';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      isShown: false,
      setIsShown: false,
      colours: ['#ccf3ff', '#74bec8', '#d8bfff', '#f75e5b', '#fff88b', '#e80b8c', '#938fff', '#f7c6af', '#ffa661', '#7ee9cf', '#ffeefe',
        '#d2f9d0', '#e0f49c', '#02ccf9', '#ffc1f8', '#ffa0ab', '#f0f0f5', '#ffe0e0', '#ff6666', '#99ff99', '#b8ffdb', '#e6e6ff', '#ff80aa',
        '#adebeb', '#ccccff', '#00cccc', '#ff9999', '#fff88d', '#99ffff', '#ffa366', '#ebfafa', '#ffffcc', '#f9e6ff', '#faebf5', '#ffe6cc',
        '#e6e6e6', '#6666cc', '#ffdd99', '#b3ffb3', '#80ffdf', '#b3d9ff', '#a0a1f5', '#ffccff', '#b3ccff', '#9fdfbf', '#a3a3c2', '#6699cc'],
      shapes: [
        { size: '10', xcords: 23.5, ycords: 22.5 },
        { size: '10', xcords: 23.5, ycords: 22.5 },
        { size: '5.3', xcords: 39.5, ycords: 21 },
        { size: '7.1', xcords: 52, ycords: 17 },
        { size: '8.3', xcords: 68, ycords: 20 },
        { size: '5.4', xcords: 81.7, ycords: 25 },
        { size: '6', xcords: 24, ycords: 39.4 },
        { size: '8', xcords: 38.2, ycords: 35 },
        { size: '9.3', xcords: 56.2, ycords: 34 },
        { size: '7', xcords: 73.6, ycords: 36 },
        { size: '5.2', xcords: 13, ycords: 35 },
        { size: '7', xcords: 37, ycords: 51 },
        { size: '9', xcords: 82, ycords: 51 },
        { size: '6.5', xcords: 88, ycords: 36 },
        { size: '5', xcords: 50, ycords: 49 },
        { size: '8', xcords: 64, ycords: 50 },
        { size: '7', xcords: 22, ycords: 53 },
        { size: '8', xcords: 69, ycords: 66 },
        { size: '8', xcords: 31, ycords: 66 },
        { size: '10', xcords: 50, ycords: 65 },
        { size: '6.4', xcords: 85, ycords: 66.7 },
        { size: '8', xcords: 64, ycords: 50 },
        { size: '9.4', xcords: 40, ycords: 83 },
        { size: '8', xcords: 59, ycords: 82 },
        { size: '10', xcords: 78, ycords: 82 },
        { size: '5.8', xcords: 24, ycords: 79 },
        { size: '7', xcords: 15, ycords: 68 },
        { size: '8.3', xcords: 67.5, ycords: 98 },
        { size: '5.9', xcords: 38, ycords: 99 },
        { size: '6.8', xcords: 83.5, ycords: 99 },
        { size: '7', xcords: 51.5, ycords: 96.5 },
        { size: '9', xcords: 23, ycords: 94.6 },
        { size: '5', xcords: 12.2, ycords: 82 },
        { size: '5', xcords: 16.5, ycords: 108 },
        { size: '7', xcords: 29.5, ycords: 110 },
        { size: '6.2', xcords: 64, ycords: 113 },
        { size: '10', xcords: 47, ycords: 113.5 },
        { size: '9', xcords: 80, ycords: 115 },
        { size: '9.2', xcords: 18, ycords: 123 },
        { size: '5', xcords: 33, ycords: 122.5 },
        { size: '9', xcords: 62, ycords: 129 },
        { size: '7.9', xcords: 44, ycords: 132.5 },
        { size: '8', xcords: 80, ycords: 133 },
        { size: '5.3', xcords: 30, ycords: 133 },
      ]
    };
  }

  componentDidMount() {
    fetch("https://data.police.uk/api/forces")
      .then(res => res.json())
      .then((result) => {
        this.setState({
          isLoaded: true,
          categories: result,
        });
      },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    fetch(
      "https://data.police.uk/api/northamptonshire/neighbourhoods")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          neighbourhoods: json,
          isLoaded: true
        });
        console.log("Neighbourhoods:")
        console.log(json)
      })
    fetch(
      "https://data.police.uk/api/northamptonshire/SCT102/boundary")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          boundary: json,
          isLoaded: true
        });
        console.log("Coordinates:")
        console.log(json)
      })
    fetch("https://data.police.uk/api/crimes-street/all-crime?poly=52.268,0.543:52.794,0.238:52.130,0.478")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          data: json,
          isLoaded: true
        });
        console.log("Crimes:")
        console.log(json)
      })
  }
  // Wrap text in a circle.
  wrapText(text) {

    text = text.replace(' ', "\r\n");

    return text;
  }

  render() {
    const { shapes, categories, isLoaded, colours, isShown, setIsShown } = this.state;
    return (
      <>
        <NavBar />
        <Container>

          <Container className="top-breadcrumb">
            <Breadcrumb >
              <Breadcrumb.Item active>Police Force</Breadcrumb.Item>
            </Breadcrumb>
          </Container>

          {!isLoaded
            ? <div><Loading /></div>
            :
            <svg viewBox="0 0 100 150">
              <LastUpdated />
              <text x='3' y='3' fontSize="0.075em">Total police forces: {categories.length}</text>
              {categories.map((category, i) => (
                <NavLink key={i} className="nav-link"
                  onMouseEnter={() => {
                    this.setState({ policeForce: category.id })
                  }} to={{
                    pathname: 'neighbourhoods',
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
                    cy={shapes[i].ycords}
                    r={shapes[i].size}
                  />
                  <text x={shapes[i].xcords} y={shapes[i].ycords} textAnchor='middle' alignmentBaseline=" middle" fontSize="0.075em">{this.wrapText(category.name)}</text>

                </NavLink>
              ))}
            </svg>
          }
        </Container>
      </>
    );
  }
}

export default HomePage;