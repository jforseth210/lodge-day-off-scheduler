import React, { useState } from "react";
import { Accordion, Form, Button } from "react-bootstrap";
import { DaySelector } from "./DaySelector";
import Select from "react-select";
import {
  useApplicationState,
  useApplicationStateDispatch,
} from "./ApplicationContext";
import { Counselor } from "./Models";
export function NewGroupAccordian() {
  let state = useApplicationState()!;

  let allCounselors = state.counselors;

  const [selectedDays, setSelectedDays] = useState<Array<String>>([]);
  const [name, setName] = useState("");
  const [memberCounselors, setMemberCounselors] = useState<Counselor[]>([]);
  const [minCounselors, setMinCounselors] = useState(0);
  const dispatch: Function = useApplicationStateDispatch()!;
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>New Group</Accordion.Header>
        <Accordion.Body className="d-flex flex-column">
          <Form.Control
            className="mb-2"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Select
            className="mb-2"
            closeMenuOnSelect={false}
            placeholder="Counselors"
            isMulti
            onChange={(members) => {
              setMemberCounselors(
                members.map((member) => {
                  return allCounselors.filter((all_counselor) => {
                    return all_counselor.getName() === member.value;
                  })[0];
                })
              );
            }}
            options={allCounselors!.map((counselor) => {
              return {
                label: counselor.getName(),
                value: counselor.getName(),
              };
            })}
          />
          <Form.Control
            className="mb-2"
            placeholder="Minimum Counselors"
            type="number"
            value={minCounselors}
            onChange={(event) => setMinCounselors(parseInt(event.target.value))}
          />

          <DaySelector
            selectedDays={selectedDays}
            setSelectedDays={setSelectedDays}
          />
          <Button
            onClick={() => {
              dispatch({
                type: "added_group",
                name: name,
                memberCounselors: memberCounselors,
                minCounselors: minCounselors,
                days: selectedDays,
              });
            }}
          >
            Add
          </Button>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
