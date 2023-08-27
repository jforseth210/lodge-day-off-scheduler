import React, { useState } from "react";
import { Accordion, Form, Button } from "react-bootstrap";
import { DaySelector } from "./DaySelector";
import { useCounselors } from "./CounselorsContext";
import Select from "react-select";
import { useGroupsDispatch } from "./GroupsContext";
export function NewGroupAccordian() {
  let allCounselors: Array<{ name: string; visible: boolean }> =
    useCounselors()!;

  const [selectedDays, setSelectedDays] = useState<Array<String>>([]);
  const [name, setName] = useState("");
  const [memberCounselors, setMemberCounselors] = useState<
    Array<{ name: string; visible: boolean }>
  >([]);
  const [minCounselors, setMinCounselors] = useState(0);
  const groupsDispatch: Function = useGroupsDispatch()!;
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
                members.map((member: any) => {
                  console.log(member);
                  return allCounselors.filter((all_counselor) => {
                    return all_counselor.name === member.value;
                  })[0];
                })
              );
            }}
            options={allCounselors!.map((counselor) => {
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
            value={minCounselors}
            onChange={(event) => setMinCounselors(parseInt(event.target.value))}
          />

          <DaySelector
            selectedDays={selectedDays}
            setSelectedDays={setSelectedDays}
          />
          <Button
            onClick={() => {
              groupsDispatch({
                type: "added",
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
