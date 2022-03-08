import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Chart from "react-apexcharts";

class LineChart extends Component {
  constructor() {
    super();
    this.state = {

      series: [{
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 50, 20, 48]
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
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        }
      },


    };
  }



  render() {

    return (
      <>
        <Chart options={this.state.options} series={this.state.series} type="line" height={215} width={850} />
      </>
    );
  }
}

export default withRouter(LineChart);
