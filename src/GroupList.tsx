import React from "react";
import { ListGroup, Button, Badge } from "react-bootstrap";
import { useGroups, useGroupsDispatch } from "./GroupsContext";
export function GroupList() {
  const groups: Array<{
    name: string;
    days: Array<String>;
    memberCounselors: Array<any>;
    minCounselors: Number;
  }> = useGroups()!;
  const groupsDispatch: Function = useGroupsDispatch()!;
  console.log(groups);
  return (
    <ListGroup>
      {groups.map(function (group) {
        return (
          <ListGroup.Item className="d-flex" key={group.name}>
            <div className="w-100">
              <div className="d-flex">
                <p className="my-auto">{group.name}</p>
                <p className="ms-2 my-auto">
                  <em>{group.days.join(", ")}</em>
                </p>
                <p className="ms-auto my-auto me-5">
                  Min: {group.minCounselors.toString()}
                </p>
              </div>
              {group.memberCounselors.map((member) => (
                <Badge bg="primary" className="me-1">
                  {member.name}
                </Badge>
              ))}
            </div>
            <Button
              className="ms-auto btn-danger p-1"
              onClick={() => {
                groupsDispatch({
                  type: "deleted",
                  name: group.name,
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
