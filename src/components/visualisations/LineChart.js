import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Chart from "react-apexcharts";

class LineChart extends Component {
  constructor() {
    super();
    this.state = {
      series: [{
        name: "Crime count",
        data: []
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
          text: 'All crimes in the past 6 months',
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

  chartResults() {
    const months = ["2021-07", "2021-08", "2021-09", "2021-10", "2021-11", "2021-12"];
    const data = [];
    for (let i = 0; i < months.length; i++) {
      fetch(`https://data.police.uk/api/crimes-street/all-crime?poly=52.268,0.543:52.794,0.238:52.130,0.478&date=${months[i]}`)
        .then(res => res.json())
        .then(
          (result) => {
            data.push(result.length);
            this.setState({
              isShown: true,
              series: [{
                data: data
              }],
            });
          },
          (error) => {
            this.setState({
              error
            });
          }
        )
    }
  }

  componentDidMount() {
    this.chartResults();

  }

  render() {

    return (
      <>
        <Chart options={this.state.options} series={this.state.series} type="line" height={215} width={860} />
      </>
    );
  }
}

export default withRouter(LineChart);
