import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
interface Props {
  selectedDays: Array<String>;
  setSelectedDays: Function;
}

export function DaySelector({ selectedDays, setSelectedDays }: Props) {
  const days = [
    { label: "Mon", name: "Mon" },
    { label: "Tues", name: "Tues" },
    { label: "Weds", name: "Weds" },
    { label: "Thurs", name: "Thurs" },
  ];
  return (
    <>
      <ButtonGroup className="mb-2">
        {days.map((day) => {
          return (
            <Button
              key={day.name}
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
