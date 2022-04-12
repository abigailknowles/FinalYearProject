import React, { Component } from 'react';
import { Row, Col, Jumbotron } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Loading from '../Loading';

class NeighbourhoodPriorities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      selection: "LU2",

    };
    this.handleChange = this.handleChange.bind(this);
  }

  neighbourhoodCode() {
    fetch(`https://data.police.uk/api/bedfordshire/neighbourhoods`)
      .then(res => res.json())
      .then(
        (result) => {
          var placeholder = result[0]
          this.setState({
            neighbourhoods: result,
            selection: placeholder.id
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }

  neighbourhoodEvents() {
    var policeForce = this.props.policeForce
    fetch(`https://data.police.uk/api/${policeForce}/${this.state.selection}/events`)
      .then(res => res.json())
      .then(
        (response) => {

          if (response.length === 0) {
            this.setState({
              events: { title: "", description: "No events found for this neighbourhood", address: "", "start_date": new Date() }

            });
          }
          else {
            this.setState({
              isLoaded: true,
              events: response[0],
            });
          }
        },
        (error) => {
          this.setState({
            error: true,
          });
        }
      )
  }


  errorHandling() {
    console.log("error")
  }
  neighbourhoodPriorities() {
    var policeForce = this.props.policeForce
    fetch(`https://data.police.uk/api/${policeForce}/${this.state.selection}/priorities`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            info: result[0],
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
    this.neighbourhoodPriorities();
    this.neighbourhoodEvents();
  }

  forceFormatter(force) {
    const police = force;
    const formatForce = police.charAt(0).toUpperCase() + police.slice(1);
    return formatForce;
  }

  textFormatter(description) {
    const desc = String(description);
    const formattedDesc1 = desc.replaceAll('<p>', '<br/>', '');
    const formattedDesc2 = formattedDesc1.replaceAll('-<br />', '');
    const formattedDesc3 = formattedDesc2.replaceAll('<br/>', '');

    return formattedDesc3.replaceAll('</p>', '\n');
  }

  handleChange(e) {
    this.setState({ selection: e.target.value });
    this.neighbourhoodPriorities()
    this.neighbourhoodEvents()

  }

  formatDate(unformattedDate) {
    var formattedDate = new Date(unformattedDate).toDateString();
    return formattedDate;
  }
  render() {
    const { isLoaded, neighbourhoods, events } = this.state;

    return (
      <>
        {!isLoaded
          ? <div><Loading /></div>
          :
          <>
            <Col sm>
              <Jumbotron className="personal-details-jumbotron" align="center">
                <Row>
                  <Col sm={5} align="left">
                    <h4 className="police-name">Neighbourhood Priorities</h4>
                  </Col>
                  <Col sm={7}>
                    <select value={this.state.selection} onChange={this.handleChange}>
                      {neighbourhoods.map((neighbourhoods) => (
                        <option value={neighbourhoods.id}>{neighbourhoods.name}</option>
                      ))}
                    </select>
                  </Col>
                </Row>
                <Row>
                  <Col align="left">
                    <h5 className="police-url">{this.forceFormatter(this.props.policeForce)} - {this.state.selection}</h5>
                  </Col>
                </Row>
                <hr className="summary-line"></hr>
                <p className="police-description">{this.textFormatter(this.state.info.issue)}</p>
              </Jumbotron>
            </Col>
            <Col sm>
              <Jumbotron className="personal-details-jumbotron" align="center">
                <Row>
                  <Col sm={5} align="left">
                    <h4 className="police-name">Neighbourhood Events </h4>
                  </Col>
                  <Col sm={7}>
                  </Col>
                </Row>
                {events == undefined
                  ? <div><h1>Error</h1></div>
                  :
                  <>
                    <Row>
                      <Col align="left">
                        {events.address == ""
                          ?
                          <h5 className="police-url">{this.formatDate(events.start_date)}</h5>
                          :
                          <h5 className="police-url">Location: {events.address}, {this.formatDate(events.start_date)}</h5>
                        }
                      </Col>
                    </Row>
                    <hr className="summary-line"></hr>
                    <p className="police-url">{events.title}</p>
                    <p className="police-description">{this.textFormatter(events.description)}</p>
                  </>
                }
              </Jumbotron>
            </Col>
          </>
        }
      </>
    );
  }
}

export default withRouter(NeighbourhoodPriorities);
