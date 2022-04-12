import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Loading from '../Loading';

class NeighbourhoodPriorities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      selection: ""
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
          console.log(this.state.selection)
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
    this.neighbourhoodEvents();
  }

  neighbourhoodEvents() {
    var policeForce = this.props.policeForce
    fetch(`https://data.police.uk/api/leicestershire/NC04/events`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            events: result[0],
          });
          console.log(this.state.events)
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
  formatDate(unformattedDate) {
    var formattedDate = new Date(unformattedDate).toDateString();
    return formattedDate;
  }
  forceFormatter(force) {
    const police = force;
    const formatForce = police.charAt(0).toUpperCase() + police.slice(1);
    return formatForce;
  }

  textFormatter(description) {
    const desc = String(description);
    const formattedDesc1 = desc.replaceAll('<p>', '');
    const formattedDesc2 = formattedDesc1.replaceAll('-<br />', '');

    return formattedDesc2.replaceAll('</p>', '\n');
  }

  handleChange(e) {
    this.setState({ selection: e.target.value });
    this.neighbourhoodPriorities()
  }

  render() {
    const { isLoaded, neighbourhoods } = this.state;

    return (
      <>
        {!isLoaded
          ? <div><Loading /></div>
          :
          <>
            <Row>
              <Col sm={5} align="left">
                <h4 className="police-name">Neighbourhood Events </h4>
              </Col>
              <Col sm={7}>
                {/* <select value={this.state.selection} onChange={this.handleChange}>
                  {neighbourhoods.map((neighbourhoods) => (
                    <option value={neighbourhoods.id}>{neighbourhoods.name}</option>
                  ))}
                </select> */}
              </Col>
            </Row>
            <Row>
              <Col align="left">
                <h5 className="police-url">{this.state.events.address}, {this.formatDate(this.state.events.start_date)}</h5>
              </Col>
            </Row>
            <hr className="summary-line"></hr>
            <p className="police-url">{this.state.events.title}</p>
            <p className="police-description">{this.textFormatter(this.state.events.description)}</p>
          </>
        }
      </>
    );
  }
}

export default withRouter(NeighbourhoodPriorities);
