import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faBan, faGlobe, faTaxi, faBars } from '@fortawesome/free-solid-svg-icons'

class PoliceForceSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      largestPoliceForce: "Metropolitan Police",
    }
  }

  reasonExists(key, array) {
    var isFound = false;
    for (let i = 0; i < array.length; i++) {
      if (array[i].key === key) {
        isFound = true;
      }
    }
    return isFound;
  }

  getReasonsByKey(key, arr) {
    var array = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].object_of_search === key) {
        array.push(arr[i]);
      }
    }
    return { outcomes: array, count: array.length };
  }

  groupReasons(arr) {
    var groups = [];

    for (var i = 0; i < arr.length; i++) {
      var key = arr[i].object_of_search;
      if (this.reasonExists(key, groups) === false)
        groups.push({ key: key, outcomes: this.getReasonsByKey(key, arr) })
    }

    return { groups: groups, count: arr.length };
  }
  outcomeExists(key, array) {
    var isFound = false;
    for (let i = 0; i < array.length; i++) {
      if (array[i].key === key) {
        isFound = true;
      }
    }
    return isFound;
  }

  getByOutcomeKey(key, arr) {
    var array = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].outcome === key) {
        array.push(arr[i]);
      }
    }
    return { outcomes: array, count: array.length };
  }

  groupOutcomes(arr) {
    var groups = [];

    for (var i = 0; i < arr.length; i++) {
      var key = arr[i].outcome;
      if (this.reasonExists(key, groups) === false)
        groups.push({ key: key, outcomes: this.getByOutcomeKey(key, arr) })
    }

    return { groups: groups, count: arr.length };
  }

  stopAndSearch() {
    fetch(`https://data.police.uk/api/stops-force?force=bedfordshire`)
      .then(res => res.json())
      .then((data) => {
        var result = this.groupReasons(data);
        var count = this.groupOutcomes(data);
        var reason = this.getMostCommonReason(result.groups)
        this.setState({
          isLoaded: true,
          stopSearchResult: data,
          mostCommonReason: reason.key,
          arrestCount: count.groups[0].outcomes.count
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
    this.stopAndSearch();
  }

  getMostCommonReason(groups) {
    var sortedArray = groups.sort((elmement1, element2) => {

      return elmement1.outcomes.count - element2.outcomes.count;
    });

    return sortedArray[sortedArray.length - 1];

  }
  getArrestCount() {

  }

  render() {

    return (
      <>
        <h4 className="summary-header">Summary</h4>
        <hr className="summary-line"></hr>
        <Row>
          <FontAwesomeIcon size="1x" className="download-icon" icon={faUsers} />
          <h5 className="summary-text">Total number of police forces {this.props.policeCount}
          </h5>
        </Row>
        <Row>
          <FontAwesomeIcon size="1x" className="download-icon" icon={faGlobe} />
          <h5 className="summary-text">The largest police force in the UK is {this.state.largestPoliceForce}</h5>
        </Row>
        <Row>
          <FontAwesomeIcon size="1x" className="download-icon" icon={faTaxi} />
          <h5 className="summary-text">Total number of stop and searches {this.props.count} </h5>
        </Row>
        <Row>
          <FontAwesomeIcon size="1x" className="download-icon" icon={faBars} />
          <h5 className="summary-text">The most common reason for stop and search is {this.state.mostCommonReason} </h5>
        </Row>
        <Row>
          <FontAwesomeIcon size="1x" className="download-icon" icon={faBan} />
          <h5 className="summary-text">Stop and search resulted in arrests {this.state.arrestCount}</h5>
        </Row>
      </>
    );
  }
}

export default withRouter(PoliceForceSummary);
