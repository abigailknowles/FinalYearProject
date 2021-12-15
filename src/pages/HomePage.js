import React, { useState } from "react";
import MainMenu from '../components/MainMenu';

const Circles = () => {
  const generateDataset = () => (
    Array(10).fill(0).map(() => ([
      Math.random() * 80 + 10,
      Math.random() * 35 + 10,
    ]))
  )
  const [dataset, setDataset] = useState(
    generateDataset()
  )


  const useInterval = (() => {
    const newDataset = generateDataset()
    setDataset(newDataset)
  }, 2000)

  return (
    <>
      <MainMenu></MainMenu>
      <svg viewBox="0 0 100 50">
        {dataset.map(([x, y], i) => (
          <circle
            cx={x}
            cy={y}
            r="3"
          />
        ))}
      </svg>
    </>
  )
}
export default Circles;