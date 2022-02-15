import React, { } from "react";
import { Container, Row, Button, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import NavBar from '../components/NavBar';
import LastUpdated from '../components/LastUpdated';
import Loading from '../components/Loading';
import CrimeOutcomesFilter from "../components/CrimeOutcomesFilter";
import Select from 'react-select';

const outcomes = [
  { value: 'resolved', label: 'Resolved' },
  { value: 'ongoing', label: 'Ongoing' }
];
const months = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];
const years = [
  { value: '2014', label: '2014' },
  { value: '2015', label: '2015' },
  { value: '2016', label: '2016' },
  { value: '2017', label: '2017' },
  { value: '2018', label: '2018' },
  { value: '2019', label: '2019' },
  { value: '2020', label: '2020' },
  { value: '2021', label: '2021' }
];
class StreetCrimes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      date: '',
      selectedOption: null,
      policeForce: props.location.aboutProps.selectedPoliceForce,
      neighbourhood: props.location.aboutProps.selectedNeighbourhood,
      crime: props.location.aboutProps.selectedCrime,
      shapes: [
        { colour: "#74bec8", xcords: 50, ycords: 28 },
        { colour: "#ccf3ff", xcords: 29, ycords: 22 },
        { colour: "#d8bfff", xcords: 31, ycords: 38 },
        { colour: "#f75e5b", xcords: 69, ycords: 21.5 },
        { colour: "#fff88b", xcords: 69, ycords: 36 },
        { colour: "#e80b8c", xcords: 43, ycords: 47 },
        { colour: "#938fff", xcords: 83, ycords: 30 },
        { colour: "#f7c6af", xcords: 58, ycords: 46 },
      ]
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
      size = "7"
    }
    else if (percentage <= 20) {
      size = "7"
    }
    else if (percentage <= 30) {
      size = "8"
    }
    else if (percentage <= 40) {
      size = "9"
    }
    else if (percentage <= 50) {
      size = "10"
    }
    else if (percentage <= 60) {
      size = "11"
    }
    else if (percentage <= 70) {
      size = "12"
    }
    else if (percentage <= 80) {
      size = "13"
    }
    else if (percentage <= 90) {
      size = "14"
    }
    else if (percentage <= 100) {
      size = "15"
    }
    return size
  }
  componentDidMount() {
    fetch("https://data.police.uk/api/outcomes-at-location?date=2021-01&poly=52.268,0.543:52.794,0.238:52.130,0.478")
      .then(res => res.json())
      .then(
        (result) => {
          var outcomes = this.groupBy(result);
          this.setState({
            isLoaded: true,
            categories: outcomes,
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
  setIsShown(state, id) {
    this.setState({ isShown: state, id: id })
  }
  toggle(state) {
    this.setState({ isClicked: state })
  }

  crimeOutcomeDefinition(category) {
    console.log(category)
    var definition = "";
    if (category == "public-order") {
      definition = "Public order is a condition characterized by the absence of widespread criminal and political violence, such as kidnapping, murder, riots, arson, and intimidation against targeted groups or individuals.";
    }
    else if (category == "burglary") {
      definition = "Burglary, also called breaking and entering and sometimes housebreaking, is the act of entering a building or other areas without permission, with the intention of committing a criminal offence.";
    }
    else if (category == "drugs") {
      definition = "Drugs are related to crime in multiple ways. Most directly, it is a crime to use, possess, manufacture, or distribute drugs classified as having a potential for abuse. Cocaine, heroin, marijuana, and amphetamines are examples of drugs classified to have abuse potential.";
    }
    else if (category == "violent-crime") {
      definition = "A violent crime, is when a victim is harmed by or threatened with violence.Violent crimes include rape and sexual assault, robbery, assault and murder.";
    }
    else if (category == "anti-social-behaviour") {
      definition = "Anti-social behaviour includes a range of nuisance and criminal behaviours which are causing distress to others. Whether someone's actions can be classed as anti-social behaviour relies heavily on the impact it has on other people.";
    }
    else if (category == "shoplifting") {
      definition = "Shoplifting is the theft of goods from an open retail establishment, typically by concealing a store item on one's person, in pockets, under clothes, or in a bag, and leaving the store without paying.";
    }
    else if (category == "possession-of-weapons") {
      definition = "Criminal possession of a weapon is the unlawful possession of a weapon by an individual. ... Such crimes are public order crimes and are considered mala prohibita, in that the possession of a weapon in and of itself is not evil.";
    }
    else if (category == "other-theft") {
      definition = "Criminal possession of a weapon is the unlawful possession of a weapon by an individual. ... Such crimes are public order crimes and are considered mala prohibita, in that the possession of a weapon in and of itself is not evil.";
    }
    else if (category == "other-crime") {
      definition = "Criminal possession of a weapon is the unlawful possession of a weapon by an individual. ... Such crimes are public order crimes and are considered mala prohibita, in that the possession of a weapon in and of itself is not evil.";
    }
    else if (category == "vehicle-crime") {
      definition = "The term 'vehicle crime' refers to the theft and trafficking of vehicles and the illicit trade in spare parts. ... Stolen vehicles are frequently trafficked in order to finance and carry out other criminal activities, ranging from drug trafficking, arms dealing, people smuggling and international terrorism.";
    }
    else if (category == "criminal-damage-arson") {
      definition = "Criminal damage is the intentional and malicious damage to the home other property or vehicles and includes graffiti. Arson is the act of deliberately setting fire to property, including buildings and vehicles.";
    }
    return definition
  }
  render() {
    const { shapes, categories, isLoaded, isShown, id, isClicked } = this.state;
    return (
      <>
        <NavBar />
        <Container>
          <Container className="top-breadcrumb">
            <Breadcrumb >
              <Breadcrumb.Item href="/">Police Force - {this.textFormatter(this.state.policeForce)}</Breadcrumb.Item>
              <Breadcrumb.Item href="/neighbourhoods"> Neighbourhoods - {this.state.neighbourhood}</Breadcrumb.Item>
              <Breadcrumb.Item href="/street-crimes"> Street Crimes - {this.textFormatter(this.state.crime)}</Breadcrumb.Item>
              <Breadcrumb.Item active> Crime Outcomes </Breadcrumb.Item>
            </Breadcrumb>
          </Container>
          <Row className="filter-padding">
          </Row>
          {!isClicked ?
            <>
              <Button className="filter-button" variant="light" onClick={() => { this.toggle(true) }}>
                Enable filters
              </Button>
            </>
            :
            <>
              <Button className="filter-button" variant="light" onClick={() => { this.toggle(false) }}>
                Disable filters
              </Button>
              <Row className="filter-padding"></Row>
            </>
          }
          {isClicked ?
            <>
              <div className="filter-box">
                <Container >
                  <Row className="filter-row">
                    <Col className="no-padding">
                      <h3 className="filter-text">Filter by</h3>
                    </Col>
                  </Row>
                  <Row className="filter-padding">
                    <Col >
                      <Select
                        placeholder="Crime outcomes "
                        value={this.selectedOption}
                        onChange={this.handleChange}
                        options={outcomes}
                      />
                    </Col>
                    <Col>
                      <Select
                        placeholder="Month"
                        value={this.selectedOption}
                        onChange={this.handleChange}
                        options={months}
                      />
                    </Col>
                    <Col>
                      <Select
                        placeholder="Year"
                        value={this.selectedOption}
                        onChange={this.handleChange}
                        options={years}
                      />
                    </Col>
                  </Row>
                  <Row className="filter-padding">
                    <Col>
                      <Button className="filter-button" type="submit" variant="primary">Update</Button>
                    </Col>
                  </Row>
                </Container>
              </div>            </>
            :
            <></>
          }
          <a href="/images/myw3schoolsimage.jpg" download>
            <h1>test</h1></a>
          {!isLoaded
            ? <div><Loading /></div>
            :
            <svg viewBox="0 0 100 70">
              <LastUpdated />
              <text x='1' y='3' fontSize="0.075em">Total crime outcomes: {categories.count}</text>

              {
                categories.groups.map((category, i) => (
                  <NavLink key={i} className="nav-link"
                    onMouseEnter={() => { this.setIsShown(true, i, category.category) }}
                    onMouseLeave={() => { this.setIsShown(false, i, category.category) }}
                    to={{
                      pathname: 'crime-outcomes',
                      aboutProps: {
                        selectedPoliceForce: this.state.policeForce,
                        selectedNeighbourhood: this.state.neighbourhood,
                        selectedCrime: this.state.crime
                      }
                    }}>
                    <circle
                      className="circle-css"
                      style={{
                        fill: shapes[i].colour
                      }}
                      cx={shapes[i].xcords}
                      cy={shapes[i].ycords}
                      r={this.calculateBubbleSize(category.group.count, categories.count)}
                    />
                    {isShown && i === id ?
                      <>
                        <text x={40} y={2} textAnchor='middle' alignmentBaseline="middle" fontSize="0.075em">{this.crimeOutcomeDefinition(category.code)}</text>
                        <text x={shapes[i].xcords} y={shapes[i].ycords - 2} textAnchor='middle' alignmentBaseline="middle" fontSize="0.075em">{category.code}</text>
                        <text x={shapes[i].xcords} y={shapes[i].ycords + 2} textAnchor='middle' alignmentBaseline="middle" fontSize="0.075em">{category.group.count} </text>
                        <text x={shapes[i].xcords} y={shapes[i].ycords + 4} textAnchor='middle' alignmentBaseline="middle" fontSize="0.075em">{this.calculatePercentage(category.group.count, categories.count)} %</text>
                      </>
                      :
                      <text x={shapes[i].xcords} y={shapes[i].ycords} textAnchor='middle' alignmentBaseline="middle" fontSize="0.075em">{category.code}</text>
                    }
                  </NavLink>
                ))}
            </svg>
          }
        </Container>
      </>
    );
  }
}

export default StreetCrimes;