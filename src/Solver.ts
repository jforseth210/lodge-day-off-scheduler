import { Counselor, Group, Weekday } from "./Models";
function getRandomElement<T>(array: Array<T>): T {
  return array[Math.floor(Math.random() * array.length)];
}

export async function solve(groups: Group[], counselors: Counselor[]) {
  for (const dayString in Weekday) {
    const day: Weekday = Weekday[dayString as keyof typeof Weekday];
    for (const group of groups) {
      while (!group.hasMinimum(day)) {
        const counselorsOff = group.getCounselorsOff(day);
        if (counselorsOff.length > 0) {
          let options = [];
          for (const counselor of counselorsOff) {
            if (counselor.canWorkAnotherDay()) {
              options.push(counselor);
            }
          }
          if (options.length > 0) {
            getRandomElement(options).setOn(day, true);
          } else {
            return { success: false, reason: `No counselors available for ${group.getName()} on ${day}` };
          }
        } else {
          return { success: false, reason: `No counselors off on ${day}` };;
        }
      }
    }
    groups.sort((a, b) => b.getCounselorRatio(day) - a.getCounselorRatio(day));
  }
  for (const counselor of counselors) {
    while (counselor.getDaysOff().length > 1) {
      counselor.setOn(getRandomElement(counselor.getDaysOff()), true);
    }
  }

  for (const dayString in Weekday) {
    const day: Weekday = Weekday[dayString as keyof typeof Weekday];
    if (counselors.every((counselor) => counselor.isOn(day))) {
      return { success: false, reason: `Every counselor is working on ${day}` };
    }
  }

  /*
  const result = [];
  for (const counselor of counselors) {
    result.push([counselor.getName(), counselor.getDaysOff()[0]]);
  }*/
  return { success: true, reason: '' };
}
/*
function shuffle(array: Array<any>) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
(async () => {
  const TRIES = 10; // Change this to the desired number of tries
  const solutions = [];

  for (let i = 0; i < TRIES; i++) {
    shuffle(counselors);
    shuffle(groups);

    for (const counselor of counselors) {
      counselor.setAllDaysOff();
    }

    const solution = solve(groups, counselors);

    if (solution) {
      const sortedSolution = solution.map(([name, daysOn]) => [name, daysOn]);
      solutions.push(sortedSolution);
    }
  }

  // Deduplicate solutions
  const uniqueSolutions = [...new Set(solutions.map(JSON.stringify))].map(
    JSON.parse
  );

  for (const solution of uniqueSolutions) {
    console.log("Possible days off:");
    console.log("==================");

    for (const [name, daysOn] of solution) {
      console.log(name, daysOn);
    }
    for (const group of groups) {
      console.log(group.name);
      for (const day of weekday) {
        console.log(
          `   ${day} ${group
            .getCounselorsOn(day)
            .map((counselor) => counselor.name)
            .join(",")}`
        );
      }
    }
  }
})();
*/
