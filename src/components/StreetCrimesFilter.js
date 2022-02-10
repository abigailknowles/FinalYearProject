import React, { Component } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';


const outcomes = [
  { value: 'resolved', label: 'Resolved' },
  { value: 'ongoing', label: 'Ongoing' }
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

class StreetCrimesFilter extends Component {
  constructor() {
    super();
    this.state = {
      selectedOption: null
    };
  }

  render() {
    return (
      <>

      </>
    );
  }
}

export default withRouter(StreetCrimesFilter);
