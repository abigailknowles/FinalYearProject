import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Loading from '../Loading';

class NeighbourhoodInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      selection: "LU3"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  neighbourhoodCode() {
    fetch(`https://data.police.uk/api/bedfordshire/neighbourhoods`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            neighbourhoods: result,
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
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
          </>
        }
      </>
    );
  }
}

export default withRouter(NeighbourhoodInfo);
