import React, { } from "react";
import { Container, Jumbotron, Col, Row, Form, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { RadialBarChart, RadialBar } from 'recharts';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import NavBar from '../components/NavBar';
import LastUpdated from '../components/LastUpdated';
import Loading from '../components/Loading';

const test = [
  {
    name: 'A',
    x: 31.47,
    fill: '#8784d8',
  },
  {
    name: 'B',
    x: 26.69,
    fill: '#84a6ed',
  },
  {
    name: 'C',
    x: 15.69,
    fill: '#8ed1e1',
  },
  {
    name: 'D',
    x: 8.22,
    fill: '#82da9d',
  },
  {
    name: 'E',
    x: 8.63,
    fill: '#a2de6c',
  },
  {
    name: 'F',
    x: 2.63,
    fill: '#d0dd57',
  },
  {
    name: 'G',
    x: 6.67,
    fill: '#ffa658',
  },
];

class Neighbourhoods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      policeForce: props.location.aboutProps.selectedPoliceForce,
      colours: ['#ccf3ff', '#74bec8', '#d8bfff', '#f75e5b', '#fff88b', '#e80b8c', '#938fff', '#f7c6af', '#ffa661', '#7ee9cf', '#ffeefe',
        '#d2f9d0', '#e0f49c', '#02ccf9', '#ffc1f8', '#ffa0ab', '#f0f0f5', '#ffdd99', '#ffe0e0', '#b3d9ff', '#ff6666', '#99ff99', '#b8ffdb',
        '#e6e6ff', '#ff80aa', '#adebeb', '#ccccff', '#00cccc', '#ff9999', '#fff88d', '#99ffff', '#ffa366', '#ebfafa', '#ffffcc', '#f9e6ff', '#faebf5',
        '#ffe6cc', '#e6e6e6', '#6666cc', '#ffdd99', '#b3ffb3', '#80ffdf', '#b3d9ff', '#a0a1f5', '#ffccff', '#b3ccff', '#9fdfbf', '#a3a3c2', '#6699cc'],
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
      ],
      series: [76, 67, 61, 90],
      options: {
        chart: {
          height: 390,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            offsetY: 0,
            startAngle: 0,
            endAngle: 270,
            hollow: {
              margin: 5,
              size: '30%',
              background: 'transparent',
              image: undefined,
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                show: false,
              }
            }
          }
        },
        colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
        labels: ['Vimeo', 'Messenger', 'Facebook', 'LinkedIn'],
        legend: {
          show: true,
          floating: true,
          fontSize: '16px',
          position: 'left',
          offsetX: 160,
          offsetY: 15,
          labels: {
            useSeriesColors: true,
          },
          markers: {
            size: 0
          },
          formatter: function (seriesName, opts) {
            return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
          },
          itemMargin: {
            vertical: 3
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              show: false
            }
          }
        }]
      },
    };
  }

  textFormatter(force) {
    const police = force;
    const formatForce = police.charAt(0).toUpperCase() + police.slice(1);
    return formatForce;
  }
  calculatePercentage(value, totalValue) {
    var percentage = (value / totalValue * 100).toFixed(2);
    return percentage;
  }

  calculateBubbleSize(value, totalValue) {
    var percentage = (value / totalValue * 100).toFixed(2);
    var size = 0;

    if (percentage <= 10) {
      size = "4.8"
    }
    else if (percentage <= 20) {
      size = "5.8"
    }
    else if (percentage <= 30) {
      size = "6.8"
    }
    else if (percentage <= 40) {
      size = "7.8"
    }
    else if (percentage <= 50) {
      size = "8.8"
    }
    else if (percentage <= 60) {
      size = "9.8"
    }
    else if (percentage <= 70) {
      size = "10.8"
    }
    else if (percentage <= 80) {
      size = "11.8"
    }
    else if (percentage <= 90) {
      size = "12.8"
    }
    else if (percentage <= 100) {
      size = "13.8"
    }
    return size
  }

  componentDidMount() {
    fetch(`https://data.police.uk/api/${this.state.policeForce}/neighbourhoods`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            categories: result,
          });
          console.log(result)
          console.log(this.state.policeForce);
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
    const { shapes, categories, isLoaded, colours } = this.state;
    return (
      <>
        <NavBar />
        <Container className="top-breadcrumb">
          <Row>
            <Col >
              <Breadcrumb >
                <Breadcrumb.Item href="/">Police Force - {this.textFormatter(this.state.policeForce)}</Breadcrumb.Item>
                <Breadcrumb.Item active> Neighbourhoods </Breadcrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
        </Container>
        <Row className="filter-padding">
        </Row>
        <Container fluid className="personal-details-jumbotron">
          <Row>
            <Col sm={4}>
              <Row>
                <Jumbotron className="personal-details-jumbotron" align="center">
                  <RadialBarChart width={500} height={500} data={test}>
                    <RadialBar minAngle={15} dataKey="x" />
                  </RadialBarChart>
                  {/* <ApexCharts options={this.state.options} series={this.state.series} type="radialBar" height={390} /> */}

                </Jumbotron>
              </Row>
              <Row>
                <Jumbotron className="personal-details-jumbotron">
                  <Container >
                    <h3 className="filter-text">Filter by</h3>
                    <Row className="filter-padding">
                      <Col >
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                          <Row>
                            <Col>
                              <Form.Check type="checkbox" label="Anti Social" />
                            </Col>
                            <Col>
                              <Form.Check type="checkbox" label="Theft" />
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Form.Check type="checkbox" label="Violent" />
                            </Col>
                            <Col>
                              <Form.Check type="checkbox" label="Other" />
                            </Col>
                          </Row>
                        </Form.Group>
                      </Col>
                      <Row>
                        <Col>
                          <Form.Label htmlFor="inputPassword5">From</Form.Label>
                          <DatePicker
                            selected={this.state.endDate}
                            onChange={this.handleDateChange}
                            name="endDate"
                            dateFormat="dd/MM/yyyy"
                            minDate={new Date(2015, 1, 1)}
                            maxDate={new Date()}
                          />
                        </Col>
                        <Col>
                          <Form.Label htmlFor="inputPassword5">To</Form.Label>
                          <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleDateChange}
                            name="startDate"
                            dateFormat="dd/MM/yyyy"
                            minDate={new Date(2015, 1, 1)}
                            maxDate={new Date()}
                          />
                        </Col>
                      </Row>
                    </Row>
                    <Row className="filter-padding">
                      <Col>
                        <Button className="filter-button" type="submit" variant="light">Update</Button>
                      </Col>
                    </Row>
                  </Container>
                </Jumbotron>
              </Row >
            </Col >
            <Col sm={8}>
              <Jumbotron className="personal-details-jumbotron">
                <FontAwesomeIcon size="2x" className="download-icon" icon={faDownload} />
                {!isLoaded
                  ? <div><Loading /></div>
                  :
                  <svg viewBox="0 0 100 70">
                    <LastUpdated />
                    <text x='3' y='3' fontSize="0.075em">Total neighbourhoods: {categories.length}</text>
                    {categories.map((category, i) => (
                      <NavLink key={i} className="nav-link"
                        onMouseEnter={() => {
                          this.setState({ neighbourhood: category.id })
                        }} to={{
                          pathname: 'street-crimes',
                          aboutProps: {
                            selectedPoliceForce: this.state.policeForce,
                            selectedNeighbourhood: this.state.neighbourhood
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
                        <text x={shapes[i].xcords} y={shapes[i].ycords} textAnchor='middle' alignmentBaseline="middle" fontSize="0.075em">{category.name}</text>
                      </NavLink>
                    ))}
                  </svg>
                }
              </Jumbotron>
            </Col>
          </Row >
        </Container >
      </>
    );
  }
}

export default Neighbourhoods;