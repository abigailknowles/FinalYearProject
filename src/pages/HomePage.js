import React, { } from "react";
import MainMenu from '../components/MainMenu';
import { Container } from 'react-bootstrap';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shapes: [
        // row one
        { colour: "#74bec8", size: '10.2', xcords: 23.5, ycords: 22.5 },
        { colour: "#d8bfff", size: '5.3', xcords: 39.5, ycords: 21 },
        { colour: "#ed5042", size: '7.1', xcords: 52, ycords: 17 },
        { colour: "#f7c6af", size: '8.3', xcords: 68, ycords: 20 },
        { colour: "#e80b8c", size: '5.4', xcords: 81.7, ycords: 25 },
        // row two
        { colour: "#5552bf", size: '6', xcords: 24, ycords: 39.4 },
        { colour: "#f9db61", size: '8', xcords: 38.2, ycords: 35 },
        { colour: "#ff9c56", size: '9.3', xcords: 56.2, ycords: 34 },
        { colour: "#28c153", size: '7', xcords: 73.6, ycords: 36 },
        // row three
        { colour: "#9e00b2", size: '7', xcords: 37, ycords: 51 },
        { colour: "#e0f49c", size: '9', xcords: 82, ycords: 51 },
        { colour: "#02ccf9", size: '6.5', xcords: 88, ycords: 36 },
        // row four
        { colour: "#ffc1f8", size: '5', xcords: 50, ycords: 49 },
        { colour: "#ea8785", size: '8', xcords: 64, ycords: 50 },
      ]
    };
  }

  render() {
    const { shapes } = this.state;

    return (
      <>
        <MainMenu></MainMenu>
        <div className="padding"></div>
        <Container>
          <svg style={{
            border: "2px solid white",
            padding: "6px"
          }}
            viewBox="0 0 100 100">
            <a href="/" className="mylink">
              {shapes.map((shape, i) => (
                <circle
                  key={i}
                  className="circle-css"
                  style={{
                    fill: shape.colour
                  }}
                  cx={shape.xcords}
                  cy={shape.ycords}
                  r={shape.size}
                />
              ))}
            </a>
            <text x="23.5" y="22.5" textAnchor='middle' alignment-baseline="middle" stroke-width="1px" fontSize="0.11em">Anti-social behaviour</text>
            <text x="39.5" y="21" textAnchor='middle' alignment-baseline="middle" stroke-width="1px" fontSize="0.075em">Bicycle theft</text>
            <text x="52" y="17" textAnchor='middle' alignment-baseline="middle" stroke-width="1px" fontSize="0.12em">Burglary</text>
            <text x="68" y="20" textAnchor='middle' alignment-baseline="middle" stroke-width="1px" fontSize="0.099em">Criminal damage</text>
            <text x="68" y="21.9" textAnchor='middle' alignment-baseline="middle" stroke-width="1px" fontSize="0.099em">and arson</text>
            <text x="81.7" y="25" textAnchor='middle' alignment-baseline="middle" stroke-width="1px" fontSize="0.1em">Drugs</text>
            <text x="24" y="39.4" textAnchor='middle' alignment-baseline="middle" stroke-width="1px" fontSize="0.1em">Other theft</text>
            <text x="38.2" y="35" textAnchor='middle' alignment-baseline="middle" stroke-width="1px" fontSize="0.1em">Possesion of</text>
            <text x="38.2" y="36.9" textAnchor='middle' alignment-baseline="middle" stroke-width="1px" fontSize="0.1em">weapons</text>
            <text x="56.2" y="34" textAnchor='middle' alignment-baseline="middle" stroke-width="1px" fontSize="0.13em">Public order</text>
            <text x="73.6" y="36" textAnchor='middle' alignment-baseline="middle" stroke-width="1px" fontSize="0.12em">Robbery</text>
            <text x="37" y="51" textAnchor='middle' alignment-baseline="middle" stroke-width="1px" fontSize="0.1em">Shoplifting</text>
            <text x="82" y="51" textAnchor='middle' alignment-baseline="middle" stroke-width="1px" fontSize="0.1em">Theft from the person</text>
            <text x="88" y="36" textAnchor='middle' alignment-baseline="middle" stroke-width="1px" fontSize="0.1em">Vehicle crime</text>
            <text x="50" y="49" textAnchor='middle' alignment-baseline="middle" stroke-width="1px" fontSize="0.08em">Other crime</text>
            <text x="64" y="50" textAnchor='middle' alignment-baseline="middle" stroke-width="1px" fontSize="0.09em">Violence and sexual</text>
            <text x="64" y="51.7" textAnchor='middle' alignment-baseline="middle" stroke-width="1px" fontSize="0.08em">offences</text>
          </svg>
        </Container>
      </>
    );
  }
}

export default HomePage;