import "./App.css";
import Nav from "./Nav";
import { Accordion, Col, Container, Form, Row } from "react-bootstrap";
import { CounselorList } from "./CounselorList";
import {
  useApplicationStateDispatch,
} from "./ApplicationContext";
import { NewGroupAccordian } from "./NewGroupAccordian";
import { GroupList } from "./GroupList";
import { DaysOffSection } from "./DaysOffSection";
import AccordionBody from "react-bootstrap/esm/AccordionBody";

function App() {
  let dispatch: Function = useApplicationStateDispatch()!;
  return (
    <>
      <Nav />
      <Container fluid>
        <Row className="pt-4">
          <Col className="col-md-4">
            <Accordion defaultActiveKey="1">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Counselors</Accordion.Header>
                <Accordion.Body>
                  <Form.Control
                    className="py-3"
                    placeholder="Search or Add a counselor..."
                    onBlur={function() {
                      dispatch({ type: "show_all_counselors" });
                    }}
                    onInput={function(e) {
                      dispatch({
                        type: "search_counselors",
                        text: (e.target as HTMLInputElement).value.toLowerCase(),
                      });
                    }}
                    onKeyDown={function(e) {
                      if (e.key === "Enter") {
                        dispatch({
                          type: "added_counselor",
                          name: (e.target as HTMLInputElement).value,
                          visible: true,
                        });
                        (e.target as HTMLInputElement).value = "";
                        dispatch({ type: "show_all_counselors" });
                      }
                    }}
                  />
                  <CounselorList />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Groups</Accordion.Header>
                <AccordionBody>
                  <NewGroupAccordian />
                  <GroupList />
                </AccordionBody>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col className="col-md-8">
            <DaysOffSection />
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default App;
