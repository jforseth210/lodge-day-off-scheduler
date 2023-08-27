import { createContext, useContext, useEffect, useReducer } from "react";

const GroupsContext = createContext(null);

const GroupsDispatchContext = createContext(null);

export function GroupsProvider({ children }) {
  const [groups, dispatch] = useReducer(groupsReducer, loadGroups());
  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  return (
    <GroupsContext.Provider value={groups}>
      <GroupsDispatchContext.Provider value={dispatch}>
        {children}
      </GroupsDispatchContext.Provider>
    </GroupsContext.Provider>
  );
}

export function useGroups() {
  return useContext(GroupsContext);
}

export function useGroupsDispatch() {
  return useContext(GroupsDispatchContext);
}

function groupsReducer(groups, action) {
  switch (action.type) {
    case "added": {
      if (groups.map((group) => group.name).includes(action.name)) {
        // Group already exists, bail
        return groups;
      }
      return [
        ...groups,
        {
          name: action.name,
          days: action.days,
          memberCounselors: action.memberCounselors,
          minCounselors: action.minCounselors,
        },
      ];
    }
    case "deleted": {
      return groups.filter((group) => group.name !== action.name);
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
function loadGroups() {
  return JSON.parse(localStorage.getItem("groups") ?? "[]");
}
