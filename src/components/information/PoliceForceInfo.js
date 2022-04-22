import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import Loading from '../Loading';

class PoliceForceInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      forces: [],
      searchedForce: "city-of-london"
    };
  }

  policeForces() {
    fetch("https://data.police.uk/api/forces")
      .then(res => res.json())
      .then((result) => {
        this.setState({
          isLoaded: true,
          forces: result
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

  forceInfo(force) {
    if (force === undefined) {
      force = this.state.searchedForce
    }
    fetch(`https://data.police.uk/api/forces/${force}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            info: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error: true,
            info: { id: "no-results-found", description: "No results found" }
          });
        }
      )
  }

  componentDidMount() {
    this.policeForces();
    this.forceInfo();
  }

  textFormatter(description) {
    const desc = String(description);
    const formattedDesc = desc.replaceAll('<p>', '');
    return formattedDesc.replaceAll('</p>', '\n');
  }

  changeHandler(force) {
    this.forceInfo(force);
  }

  render() {
    const { isLoaded, forces } = this.state;
    const sel = forces.map(force => ({ label: force.name, value: force.id }))

    return (
      <>
        {!isLoaded
          ? <div><Loading /></div>
          :
          <>
            <Select
              options={sel}
              placeholder="Search by a police force"
              onChange={sel => this.changeHandler(sel.value)}
            />
            <h4 className="police-name">{this.state.info.name}</h4>
            <a className="police-url" href={this.state.info.url}>{this.state.info.url}</a>
            <hr className="summary-line"></hr>
            <p className="police-description">{this.textFormatter(this.state.info.description)}</p>

          </>
        }
      </>
    );
  }
}

export default withRouter(PoliceForceInfo);
