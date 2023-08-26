import React, { useEffect, useState } from "react";
import "./App.css";
import Nav from "./Nav";
import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
function App() {
  const [counselors, setCounselors] = useState<
    Array<{ name: string; visible: boolean }>
  >(JSON.parse(localStorage.getItem("counselors") ?? "[]"));
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
        <Row class="pt-4">
          <Col>
            <h2>Counselors</h2>
            <Form.Control
              placeholder="Search or Add a counselor..."
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
        </Row>
      </Container>
    </>
  );
}

export default App;
