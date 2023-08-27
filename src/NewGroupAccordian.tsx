import React from "react";
import { Accordion, Form, Button } from "react-bootstrap";
import { DaySelector } from "./DaySelector";
import { useCounselors } from "./CounselorsContext";
import Select from "react-select";
export function NewGroupAccordian() {
  let counselors: Array<{ name: string; visible: boolean }> = useCounselors()!;
  return (
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
            options={counselors!.map((counselor) => {
              return {
                label: counselor.name,
                value: counselor.name,
              };
            })}
          />
          <Form.Control
            className="mb-2"
            placeholder="Minimum Counselors"
            type="number"
          />

          <DaySelector />
          <Button>Add</Button>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
