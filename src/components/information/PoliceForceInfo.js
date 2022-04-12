import React, { Component } from 'react';
import { Jumbotron, InputGroup, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import Loading from '../Loading';

class PoliceForceInfo extends Component {
  constructor() {
    super();
    this.state = {
      info: [],
      force: "city-of-london",
    };
  }

  forceInfo() {
    console.log("api", this.props.searchedForce)
    fetch(`https://data.police.uk/api/forces/${this.props.searchedForce}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            info: result,
          });
          console.log(result)
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
    this.forceInfo();
  }

  textFormatter(description) {
    const desc = String(description);
    const formattedDesc = desc.replaceAll('<p>', '');
    return formattedDesc.replaceAll('</p>', '\n');
  }

  // submitHandler = async event => {
  //   event.preventDefault();
  //   event.target.className += " was-validated";

  //   if (this.state.forceSearch === "") {
  //     return false;
  //   } else {
  //     var force = this.state.forceSearch
  //     this.setState({
  //       force: force,
  //     });
  //     this.forceInfo();
  //     if (this.state.info !== "") {
  //       console.log("no results found")
  //     }
  //   }

  // };

  // changeHandler = event => {
  //   this.setState({ force: event.target.value });
  // };
  test() {
    this.forceInfo();
  }
  render() {
    const { isLoaded } = this.state;
    console.log("props searched force", this.props.searchedForce)
    return (
      <>
        {!isLoaded
          ? <div><Loading /></div>
          :
          <>
            {/* <Form onSubmit={this.submitHandler} noValidate>
                <InputGroup >
                  <Form.Control
                    value={this.state.forceSearch}
                    onChange={this.changeHandler}
                    type="text"
                    id="defaultFormRegisterPasswordEx4"
                    aria-describedby="policeForceSearch"
                    className="form-control"
                    name="forceSearch"
                    placeholder="Search by police force"
                    required
                  />
                  <Button variant="light" className="login-button" type="submit">
                    Search
                  </Button>
                  <div className="invalid-feedback">
                    Please provide a police force.
                  </div>
                </InputGroup>
              </Form> */}
            {/* {this.test()} */}
            <h4 className="police-name">{this.state.info.name}</h4>
            <a className="police-url">{this.state.info.url}</a>
            <hr className="summary-line"></hr>
            <p className="police-description">{this.textFormatter(this.state.info.description)}</p>

          </>
        }
      </>
    );
  }
}

export default withRouter(PoliceForceInfo);
