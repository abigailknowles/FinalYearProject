import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Loading from '../Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faGavel, faUser, faBan, faTaxi } from '@fortawesome/free-solid-svg-icons'

class CrimeSummary extends Component {
  constructor() {
    super();
    this.state = {
    }
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

  crimeOutcomes() {
    fetch(`https://data.police.uk/api/outcomes-at-location?poly=${this.props.poly}`)
      .then(res => res.json())
      .then(
        (result) => {
          var outcomes = this.groupOutcomes(result);
          var mostCommonOutcome = this.getMostCommonOutcome(outcomes.groups)
          this.setState({
            isLoaded: true,
            outcomes: outcomes,
            count: outcomes.count,
            mostCommonOutcome: this.textFormatter(mostCommonOutcome.key),
          });
        },
        (error) => {
          this.setState({
            isLoaded: false,
            error
          });
        }
      )
  }

  componentDidMount() {
    this.crimeOutcomes();
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
    const { isLoaded } = this.state;

    return (
      <>
        <h4 className="summary-header">Summary</h4>
        <hr className="summary-line"></hr>
        {!isLoaded
          ? <div><Loading /></div>
          :
          <>
            <Row>
              <FontAwesomeIcon size="1x" className="download-icon" icon={faTaxi} />
              <h5 className="summary-text">Crimes commited {this.props.crimeCount}</h5>
            </Row>
            <Row>
              <FontAwesomeIcon size="1x" className="download-icon" icon={faCalendar} />
              <h5 className="summary-text">Crime outcomes available {this.state.count}</h5>
            </Row>
            <Row>
              <FontAwesomeIcon size="1x" className="download-icon" icon={faBan} />
              <h5 className="summary-text">The most common crime is {this.props.commonCrime}</h5>
            </Row>
            <Row>
              <FontAwesomeIcon size="1x" className="download-icon" icon={faGavel} />
              <h5 className="summary-text">The most common crime outcome is {this.state.mostCommonOutcome}</h5>
            </Row>
            <Row>
              <FontAwesomeIcon size="1x" className="download-icon" icon={faCalendar} />
              <h5 className="summary-text">The highest month for crime is {this.props.highestMonth}</h5>
            </Row>
          </>
        }
      </>
    );
  }
}
export default withRouter(CrimeSummary);
