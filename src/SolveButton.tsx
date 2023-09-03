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
        let solution = false;
        while (!solution && attempts < 20) {
          for (const counselor of state.counselors) {
            counselor.setAllDaysOff();
          }
          solution = await solve(state.groups, state.counselors);
          console.log(solution ? "Success" : "Failure");
          attempts++;
        }
        dispatch({ type: "refresh_everything" });
        setProcessing(false);
      }}
    >
      Generate
    </Button>
  );
}
