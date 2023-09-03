import React from "react";
import { ListGroup, Button, Badge } from "react-bootstrap";
import {
  useApplicationState,
  useApplicationStateDispatch,
} from "./ApplicationContext";
export function CounselorList() {
  const state = useApplicationState();
  const counselors = state.counselors;
  const dispatch: Function = useApplicationStateDispatch();
  return (
    <ListGroup>
      {counselors
        .filter((counselor) => counselor.getVisibility())
        .map(function (counselor) {
          return (
            <ListGroup.Item className="d-flex" key={counselor.getName()}>
              <div className="w-100">
                <div className="d-flex">
                  <p className="my-auto">{counselor.getName()}</p>
                </div>
                {counselor.getDaysOff().map((day) => (
                  <Badge bg="primary" className="me-1" key={day}>
                    {day}
                  </Badge>
                ))}
              </div>
              <Button
                className="ms-auto btn-danger p-1"
                onClick={() => {
                  dispatch({
                    type: "deleted_counselor",
                    name: counselor.getName(),
                  });
                }}
              >
                <i className="bi bi-trash"></i>
              </Button>
            </ListGroup.Item>
          );
        })}
    </ListGroup>
  );
}
