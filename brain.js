const weekday = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY"];

const getRandomElement = (array) =>
  array[Math.floor(Math.random() * array.length)];

function solve(groups, counselors) {
  for (const day of weekday) {
    for (const group of groups) {
      while (!group.hasMinimum(day)) {
        const counselorsOff = group.getCounselorsOff(day);
        if (counselorsOff.length > 0) {
          let addedSomeone = false;
          for (const counselor of counselorsOff) {
            if (counselor.canWorkAnotherDay()) {
              counselor.setOn(day, true);
              addedSomeone = true;
              break;
            }
          }
          if (!addedSomeone) {
            console.log(`Not enough counselors for ${group.name} on ${day}`);
            return false;
          }
        } else {
          console.log(`Not enough counselors for ${group.name} on ${day}`);
          return false;
        }
      }
      console.log(`Solved: ${day}`);
    }
    groups.sort((a, b) => a.getCounselorRatio(day) - b.getCounselorRatio(day));
  }

  for (const day in weekday) {
    if (counselors.every((counselor) => counselor.isOn(day))) {
      console.log(`No one off on ${day}`);
      return false;
    }
  }

  for (const counselor of counselors) {
    while (counselor.getDaysOff().length > 1) {
      counselor.setOn(getRandomElement(counselor.getDaysOff()), true);
    }
  }

  const result = [];
  for (const counselor of counselors) {
    result.push([counselor.name, counselor.getDaysOff()[0]]);
  }
  return result;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
async function fetchGroupsJson() {
  const response = await fetch("groups.json");
  const groupsJson = await response.json();
  return groupsJson;
}
function addCounselorToGroup(counselor, group) {
  counselor.addGroup(group);
  group.addCounselor(counselor);
}
(async () => {
  const groupsJson = await fetchGroupsJson();
  const groups = [];
  const counselors = [];

  for (const groupJson of groupsJson) {
    const group = new Group(
      groupJson.name,
      groupJson.days,
      groupJson.minCounselors
    );

    for (const counselorName of groupJson.counselors) {
      let counselor = counselors.find(
        (counselor) => counselor.name === counselorName
      );

      if (!counselor) {
        counselor = new Counselor(counselorName);
        counselors.push(counselor);
      }

      addCounselorToGroup(counselor, group);
    }

    groups.push(group);
  }

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
