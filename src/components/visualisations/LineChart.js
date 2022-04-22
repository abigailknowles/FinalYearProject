import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Chart from "react-apexcharts";

const options = [
  { value: 'all-crime', label: 'All crime' },
  { value: 'violent-crime', label: 'Violent crime' },
  { value: 'anti-social-behaviour', label: 'Anti social behaviour' },
  { value: 'buglary', label: 'Buglary' },
  { value: 'public-order', label: 'Public order' },
  { value: 'criminal-damage-arson', label: 'Criminal damage and arson' },
  { value: 'drugs', label: 'Drugs' },
  { value: 'vehicle-crime', label: 'Vehicle crime' },
  { value: 'theft-from-person', label: 'Theft from person' },
  { value: 'other-theft', label: 'Other theft' },
  { value: 'other-crime', label: 'Other crime' }
]

class LineChart extends Component {
  constructor() {
    super();
    this.state = {
      selection: "all-crime",
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
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
          },
        },
        xaxis: {
          categories: ['Sept 2021', 'Oct 2021', 'Nov 2021', 'Dec 2021', 'Jan 2022', 'Feb 2022'],
        }
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }

  chartResults(selection) {
    const months = ["2021-09", "2021-10", "2021-11", "2021-12", "2022-01", "2022-02"];
    const orderedData = [];
    let unorderedList = [];
    let counter = 0;
    for (let i = 0; i < months.length; i++) {
      fetch(`https://data.police.uk/api/crimes-street/${selection}?poly=${this.props.poly}}&date=${months[i]}`)
        .then(res => res.json())
        .then(
          (result) => {
            unorderedList.push({ "month": months[i], data: result.length });

            counter++;
            if (counter === 6) {
              let orderedList = unorderedList.sort(function (a, b) { return new Date(a.month) - new Date(b.month); });
              for (let i = 0; i < orderedList.length; i++) {
                orderedData.push(orderedList[i].data)

              }
              this.setState({
                isShown: true,
                unorderedList: unorderedList,
                series: [{
                  data: orderedData
                }],
              });
            }
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

  handleChange(e) {
    this.setState({ selection: e.target.value });
    this.chartResults(e.target.value)
  }

  render() {
    return (
      <>
        <Col align="left">
          <select value={this.state.selection} onChange={this.handleChange}>
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        </Col>
        <Chart options={this.state.options} series={this.state.series} type="line" height={185} width={860} />
      </>
    );
  }
}

export default withRouter(LineChart);
