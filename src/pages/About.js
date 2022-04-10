import React from 'react';
import NavBar from '../components/NavBar';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDatabase } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons'
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <>
        <NavBar />
        <Row className="about-padding"> </Row>
        <div className="banner"></div>
        <Row className="about-padding"> </Row>
        <Container className="about-summary">
          <Row>
            <Col sm={4} >
              <Container className="about-icon">
                <FontAwesomeIcon size="3x" icon={faDatabase} />
              </Container>
            </Col>
            <Col sm={4}>
              <Container className="about-icon">
                <FontAwesomeIcon size="3x" className="about-icon" icon={faGlobe} />
              </Container>
            </Col>
            <Col sm={4}>
              <Container className="about-icon">
                <FontAwesomeIcon size="3x" className="about-icon" icon={faCalendarDay} />
              </Container>
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              <h3 className="about-icon-header">Data Source</h3>
            </Col>
            <Col sm={4}>
              <h3 className="about-icon-header">Location</h3>
            </Col>
            <Col sm={4}>
              <h3 className="about-icon-header">From</h3>
            </Col>
            {/* <Col sm={3}>
              <h3 className="about-icon-header">Contacts</h3>
            </Col> */}
          </Row>
          <Row>
            <Col sm={4}>
              <h6 className="about-icon-text"> <a href="https://data.police.uk/">https://data.police.uk/</a></h6>
            </Col>
            <Col sm={4}>
              <h6 className="about-icon-text">England, Wales and Northern Ireland</h6>
            </Col>
            <Col sm={4}>
              <h6 className="about-icon-text">2019</h6>
            </Col>
            {/* <Col>
              <h6 className="about-icon-text">text</h6>
            </Col> */}
          </Row>
        </Container>
        <Row className="about-padding"> </Row>

        <Container className="about-information">
          <br />
          <Row className="about-padding">
            <Col>
              <h4 className="about-header">What is the purpose of the project?</h4>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <p>The purpose of this project is to turn a large crime-related data source, and displaying present the data in the form of multiple
                interactive and filterable visualisations. The data will be displayed on an accessible and responsive web application, where users
                can also generate and download a PDF report for each of the data pages.</p>
            </Col>
          </Row>
          <br />
          <Row className="about-padding">
            <Col>
              <h4 className="about-header">Where has the data come from?</h4>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <p>The data provided for the visualisations has come from <a href="https://data.police.uk/data/"> https://data.police.uk/data/</a>. They provide data about crimes, outcomes,
                police forces and neighbourhoods for England, Wales and Northern Ireland. They make their data available through the Open Government Licence v3.0.
              </p>
            </Col>
          </Row>
          <br />
          <Row className="about-padding">
            <Col>
              <h4 className="about-header">What is the quality of the data like?</h4>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <p>The main advantage to using this data source would be how reliable it is. It provides open data regarding policing and crime in the UK and mentions how it supplies its data using the police annual data requirements (ADR) and the open government license. Another advantage to using this data source would be the extensive documentation it provides. It provides information on how to download the CSV, technical documentation on how to use the API, a changelog, contact details, and an about section.</p>
            </Col>
          </Row>
          <br />
          <Row className="about-padding">
            <Col>
              <h4 className="about-header">How can I work with this data source?</h4>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <p>Data.police.uk provide two methods of accessing their data; through calling an API or downloading a CSV.</p>
            </Col>
          </Row>
          <br />
          <Row className="about-padding">
            <Col>
              <h4 className="about-header">Who can I contact regarding this project?</h4>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <p>For any data related queries data.police.uk should be the first place of contact. There contact details can be found on
                the following link: <a href="https://data.police.uk/contact/">https://data.police.uk/contact/</a>. For any other queries regarding the web application you are currently on,
                you can contact A.Knowles@2018.ljmu.ac.uk</p>
            </Col>
          </Row>
          <Row className="about-padding"></Row>
          <br />
        </Container>
      </>
    );
  }
}
export default About