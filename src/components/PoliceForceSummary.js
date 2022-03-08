import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faGavel, faUser, faBan, faTaxi } from '@fortawesome/free-solid-svg-icons'

class PoliceForceSummary extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  render() {

    return (
      <>
        <h4 className="summary-header">2021 Summary</h4>
        <hr className="summary-line"></hr>
        <Row>
          <FontAwesomeIcon size="1x" className="download-icon" icon={faTaxi} />
          <h5 className="summary-text">Total number of police forces 50</h5>
        </Row>
        <Row>
          <FontAwesomeIcon size="1x" className="download-icon" icon={faUser} />
          <h5 className="summary-text">Police force that covers the most neighbourhoods</h5>
        </Row>
        <Row>
          <FontAwesomeIcon size="1x" className="download-icon" icon={faUser} />
          <h5 className="summary-text">Total number of stop and searches 42,932</h5>
        </Row>
        <Row>
          <FontAwesomeIcon size="1x" className="download-icon" icon={faCalendar} />
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
