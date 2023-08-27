import React from "react";
import "./App.css";
import Nav from "./Nav";
import { Col, Container, Form, Row } from "react-bootstrap";
import { CounselorList } from "./CounselorList";
import { useCounselorsDispatch } from "./CounselorsContext";
import { NewGroupAccordian } from "./NewGroupAccordian";
import { useGroups } from "./GroupsContext";
import { GroupList } from "./GroupList";

function App() {
  let counselorsDispatch: Function = useCounselorsDispatch()!;
  let groups: Array<any> = useGroups()!;
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
                counselorsDispatch({ type: "show_all" });
              }}
              onInput={function (e) {
                counselorsDispatch({
                  type: "search",
                  text: (e.target as HTMLInputElement).value.toLowerCase(),
                });
              }}
              onKeyDown={function (e) {
                if (e.key === "Enter") {
                  counselorsDispatch({
                    type: "added",
                    name: (e.target as HTMLInputElement).value,
                    visible: true,
                  });
                  (e.target as HTMLInputElement).value = "";
                  counselorsDispatch({ type: "show_all" });
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
      </Container>
    </>
  );
}
export default App;
