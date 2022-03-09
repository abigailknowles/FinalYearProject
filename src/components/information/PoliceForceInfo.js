import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Loading from '../Loading';

class PoliceForceInfo extends Component {
  constructor() {
    super();
    this.state = {
      info: [],
    };
  }

  componentDidMount() {
    fetch(`https://data.police.uk/api/forces/bedfordshire`)
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
            isLoaded: false,
            error
          });
        }
      )
  }

  textFormatter(description) {
    const desc = String(description);
    const formattedDesc = desc.replaceAll('<p>', '');
    return formattedDesc.replaceAll('</p>', '\n');
  }

  render() {
    const { isLoaded } = this.state;

    return (
      <>
        {!isLoaded
          ? <div><Loading /></div>
          :
          <>
            <h4 className="police-name">{this.state.info.name}</h4>
            <h5 className="police-url">{this.state.info.url}</h5>
            <hr className="summary-line"></hr>
            <p className="police-description">{this.textFormatter(this.state.info.description)}</p>
          </>
        }
      </>
    );
  }
}

export default withRouter(PoliceForceInfo);
