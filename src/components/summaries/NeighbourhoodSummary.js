import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseUser, faBalanceScale, faUserFriends, faBan, faTaxi } from '@fortawesome/free-solid-svg-icons'

class CrimeSummary extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  render() {

    return (
      <>
        <h4 className="summary-header">Summary</h4>
        <hr className="summary-line"></hr>

        <Row>
          <FontAwesomeIcon size="1x" className="download-icon" icon={faUserFriends} />
          <h5 className="summary-text">Bedfordshire police force cover this neighbourhood</h5>
        </Row>
        <Row>
          <FontAwesomeIcon size="1x" className="download-icon" icon={faHouseUser} />
          <h5 className="summary-text">Number of neighbourhoods covered 10</h5>
        </Row>
        <Row>
          <FontAwesomeIcon size="1x" className="download-icon" icon={faTaxi} />
          <h5 className="summary-text">Total crime count of neighbourhood is 76</h5>
        </Row>
        <Row>
          <FontAwesomeIcon size="1x" className="download-icon" icon={faBalanceScale} />
          <h5 className="summary-text">The crime rate in this neighbourhood is low</h5>
        </Row>
      </>
    );
  }
}

export default withRouter(CrimeSummary);
