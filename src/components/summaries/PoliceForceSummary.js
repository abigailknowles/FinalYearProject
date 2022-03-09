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
      // count: this.props.stopAndSearch.length
    }
    console.log("count", this.state.count)

    console.log("props", this.props.stopAndSearch)

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
          <h5 className="summary-text">Total number of stop and searches 400 </h5>
        </Row>
        <Row>
          <FontAwesomeIcon size="1x" className="download-icon" icon={faBars} />
          <h5 className="summary-text">The most common reason for stop and search is drugs</h5>
        </Row>
        <Row>
          <FontAwesomeIcon size="1x" className="download-icon" icon={faBan} />
          <h5 className="summary-text">Stop and search resulted in arrests 500</h5>
        </Row>
      </>
    );
  }
}

export default withRouter(PoliceForceSummary);
