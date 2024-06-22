import React, { useState } from "react";
import { solve } from "./Solver";
import {
  useApplicationState,
  useApplicationStateDispatch,
} from "./ApplicationContext";
import { Button } from "react-bootstrap";

export function SolveButton() {
  const state = useApplicationState();
  const dispatch = useApplicationStateDispatch();
  const [processing, setProcessing] = useState(false);
  if (processing) {
    return <Button></Button>;
  }
  return (
    <Button
      onClick={async () => {
        setProcessing(true);
        let attempts = 0;
        let solution = { success: false, reason: "Solving hasn't started..." };
        state.failureReasons = [];
        while (!solution.success && attempts < 100) {
          for (const counselor of state.counselors) {
            counselor.setAllDaysOff();
          }
          solution = await solve(state.groups, state.counselors);
          if (solution != null && !solution['success']) {
            state.failureReasons.push(solution['reason'])
          }
          attempts++;
        }
        if (solution.success) {
          dispatch({ type: "solution_found" });
        }
        else {
          state.failureReasons = state.failureReasons.filter((reason, index) => state.failureReasons.indexOf(reason) === index);
        }
        dispatch({ type: "refresh_everything" });
        setProcessing(false);
      }}
    >
      Generate
    </Button>
  );
}
