import React from "react";
import { ListGroup, Button } from "react-bootstrap";
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
              {counselor.getName()}
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
