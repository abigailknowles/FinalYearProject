import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class Tabs extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <>
        <Nav justify variant="tabs" defaultActiveKey="/">
          <Nav.Item>
            <Nav.Link href="/">Crime type</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2">Crime outcome</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/police-force">Police force</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="stop-and-search">Stop and search</Nav.Link>
          </Nav.Item>
        </Nav>
      </>
    );
  }
}

export default withRouter(Tabs);
