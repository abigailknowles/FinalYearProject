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

  componentDidMount() {
    fetch("https://data.police.uk/api/crimes-street/all-crime?poly=52.268,0.543:52.794,0.238:52.130,0.478")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            crimes: result.length
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

  textFormatter(force) {
    const police = force;
    const formatForce = police.charAt(0).toUpperCase() + police.slice(1);
    return formatForce;
  }

  crimeLevel(count) {
    var level;
    if (count <= 300) {
      level = "Low";
    } else if (count <= 600) {
      level = "Medium";
    } else {
      level = "High";
    }
    return level;
  }

  render() {

    return (
      <>
        <h4 className="summary-header">Summary</h4>
        <hr className="summary-line"></hr>

        <Row>
          <FontAwesomeIcon size="1x" className="download-icon" icon={faUserFriends} />
          <h5 className="summary-text">{this.textFormatter(this.props.force)} police cover this neighbourhood</h5>
        </Row>
        <Row>
          <FontAwesomeIcon size="1x" className="download-icon" icon={faHouseUser} />
          <h5 className="summary-text">Number of neighbourhoods covered {this.props.neighbourhoodCount}</h5>
        </Row>
        <Row>
          <FontAwesomeIcon size="1x" className="download-icon" icon={faTaxi} />
          <h5 className="summary-text">Total crime count of neighbourhood is {this.state.crimes}</h5>
        </Row>
        <Row>
          <FontAwesomeIcon size="1x" className="download-icon" icon={faBalanceScale} />
          <h5 className="summary-text">The crime rate in this neighbourhood is {this.crimeLevel(this.state.crimes)}</h5>
        </Row>
      </>
    );
  }
}

export default withRouter(CrimeSummary);
