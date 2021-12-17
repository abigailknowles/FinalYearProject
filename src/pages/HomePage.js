import React, { useState } from "react";
import MainMenu from '../components/MainMenu';
import { Container } from 'react-bootstrap';
var randomColor = require('randomcolor');

const Circles = () => {
  const generateDataset = () => (
    Array(12).fill(0).map(() => ([
      Math.random() * 75 + 10,
      Math.random() * 50 + 10,
    ]))
  )

  const [dataset] = useState(
    generateDataset()
  )

  // const useInterval = (() => {
  //   const newDataset = generateDataset()
  //   setDataset(newDataset)
  // }, 2000)
  const colors = [randomColor(), randomColor(), randomColor(), randomColor(), randomColor(), randomColor(), randomColor(), randomColor(), randomColor(), randomColor(), randomColor(), randomColor()];
  const size = ['11', '6', '8', '5', '7', '8', '4', '6', '5', '7', '11', '4'];

  return (
    <>
      <MainMenu></MainMenu>
      <div className="padding"></div>
      <Container>

        <svg style={{
          border: "2px solid white",
          padding: "6px"
        }} viewBox="0 2 100 70">
          <a href="/" class="mylink">
            {dataset.map(([x, y], i) => (

              <circle
                className="circle-css"
                style={{
                  fill: colors[i]
                }}
                cx={x}
                cy={y}
                r={size[i]}

              />
            ))}
          </a>

        </svg>
      </Container>
    </>
  )
}
export default Circles;