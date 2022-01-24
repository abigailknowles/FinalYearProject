import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class LastUpdated extends Component {
  constructor() {
    super();
    this.state = {
    };

  }
  componentDidMount() {
    fetch(
      "https://data.police.uk/api/crime-last-updated")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          date: json.date,
          DataisLoaded: true
        });
        console.log("Last updated:")
        console.log(json.date)
      })
  }

  render() {
    const { date } = this.state;

    return (
      <>
        <text x='75' y='6' fontSize="0.075em">Last updated: {date}</text>
      </>
    );
  }
}

export default withRouter(LastUpdated);
