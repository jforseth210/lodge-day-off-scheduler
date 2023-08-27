import { createContext, useContext, useReducer } from "react";

const CounselorsContext = createContext(null);

const CounselorsDispatchContext = createContext(null);

export function CounselorsProvider({ children }) {
  const [counselors, dispatch] = useReducer(
    counselorsReducer,
    loadCounselors()
  );

  return (
    <CounselorsContext.Provider value={counselors}>
      <CounselorsDispatchContext.Provider value={dispatch}>
        {children}
      </CounselorsDispatchContext.Provider>
    </CounselorsContext.Provider>
  );
}

export function useCounselors() {
  return useContext(CounselorsContext);
}

export function useCounselorsDispatch() {
  return useContext(CounselorsDispatchContext);
}

function counselorsReducer(counselors, action) {
  switch (action.type) {
    case "show_all": {
      return counselors.map((counselor) => {
        return { ...counselor, visible: true };
      });
    }
    case "search": {
      return counselors.map((counselor) => {
        counselor.visible =
          counselor.name.toLowerCase().includes(action.text) ||
          action.text === "";
        return counselor;
      });
    }
    case "added": {
      if (counselors.map((counselor) => counselor.name).includes(action.name)) {
        // Counselor already exists, bail
        return counselors;
      }
      return [
        ...counselors,
        {
          name: action.name,
          visible: action.visible,
        },
      ];
    }
    case "deleted": {
      return counselors.filter((counselor) => counselor.name !== action.name);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
function loadCounselors() {
  return JSON.parse(localStorage.getItem("counselors") ?? "[]");
}
