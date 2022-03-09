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

  render() {

    return (
      <>
        <h4 className="summary-header">2021 Summary</h4>
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
          <h5 className="summary-text">The most crimes happened in April</h5>
        </Row>
        <Row>
          <FontAwesomeIcon size="1x" className="download-icon" icon={faBan} />
          <h5 className="summary-text">The most common crime is Theft</h5>
        </Row>
        <Row>
          <FontAwesomeIcon size="1x" className="download-icon" icon={faGavel} />
          <h5 className="summary-text">The most common crime outcome is Unresolved</h5>
        </Row>      </>
    );
  }
}

export default withRouter(CrimeSummary);
