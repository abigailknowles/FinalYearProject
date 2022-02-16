import React, { } from "react";
import DonutChart from "react-svg-donut";
import { Container, Col, Row, Form, Modal, Button, Jumbotron } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const title = "Movies"
const data = [
  { name: "Comedy", value: 4 },
  { name: "Action", value: 5 },
  { name: "Romance", value: 6 },
  { name: "Drama", value: 1 },
  { name: "SciFi", value: 4 },
  { name: "Drama", value: 4 },
  { name: "Thriller", value: 4 },
  { name: "Horror", value: 4 }
]

class Donut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  test(name) {
    console.log(name)
  }
  render() {
    const active = this.state.active;
    // const data = this.props.data;
    return (
      <>
        <NavBar />
        <Container className="top-breadcrumb">
          <Breadcrumb >
            <Breadcrumb.Item active>Police Force</Breadcrumb.Item>
          </Breadcrumb>
        </Container>
        <Row className="filter-padding">
        </Row>
        <Container fluid className="personal-details-jumbotron">
          <Row>
            <Col sm={3}>
              <Row>
                <Jumbotron className="personal-details-jumbotron">
                  <DonutChart
                    size={250}
                    title={title}
                    data={data}
                    onHover={i => {
                      if (i >= 0) {
                        console.log("Selected ", data[i].name);
                        this.setState({
                          active: i
                        });
                      } else {
                        console.log("Mouse left donut");
                      }
                    }}
                    innerRaduis={0.5}
                    outerRadius={1}
                    activeOffset={0.1}

                  />
                  <div className="test-label" id="label">
                    {active >= 0
                      ? data[active].name + ": " + data[active].value + " €"
                      : "Dankeschöns"}
                  </div>
                </Jumbotron>
              </Row>
              <Row>
                <Jumbotron className="personal-details-jumbotron">

                </Jumbotron>
              </Row>
            </Col>
            <Col sm={9}> <Jumbotron className="personal-details-jumbotron">
              <svg viewBox="0 0 100 60">
              </svg>
            </Jumbotron></Col>

          </Row>
        </Container>
      </>
    );
  }
}
export default Donut;