import React, { } from "react";
import { Container, Col, Form, Button, Row, Jumbotron } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Chart from "react-apexcharts";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'

import NavBar from '../components/NavBar';
import LastUpdated from '../components/LastUpdated';
import Loading from '../components/Loading';
import Breadcrumb from 'react-bootstrap/Breadcrumb';


class Home extends React.Component {
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
      ],
      series: [25, 15, 44, 55, 41, 17],
      options: {
        labels: ["Controlled drugs", "Stolen goods", "Offensive weapons", "Articles for use in criminal damage", "Fireworks", "Firearms"],
        plotOptions: {

          pie: {
            dataLabels: {
              offset: -5
            }

          }
        },
        title: {
          text: "Stop and search",
          align: 'center'
        },
        colors: [
          '#ffc1f8', '#fff88b', '#a0a1f5', '#02ccf9', '#ffa366', '#f75e5b'
        ],
        dataLabels: {
          formatter(val, opts) {
            const name = opts.w.globals.labels[opts.seriesIndex]
            return [name, val.toFixed(1) + '%']
          }

        },
        legend: {
          show: false,
        }
      },
    };
  }

  isGroupInArray(groups, code) {
    var isFound = false;
    for (var key in groups) {
      if (groups[key].code === code) {
        isFound = true;
      }
    }

    return isFound;
  }

  getByGroupName(arr, code) {
    var group = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].category.name === code) {
        group.push(arr[i]);
      }
    }
    return { group: group, count: group.length };
  }

  groupBy(arr) {
    var groups = [];

    for (var i = 0; i < arr.length; i++) {
      var code = arr[i].category.name;
      if (this.isGroupInArray(groups, code) === false)
        groups.push({ code: code, group: this.getByGroupName(arr, code) })
    }

    return { groups: groups, count: arr.length };
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
  }

  neighbourhoodCount() {
    return this.state.length;
  }

  setIsNotShown() {
    this.setState({ isShown: false });
  }

  stopAndSearch() {
    fetch(`https://data.police.uk/api/stops-force?force=bedfordshire`)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          isLoaded: true,
          total: data.length,
          isShown: true
        });
        // console.log("stop", data)
      },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

    return "Total: " + this.state.total
  }
  setIsShown(id, policeForce) {
    fetch(`https://data.police.uk/api/${policeForce}/neighbourhoods`)
      .then(res => res.json())
      .then((result) => {
        this.setState({
          isLoaded: true,
          length: result.length,
          isShown: true,
          id: id,
          policeForce: policeForce
        });
      },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
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

  render() {
    const { shapes, categories, isLoaded, colours, isShown, id } = this.state;
    return (
      <>
        <NavBar />
        <Container className="top-breadcrumb">
          <Row>
            <Col>
              <Breadcrumb >
                <Breadcrumb.Item href="/">Police Force </Breadcrumb.Item>
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

                  <Chart options={this.state.options} series={this.state.series} labels={this.state.labels} type="donut" width="400" />
                  <h6>
                    {this.stopAndSearch()}
                  </h6>
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
              </Row>
            </Col>
            <Col sm={8}>
              <Jumbotron className="personal-details-jumbotron">
                <FontAwesomeIcon size="2x" className="download-icon" icon={faDownload} />
                {!isLoaded
                  ? <div><Loading /></div>
                  :
                  <svg viewBox="0 0 100 150">
                    {/* <LastUpdated /> */}
                    <text x='3' y='3' fontSize="0.075em">Total police forces: {categories.length}</text>
                    {categories.map((category, i) => (
                      <NavLink key={i} className="nav-link"
                        onMouseEnter={() => { this.setIsShown(i, category.id) }}
                        onMouseLeave={() => {
                          this.setIsNotShown()
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
                        {isShown && i === id ?
                          <>
                            <text x={shapes[i].xcords} y={shapes[i].ycords - 4} textAnchor='middle' alignmentBaseline="middle" fontSize="0.075em">{category.name}</text>
                            <text x={shapes[i].xcords} y={shapes[i].ycords + 2} textAnchor='middle' alignmentBaseline=" middle" fontSize="0.075em">{this.neighbourhoodCount()} neighbourhoods</text>
                          </>
                          :
                          <text x={shapes[i].xcords} y={shapes[i].ycords} textAnchor='middle' alignmentBaseline="middle" fontSize="0.075em">{category.name}</text>
                        }
                      </NavLink>
                    ))}
                  </svg>
                }
              </Jumbotron>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default Home;