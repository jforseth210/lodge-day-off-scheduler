import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import { useCounselors, useCounselorsDispatch } from "./CounselorsContext";
export function CounselorList() {
  const counselors: Array<{ name: string; visible: boolean }> =
    useCounselors()!;
  const counselorsDispatch: Function = useCounselorsDispatch()!;
  return (
    <ListGroup>
      {counselors
        .filter((counselor) => counselor.visible)
        .map(function (counselor) {
          return (
            <ListGroup.Item className="d-flex">
              {counselor.name}
              <Button
                className="ms-auto btn-danger p-1"
                onClick={() => {
                  counselorsDispatch({
                    type: "deleted",
                    name: counselor.name,
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
