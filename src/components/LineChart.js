import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Chart from "react-apexcharts";

class LineChart extends Component {
  constructor() {
    super();
    this.state = {
      series: [{
        name: "Crime count",
        data: [69, 91, 148, 50, 20, 48]
      }],
      options: {
        chart: {
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Crimes in 2021',
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        xaxis: {
          categories: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        }
      },
    };
  }

  LineChartCrimes() {
    fetch("https://data.police.uk/api/crimes-street/all-crime?poly=52.268,0.543:52.794,0.238:52.130,0.478&date=2021-07")
      .then(dat => dat.json())
      .then(
        (data) => {
          this.setState({
            t: data.length
          });
          console.log("1 - july", this.state.t)
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
    fetch("https://data.police.uk/api/crimes-street/all-crime?poly=52.268,0.543:52.794,0.238:52.130,0.478&date=2021-08")
      .then(dat => dat.json())
      .then(
        (data) => {
          this.setState({
            t: data.length
          });
          console.log("2- august", this.state.t)
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
    fetch("https://data.police.uk/api/crimes-street/all-crime?poly=52.268,0.543:52.794,0.238:52.130,0.478&date=2021-09")
      .then(dat => dat.json())
      .then(
        (data) => {
          this.setState({
            t: data.length
          });
          console.log("3 - sept", this.state.t)
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
    fetch("https://data.police.uk/api/crimes-street/all-crime?poly=52.268,0.543:52.794,0.238:52.130,0.478&date=2021-10")
      .then(dat => dat.json())
      .then(
        (data) => {
          this.setState({
            t: data.length
          });
          console.log("4 - oct", this.state.t)
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
    fetch("https://data.police.uk/api/crimes-street/all-crime?poly=52.268,0.543:52.794,0.238:52.130,0.478&date=2021-11")
      .then(dat => dat.json())
      .then(
        (data) => {
          this.setState({
            t: data.length
          });
          console.log("5 - nov", this.state.t)
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
    fetch("https://data.police.uk/api/crimes-street/all-crime?poly=52.268,0.543:52.794,0.238:52.130,0.478&date=2021-12")
      .then(dat => dat.json())
      .then(
        (data) => {
          this.setState({
            t: data.length
          });
          console.log("6 - dec", this.state.t)
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }

  componentDidMount() {
    this.LineChartCrimes();
  }


  render() {

    return (
      <>
        <Chart options={this.state.options} series={this.state.series} type="line" height={215} width={840} />
      </>
    );
  }
}

export default withRouter(LineChart);
