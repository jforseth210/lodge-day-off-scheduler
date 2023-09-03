import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { SolveButton } from "./SolveButton";
import { NavItem } from "react-bootstrap";
function Nav() {
  return (
    <Navbar bg="body-tertiary" expand="lg">
      <Container>
        <Navbar.Brand href="#">
          <img
            src="favicon.ico"
            alt="Legendary Lodge logo"
            width="40"
            height="40"
            className="d-inline-block align-top"
          />{" "}
          Scheduler
        </Navbar.Brand>
        <NavItem>
          <SolveButton />
        </NavItem>
      </Container>
    </Navbar>
  );
}

export default Nav;
