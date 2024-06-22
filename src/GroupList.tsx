
import { Weekday } from "./Models";
import React, { useState } from "react";
import { ListGroup, Button, Badge, Modal } from "react-bootstrap";
import {
  useApplicationState,
  useApplicationStateDispatch,
} from "./ApplicationContext";
import { Counselor, Group } from "./Models";
import { GroupModal } from "./GroupModal";
export function GroupList() {
  const state = useApplicationState()!;
  const groups = state.groups;
  const dispatch: Function = useApplicationStateDispatch()!;
  const [visibleGroup, setVisibleGroup] = useState<Group | null>(null);

  const handleClose = () => setVisibleGroup(null);
  function showGroup(group: Group) { setVisibleGroup(group); };

  return (
    <>
      <ListGroup className="clickable">
        {groups
          .sort((a, b) => a.getName().localeCompare(b.getName()))
          .map(function(group) {
            return (
              <ListGroup.Item className="d-flex" key={group.getName()} onClick={() => { showGroup(group) }}>
                <div className="w-100">
                  <div className="d-flex">
                    <p className="my-auto">{group.getName()}</p>
                    <p className="ms-2 my-auto">
                      <em>{group.getDays().join(", ")}</em>
                    </p>
                    <p className="ms-auto my-auto me-5">
                      Min: {group.getMinCounselors().toString()}
                    </p>
                  </div>
                  {group.getMemberCounselors().map((member) => (
                    <Badge bg="primary" className="me-1" key={member.getName()}>
                      {member.getName()}
                    </Badge>
                  ))}
                </div>
                <Button
                  className="ms-auto btn-danger p-1"
                  onClick={() => {
                    dispatch({
                      type: "deleted_group",
                      name: group.getName(),
                    });
                  }}
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </ListGroup.Item>
            );
          })}
      </ListGroup>
      <GroupModal group={visibleGroup} handleClose={handleClose} />
    </>
  );
}
