import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { Counselor, Group, Weekday } from "./Models";
interface ApplicationStateInterface {
  counselors: Counselor[];
  groups: Group[];
  scheduleGenerated: boolean;
  failureReasons: string[]
}
interface SerializableApplicationStateInterface {
  counselors: Counselor[];
  groups: Group[];
  relationships: Array<{ counselor: string; group: string }>;
}
export const ApplicationContext = createContext<ApplicationStateInterface>({
  counselors: [],
  groups: [],
  scheduleGenerated: false,
  failureReasons: []
});
export const ApplicationDispatchContext = createContext<React.Dispatch<any>>(
  () => { }
);
interface Props {
  children?: ReactNode;
  // any props that come into the component
}
export function StateProvider({ children }: Props) {
  const [state, dispatch] = useReducer(stateReducer, loadState());

  useEffect(() => {
    saveState(state);
  }, [state]);

  return (
    <ApplicationContext.Provider value={state}>
      <ApplicationDispatchContext.Provider value={dispatch!}>
        {children}
      </ApplicationDispatchContext.Provider>
    </ApplicationContext.Provider>
  );
}

export function useApplicationState() {
  return useContext(ApplicationContext);
}

export function useApplicationStateDispatch() {
  return useContext(ApplicationDispatchContext);
}
type Action =
  | { type: "show_all_counselors" }
  | { type: "search_counselors"; text: string }
  | { type: "added_counselor"; name: string; visible: boolean }
  | { type: "deleted_counselor"; name: string }
  | {
    type: "added_group";
    name: string;
    days: Weekday[];
    minCounselors: number;
    memberCounselors: Counselor[];
  }
  | { type: "deleted_group"; name: string }
  | { type: "refresh_everything" }
  | { type: "solution_found" };
function stateReducer(
  state: ApplicationStateInterface,
  action: Action
): ApplicationStateInterface {
  switch (action.type) {
    case "show_all_counselors": {
      return {
        ...state,
        counselors: state.counselors.map((counselor) => {
          counselor.setVisibility(true);
          return counselor;
        }),
      };
    }
    case "search_counselors": {
      return {
        ...state,
        counselors: state.counselors.map((counselor) => {
          counselor.setVisibility(
            counselor.getName().toLowerCase().includes(action.text) ||
            action.text === ""
          );
          return counselor;
        }),
      };
    }
    case "added_counselor": {
      if (
        state.counselors
          .map((counselor) => counselor.getName())
          .includes(action.name)
      ) {
        // Counselor already exists, bail
        return state;
      }
      const counselor = new Counselor(action.name);
      counselor.setVisibility(action.visible);
      return {
        ...state,
        scheduleGenerated: false,
        counselors: [...state.counselors, counselor].sort(function(
          a: Counselor,
          b: Counselor
        ) {
          var textA = a.getName().toUpperCase();
          var textB = b.getName().toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        }),
      };
    }
    case "deleted_counselor": {
      return {
        ...state,
        scheduleGenerated: false,
        groups: state.groups.map((group) => {
          group.setMemberCounselors(
            group
              .getMemberCounselors()
              .filter((member) => member.getName() !== action.name)
          );
          return group;
        }),
        counselors: state.counselors.filter(
          (counselor) => counselor.getName() !== action.name
        ),
      };
    }
    case "added_group": {
      if (
        state.groups
          .map((group: Group) => group.getName())
          .includes(action.name)
      ) {
        // Group already exists, bail
        return state;
      }
      const group = new Group(action.name, action.days, action.minCounselors);
      for (const member of action.memberCounselors) {
        group.addCounselor(member);
        member.addGroup(group);
      }
      return { ...state, groups: [...state.groups, group] };
    }
    case "deleted_group": {
      return {
        ...state,
        scheduleGenerated: false,
        groups: state.groups.filter(
          (group: Group) => group.getName() !== action.name
        ),
      };
    }
    case "solution_found": {
      return { ...state, scheduleGenerated: true };
    }
    case "refresh_everything": {
      let stateCopy: ApplicationStateInterface = {
        counselors: [],
        groups: [],
        scheduleGenerated: state.scheduleGenerated,
        failureReasons: state.failureReasons
      };
      for (const counselor of state.counselors) {
        stateCopy.counselors.push(counselor.clone());
      }
      for (const group of state.groups) {
        stateCopy.groups.push(group.clone());
      }
      return stateCopy;
    }
    default:
      return state;
  }
}
function saveState(state: ApplicationStateInterface) {
  let stateCopy: SerializableApplicationStateInterface = {
    counselors: [],
    groups: [],
    relationships: [],
  };
  for (const counselor of state.counselors) {
    stateCopy.counselors.push(counselor.clone());
  }
  for (const group of state.groups) {
    stateCopy.groups.push(group.clone());
  }
  for (const counselor of stateCopy.counselors) {
    for (const group of counselor.getGroups()) {
      const relationship = {
        group: group.getName(),
        counselor: counselor.getName(),
      };
      if (
        !stateCopy.relationships.some(
          (item) => JSON.stringify(item) === JSON.stringify(relationship)
        )
      ) {
        stateCopy.relationships.push(relationship);
      }
    }
    counselor.clearGroups();
  }
  for (const group of stateCopy.groups) {
    for (const counselor of group.getMemberCounselors()) {
      const relationship = {
        group: group.getName(),
        counselor: counselor.getName(),
      };
      if (
        !stateCopy.relationships.some(
          (item) => JSON.stringify(item) === JSON.stringify(relationship)
        )
      ) {
        stateCopy.relationships.push(relationship);
      }
    }
    group.clearMemberCounselors();
  }

  localStorage.setItem("state", JSON.stringify(stateCopy));
}
function loadState(): ApplicationStateInterface {
  const storedState = localStorage.getItem("state");
  if (storedState) {
    const parsedState = JSON.parse(storedState);

    // Create Counselor instances from the serialized data
    const counselors = parsedState.counselors.map((counselorData: any) => {
      const counselor = new Counselor(counselorData.name);
      counselor.setVisibility(counselorData.visible);
      counselor.setDaysOn(counselorData.daysOn);
      return counselor;
    });

    // Create Group instances from the serialized data
    const groups = parsedState.groups.map((groupData: any) => {
      const group = new Group(
        groupData.name,
        groupData.days,
        groupData.minCounselors
      );
      return group;
    });
    for (const relationship of parsedState.relationships) {
      const counselor: Counselor = counselors.filter(
        (counselor: Counselor) => counselor.getName() === relationship.counselor
      )[0];
      const group: Group = groups.filter(
        (group: Group) => group.getName() === relationship.group
      )[0];
      if (group && counselor) {
        group.addCounselor(counselor);
        counselor.addGroup(group);
      }
    }
    // Reconstruct the state object
    return {
      counselors: counselors,
      groups: groups,
      scheduleGenerated: false,
      failureReasons: []
    };
  }
  return { counselors: [], groups: [], scheduleGenerated: false, failureReasons: [] };
}
