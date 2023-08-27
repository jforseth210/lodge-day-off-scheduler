import React, { useState } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
export function DaySelector() {
  const [selectedDays, setSelectedDays] = useState<Array<String>>([]);
  const days = [
    { label: "Mon", name: "MONDAY" },
    { label: "Tues", name: "TUESDAY" },
    { label: "Weds", name: "WEDNESDAY" },
    { label: "Thurs", name: "THURSDAY" },
  ];
  return (
    <>
      <ButtonGroup className="mb-2">
        {days.map((day) => {
          return (
            <Button
              variant={selectedDays.includes(day.name) ? "primary" : ""}
              onClick={() => {
                if (selectedDays.includes(day.name)) {
                  setSelectedDays(
                    selectedDays.filter((day_i) => day_i !== day.name)
                  );
                } else {
                  setSelectedDays([...selectedDays, day.name]);
                }
              }}
            >
              {day.label}
            </Button>
          );
        })}
      </ButtonGroup>
    </>
  );
}
