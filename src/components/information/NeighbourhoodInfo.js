import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Loading from '../Loading';

class NeighbourhoodInfo extends Component {
  constructor() {
    super();
    this.state = {
      info: [],
    };
  }

  neighbourhoodCode() {
    fetch(`https://data.police.uk/api/bedfordshire/neighbourhoods`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            id: result,
          });
          console.log(result.id)
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }

  neighbourhoodInformation() {
    fetch(`https://data.police.uk/api/leicestershire/NC04`)
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

  componentDidMount() {
    this.neighbourhoodCode();
    this.neighbourhoodInformation();
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
            <h4 className="police-name">Leicestershire</h4>
            <h5 className="police-url">{this.state.info.links[0].url}</h5>
            <hr className="summary-line"></hr>
            <p className="police-description">{this.textFormatter(this.state.info.description)}</p>
          </>
        }
      </>
    );
  }
}

export default withRouter(NeighbourhoodInfo);
