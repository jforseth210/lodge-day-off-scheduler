import React, { useEffect, useState } from "react";
import "./App.css";
import Nav from "./Nav";
import {
  Accordion,
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";
import Select from "react-select";
function App() {
  const [counselors, setCounselors] = useState<
    Array<{ name: string; visible: boolean }>
  >(JSON.parse(localStorage.getItem("counselors") ?? "[]"));

  const [days, setDays] = useState<Array<String>>([]);
  useEffect(() => {
    localStorage.setItem(
      "counselors",
      JSON.stringify(
        counselors.map((counselor) => {
          return { ...counselor, visible: true };
        })
      )
    );
  }, [counselors]);

  return (
    <>
      <Nav />
      <Container>
        <Row className="pt-4">
          <Col>
            <h2>Counselors</h2>
            <Form.Control
              placeholder="Search or Add a counselor..."
              onBlur={function (e) {
                setCounselors(
                  counselors.map((counselor) => {
                    return { ...counselor, visible: true };
                  })
                );
              }}
              onInput={function (e) {
                setCounselors(
                  counselors.map((counselor) => {
                    counselor.visible =
                      counselor.name
                        .toLowerCase()
                        .includes(
                          (e.target as HTMLInputElement).value.toLowerCase()
                        ) || (e.target as HTMLInputElement).value == "";
                    return counselor;
                  })
                );
              }}
              onKeyDown={function (e) {
                if (
                  e.key == "Enter" &&
                  !counselors
                    .map((counselor) => counselor.name)
                    .includes((e.target as HTMLInputElement).value)
                ) {
                  setCounselors([
                    ...counselors,
                    {
                      name: (e.target as HTMLInputElement).value,
                      visible: true,
                    },
                  ]);
                  (e.target as HTMLInputElement).value = "";
                }
              }}
            />
            <ListGroup>
              {counselors.map(function (counselor) {
                if (counselor.visible) {
                  return (
                    <ListGroup.Item className="d-flex">
                      {counselor.name}
                      <Button
                        className="ms-auto btn-danger p-1"
                        onClick={() => {
                          setCounselors(
                            counselors.filter(
                              (counselori) => counselori.name != counselor.name
                            )
                          );
                        }}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </ListGroup.Item>
                  );
                }
              })}
            </ListGroup>
          </Col>
          <Col>
            <h2>Groups</h2>{" "}
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>New Group</Accordion.Header>
                <Accordion.Body className="d-flex flex-column">
                  <Form.Control className="mb-2" placeholder="Name" />
                  <Select
                    className="mb-2"
                    closeMenuOnSelect={false}
                    placeholder="Counselors"
                    isMulti
                    options={counselors.map((counselor) => {
                      return { label: counselor.name, value: counselor.name };
                    })}
                  />
                  <Form.Control
                    className="mb-2"
                    placeholder="Minimum Counselors"
                    type="number"
                  />

                  <ButtonGroup className="mb-2">
                    <Button
                      variant={days.includes("MONDAY") ? "primary" : ""}
                      onClick={() => {
                        if (days.includes("MONDAY")) {
                          setDays(days.filter((day) => day != "MONDAY"));
                        } else {
                          setDays([...days, "MONDAY"]);
                        }
                      }}
                    >
                      Mon
                    </Button>
                    <Button
                      variant={days.includes("TUESDAY") ? "primary" : ""}
                      onClick={() => {
                        if (days.includes("TUESDAY")) {
                          setDays(days.filter((day) => day != "TUESDAY"));
                        } else {
                          setDays([...days, "TUESDAY"]);
                        }
                      }}
                    >
                      Tues
                    </Button>
                    <Button
                      variant={days.includes("WEDNESDAY") ? "primary" : ""}
                      onClick={() => {
                        if (days.includes("WEDNESDAY")) {
                          setDays(days.filter((day) => day != "WEDNESDAY"));
                        } else {
                          setDays([...days, "WEDNESDAY"]);
                        }
                      }}
                    >
                      Wed
                    </Button>
                    <Button
                      variant={days.includes("THURSDAY") ? "primary" : ""}
                      onClick={() => {
                        if (days.includes("THURSDAY")) {
                          setDays(days.filter((day) => day != "THURSDAY"));
                        } else {
                          setDays([...days, "THURSDAY"]);
                        }
                      }}
                    >
                      Thurs
                    </Button>
                  </ButtonGroup>
                  <Button>Add</Button>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
