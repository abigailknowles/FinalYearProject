import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faGavel, faUser, faBan, faTaxi } from '@fortawesome/free-solid-svg-icons'

class CrimeSummary extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  // isGroupInOutcomesArray(groups, category) {
  //   var isFound = false;
  //   for (var key in groups) {
  //     if (groups[key].category === category) {
  //       isFound = true;
  //     }
  //   }
  //   return isFound;
  // }

  // getByOutcomeName(arr, category) {
  //   var group = [];
  //   for (var i = 0; i < arr.length; i++) {
  //     if (arr[i].category === category) {
  //       group.push(arr[i]);
  //     }
  //   }
  //   return { group: group, count: group.length };
  // }

  // groupByOutcome(arr) {
  //   var groups = [];

  //   for (var i = 0; i < arr.length; i++) {
  //     var category = arr[i].category;
  //     if (this.isGroupInOutcomesArray(groups, category) === false)
  //       groups.push({ category: category, group: this.getByOutcomeName(arr, category) })
  //   }
  //   return { groups: groups, count: arr.length };
  // }

  exists(key, array) {
    var isFound = false;
    for (let i = 0; i < array.length; i++) {
      if (array[i].key === key) {
        isFound = true;
      }
    }
    return isFound;
  }

  getByKey(key, arr) {
    var array = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].category === key) {
        array.push(arr[i]);
      }
    }
    return { outcomes: array, count: array.length };
  }

  groupCrimes(arr) {
    var groups = [];

    for (var i = 0; i < arr.length; i++) {
      var key = arr[i].category;
      if (this.exists(key, groups) === false)
        groups.push({ key: key, outcomes: this.getByKey(key, arr) })
    }

    return { groups: groups, count: arr.length };
  }

  outcomesExists(key, array) {
    var isFound = false;
    for (let i = 0; i < array.length; i++) {
      if (array[i].key === key) {
        isFound = true;
      }
    }
    return isFound;
  }

  getByOutcomesKey(key, arr) {
    var array = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].category.code === key) {
        array.push(arr[i]);
      }
    }
    return { outcomes: array, count: array.length };
  }

  groupOutcomes(arr) {
    var groups = [];

    for (var i = 0; i < arr.length; i++) {
      var key = arr[i].category.code;
      if (this.outcomesExists(key, groups) === false)
        groups.push({ key: key, outcomes: this.getByOutcomesKey(key, arr) })
    }

    return { groups: groups, count: arr.length };
  }
  streetCrimes() {
    fetch("https://data.police.uk/api/crimes-street/all-crime?poly=52.268,0.543:52.794,0.238:52.130,0.478")
      .then(res => res.json())
      .then(
        (result) => {
          var crimes = this.groupCrimes(result);
          var commonCrime = this.getMostCommonCrime(crimes.groups)
          this.setState({
            isLoaded: true,
            crimes: crimes,
            mostCommonCrime: this.textFormatter(commonCrime.key)
          });
          console.log("after", this.state.mostCommonCrime)

        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  crimeOutcomes() {
    fetch(`https://data.police.uk/api/outcomes-at-location?date=2021-01&poly=52.268,0.543:52.794,0.238:52.130,0.478`)
      .then(res => res.json())
      .then(
        (result) => {
          var outcomes = this.groupOutcomes(result);
          var mostCommonOutcome = this.getMostCommonOutcome(outcomes.groups)
          this.setState({
            outcomes: outcomes,
            count: outcomes.count,
            mostCommonOutcome: this.textFormatter(mostCommonOutcome.key)
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

  componentDidMount() {
    this.streetCrimes();
    this.crimeOutcomes();
  }


  getMostCommonCrime(groups) {
    var sortedArray = groups.sort((elmement1, element2) => {
      return elmement1.outcomes.count - element2.outcomes.count;
    });

    return sortedArray[sortedArray.length - 1];
  }

  getMostCommonOutcome(groups) {
    var sortedArray = groups.sort((elmement1, element2) => {
      return elmement1.outcomes.count - element2.outcomes.count;
    });

    return sortedArray[sortedArray.length - 1];
  }

  textFormatter(category) {
    const cat = category;
    const capitalCat = cat.charAt(0).toUpperCase() + cat.slice(1);
    return capitalCat.replaceAll('-', ' ');
  }

  render() {

    return (
      <>
        <h4 className="summary-header">Summary</h4>
        <hr className="summary-line"></hr>
        <Row>
          <FontAwesomeIcon size="1x" className="download-icon" icon={faTaxi} />
          <h5 className="summary-text">Crimes commited {this.props.crimeCount}</h5>
        </Row>
        <Row>
          <FontAwesomeIcon size="1x" className="download-icon" icon={faUser} />
          <h5 className="summary-text">Criminals convicted 42,932</h5>
        </Row>
        <Row>
          <FontAwesomeIcon size="1x" className="download-icon" icon={faCalendar} />
          <h5 className="summary-text">Crime outcomes available {this.state.count}</h5>
        </Row>
        <Row>
          <FontAwesomeIcon size="1x" className="download-icon" icon={faBan} />
          <h5 className="summary-text">The most common crime is {this.state.mostCommonCrime}</h5>
        </Row>
        <Row>
          <FontAwesomeIcon size="1x" className="download-icon" icon={faGavel} />
          <h5 className="summary-text">The most common crime outcome is {this.state.mostCommonOutcome}</h5>
        </Row>      </>
    );
  }
}

export default withRouter(CrimeSummary);
