import React, { Component } from 'react';
import { Row, Col, Jumbotron } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Loading from '../Loading';
import Select from 'react-select';

class NeighbourhoodInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      neighbourhoods: []
    };
  }

  neighbourhoodCode() {
    fetch(`https://data.police.uk/api/${this.props.policeForce}/neighbourhoods`)
      .then(res => res.json())
      .then(
        (result) => {
          var placeholder = result[0].id
          this.setState({
            neighbourhoods: result,
            selection: placeholder
          });
          this.neighbourhoodPriorities();
          this.neighbourhoodEvents();
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }

  neighbourhoodEvents() {
    fetch(`https://data.police.uk/api/${this.props.policeForce}/${this.state.selection}/events`)
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

  neighbourhoodPriorities() {
    fetch(`https://data.police.uk/api/${this.props.policeForce}/${this.state.selection}/priorities`)
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
    const formattedDesc4 = formattedDesc3.replaceAll('<br />', ' ');
    return formattedDesc4.replaceAll('</p>', '\n');
  }

  changeHandler(force) {
    this.setState({
      selection: force,
    });
    this.neighbourhoodPriorities(force)
  }

  formatDate(unformattedDate) {
    var formattedDate = new Date(unformattedDate).toDateString();
    return formattedDate;
  }
  render() {
    const { isLoaded, neighbourhoods, events } = this.state;
    const sel = neighbourhoods.map(neighbourhood => ({ label: neighbourhood.name, value: neighbourhood.id }))
    return (
      <>
        {!isLoaded
          ? <div><Loading /></div>
          :
          <>
            <Col sm>
              <Jumbotron className="neighbourhood-events-jumbotron" align="center">
                <Row>
                  <Col sm={5} align="left">
                    <h4 className="police-name">Neighbourhood Priorities</h4>
                  </Col>
                  <Col sm={7}>
                    <Select
                      options={sel}
                      placeholder="Filter by neighbourhood"
                      onChange={sel => this.changeHandler(sel.value)}
                    />
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
              <Jumbotron className="neighbourhood-events-jumbotron" align="center">
                <Row>
                  <Col sm={5} align="left">
                    <h4 className="police-name">Neighbourhood Events </h4>
                  </Col>
                  <Col sm={7}>
                  </Col>
                </Row>
                {events === undefined
                  ? <div><h1>Error</h1></div>
                  :
                  <>
                    <Row>
                      <Col align="left">
                        {events.address === ""
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

export default withRouter(NeighbourhoodInfo);
