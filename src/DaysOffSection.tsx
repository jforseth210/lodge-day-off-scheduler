import React from "react";
import { Row } from "react-bootstrap";
import { useApplicationState } from "./ApplicationContext";
import { Weekday } from "./Models";
export function DaysOffSection() {
  const state = useApplicationState()!;
  const days = [];
  for (const dayString in Weekday) {
    days.push(
      <div key={dayString} className="flex-fill card p-2 m-2">
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
              <li key={counselor.getName()}>{counselor.getName()}</li>
            ))}
        </ul>
      </div>
    );
  }
  return (
    <Row className="mt-2">
      <h2>Days Off</h2>
      <div className="d-flex w-100">{days}</div>
    </Row>
  );
}
