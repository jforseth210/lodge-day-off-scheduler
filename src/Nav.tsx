import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
function Nav() {
  return ( <Navbar bg="body-tertiary" expand="lg">
  <Container>
    <Navbar.Brand href="#">
      <img
        src="favicon.ico"
        alt="Legendary Lodge logo"
        width="40"
        height="40"
        className="d-inline-block align-top"
      />{' '}
      Scheduler
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarSupportedContent" />
  </Container>
</Navbar>
  );
}

export default Nav;
