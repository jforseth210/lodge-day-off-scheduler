import React, { useState } from "react";
import {
  Accordion,
  Form,
  Button,
  ButtonGroup,
  Card,
  Badge,
} from "react-bootstrap";
import { DaySelector } from "./DaySelector";
import Select from "react-select";
import {
  useApplicationState,
  useApplicationStateDispatch,
} from "./ApplicationContext";
import { Counselor, Group } from "./Models";
export function NewGroupAccordian() {
  let state = useApplicationState()!;

  let allCounselors = state.counselors;
  let allGroups = state.groups;

  const [selectedDays, setSelectedDays] = useState<Array<String>>([]);
  const [name, setName] = useState("");
  const [memberCounselors, setMemberCounselors] = useState<Counselor[]>([]);
  const [minCounselorsPerDay, setMinCounselorsPerDay] = useState(0);
  const [minCounselorsInGroup, setMinCounselorsInGroup] = useState(0);
  const dispatch: Function = useApplicationStateDispatch()!;
  const [counselorAutoSelect, setCounselorAutoSelect] = useState(false);
  const [excludedGroups, setExcludedGroups] = useState<Group[]>([]);
  function getRandomElement<T>(array: Array<T>): T {
    return array[Math.floor(Math.random() * array.length)];
  }
  function chooseRandomCounselors() {
    let newMemberCounselors = [];
    let freeCounselors = allCounselors.filter((counselor) => {
      return !excludedGroups.some((group) => {
        return group.getMemberCounselors().includes(counselor);
      });
    });
    for (let i = 0; i < minCounselorsInGroup; i++) {
      let freeCounselor = getRandomElement(freeCounselors);
      newMemberCounselors.push(freeCounselor);
      freeCounselors.splice(freeCounselors.indexOf(freeCounselor), 1 );
    }
    setMemberCounselors(newMemberCounselors);
  }
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
          <Card className="p-2">
            <p className="mb-0 text-muted">Add counselors to group:</p>
            <ButtonGroup className="mb-2 w-100">
              <Button
                key="manual"
                variant={!counselorAutoSelect ? "primary" : ""}
                onClick={() => {
                  setCounselorAutoSelect(false);
                }}
              >
                Manually
              </Button>
              <Button
                key="auto"
                variant={counselorAutoSelect ? "primary" : ""}
                onClick={() => {
                  setCounselorAutoSelect(true);
                }}
              >
                Automatically
              </Button>
            </ButtonGroup>
            {counselorAutoSelect ? (
              <>
                <p className="mb-0 text-muted">Minimum Counselors in Group</p>
                <Form.Control
                  className="mb-2"
                  type="number"
                  value={minCounselorsInGroup}
                  onChange={(event) => {
                    setMinCounselorsInGroup(parseInt(event.target.value));
                    chooseRandomCounselors();
                  }}
                />
                <Select
                  className="mb-2"
                  closeMenuOnSelect={false}
                  placeholder="Exclude Members of Groups"
                  isMulti
                  onChange={(groups) => {
                    setExcludedGroups(
                      groups.map((group) => {
                        return allGroups.filter((allGroup) => {
                          return allGroup.getName() === group.value;
                        })[0];
                      })
                    );
                    chooseRandomCounselors();
                  }}
                  options={allGroups!.map((group) => {
                    return {
                      label: group.getName(),
                      value: group.getName(),
                    };
                  })}
                />
              </>
            ) : (
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
            )}
            <div>
              {memberCounselors.map((member) => (
                <Badge bg="primary" className="me-1" key={member.getName()}>
                  {member.getName()}
                </Badge>
              ))}
            </div>
          </Card>
          <p className="mb-0 text-muted">Minimum Counselors per Day:</p>
          <Form.Control
            className="mb-2"
            type="number"
            value={minCounselorsPerDay}
            onChange={(event) =>
              setMinCounselorsPerDay(parseInt(event.target.value))
            }
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
                minCounselors: minCounselorsPerDay,
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
