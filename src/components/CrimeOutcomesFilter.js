import React, { Component } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';


const crimes = [
  { value: 'resolved', label: 'Drug related' },
  { value: 'ongoing', label: 'Thefts' }
];
const months = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];
const years = [
  { value: '2014', label: '2014' },
  { value: '2015', label: '2015' },
  { value: '2016', label: '2016' },
  { value: '2017', label: '2017' },
  { value: '2018', label: '2018' },
  { value: '2019', label: '2019' },
  { value: '2020', label: '2020' },
  { value: '2021', label: '2021' }
];

class CrimeOutcomesFilter extends Component {
  constructor() {
    super();
    this.state = {
      selectedOption: null
    };
  }

  render() {
    return (
      <>
        <div className="filter-box">
          <Container >
            <Row className="filter-row">
              <Col className="no-padding">
                <h3 className="filter-text">Filter by</h3>
              </Col>
            </Row>
            <Row className="filter-padding">
              <Col >
                <Select
                  placeholder="Crime outcomes "
                  value={this.selectedOption}
                  onChange={this.handleChange}
                  options={crimes}
                />
              </Col>
              <Col>
                <Select
                  placeholder="Month"
                  value={this.selectedOption}
                  onChange={this.handleChange}
                  options={months}
                />
              </Col>
              <Col>
                <Select
                  placeholder="Year"
                  value={this.selectedOption}
                  onChange={this.handleChange}
                  options={years}
                />
              </Col>
            </Row>
            <Row className="filter-padding">
              <Col>
                <Button className="filter-button" type="submit" variant="primary">Update</Button>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default withRouter(CrimeOutcomesFilter);
