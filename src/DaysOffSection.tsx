import React from "react";
import { Row } from "react-bootstrap";
import { useApplicationState } from "./ApplicationContext";
import { Weekday } from "./Models";
export function DaysOffSection() {
  const state = useApplicationState()!;
  const days = [];
  for (const dayString in Weekday) {
    days.push(
      <div className="flex-fill card p-2 m-2">
        <h4>{dayString}</h4>
        <hr className="mt-0" />
        <ul>
          {state.counselors
            .filter((counselor) =>
              counselor
                .getDaysOff()
                .includes(Weekday[dayString as keyof typeof Weekday])
            )
            .map((counselor) => (
              <li>{counselor.getName()}</li>
            ))}
        </ul>
      </div>
    );
  }
  if (state.scheduleGenerated) {
    return (
      <Row className="mt-2">
        <h2>Days Off</h2>
        <div className="d-flex w-100">{days}</div>
      </Row>
    );
  } else if (state.failureReasons.length > 1) {
    return (
      <Row className="mt-2">
        <h2>Days Off</h2>
        <p>Failed to generate a working schedule. Every attempt to generate a schedule failed for one of the following reasons:</p>
        <ol className="ms-3">
          {state.failureReasons.map((reason) => <li>{reason}</li>)}
        </ol>
      </Row>
    );
  } else {
    return (
      <Row className="mt-2">
        <h2>Days Off</h2>
        <p>Schedule not generated yet</p>
      </Row>
    );
  };
}
