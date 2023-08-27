import { createContext, useContext, useEffect, useReducer } from "react";

const CounselorsContext = createContext(null);

const CounselorsDispatchContext = createContext(null);
export function CounselorsProvider({ children }) {
  const [counselors, dispatch] = useReducer(
    counselorsReducer,
    loadCounselors()
  );

  useEffect(() => {
    localStorage.setItem(
       "counselors",
      JSON.stringify(
        counselors.map((counselor) => {
          return { ...counselor, visible: true };
        })
      )
    );
  }, [counselors]);

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
        { key: action.name, name: action.name, visible: action.visible },
      ].sort(function (a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
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
