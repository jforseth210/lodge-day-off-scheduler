import React from "react";
import "./App.css";
import Nav from "./Nav";
import { Col, Container, Form, Row } from "react-bootstrap";
import { CounselorList } from "./CounselorList";
import {
  useApplicationState,
  useApplicationStateDispatch,
} from "./ApplicationContext";
import { NewGroupAccordian } from "./NewGroupAccordian";
import { GroupList } from "./GroupList";
import { DaysOffSection } from "./DaysOffSection";

function App() {
  let dispatch: Function = useApplicationStateDispatch()!;
  const state = useApplicationState();
  return (
    <>
      <Nav />
      <Container>
        <Row className="pt-4">
          <Col>
            <h2>Counselors</h2>
            <Form.Control
              className="py-3"
              placeholder="Search or Add a counselor..."
              onBlur={function (e) {
                dispatch({ type: "show_all_counselors" });
              }}
              onInput={function (e) {
                dispatch({
                  type: "search_counselors",
                  text: (e.target as HTMLInputElement).value.toLowerCase(),
                });
              }}
              onKeyDown={function (e) {
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
          </Col>
          <Col>
            <h2>Groups</h2>
            <NewGroupAccordian />
            <GroupList />
          </Col>
        </Row>
        {state.scheduleGenerated && <DaysOffSection />}
      </Container>
    </>
  );
}
export default App;
