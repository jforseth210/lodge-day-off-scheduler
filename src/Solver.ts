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
  balanceExtraOffDays(counselors);
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
// If counselors have multiple days off, have them work on days
// that have the most other counselors off. 
// LLM generated code
function balanceExtraOffDays(counselors: Counselor[]): void {
  // Iterate through each counselor
  for (const counselor of counselors) {
    const daysOff = counselor.getDaysOff();

    // Check if the counselor has more than one day off
    if (daysOff.length > 1) {
      // Count how many counselors are off each day
      const offCounts = countOffDays(counselors);
      console.log("offCounts", offCounts)
      console.log("daysOff", daysOff)
      // Sort days by the number of counselors off (descending)
      daysOff.sort((a, b) => offCounts[b] - offCounts[a]);

      // Set the counselor to be "on" on days with the most other counselors off
      for (let i = 0; i < daysOff.length - 1; i++) {
        counselor.setOn(daysOff[i], true);
      }
    }
  }
}
// Helper function to count how many counselors are off each day
function countOffDays(counselors: Counselor[]): { [key in Weekday]: number } {
  const offCounts = {
    [Weekday.Mon]: 0,
    [Weekday.Tue]: 0,
    [Weekday.Wed]: 0,
    [Weekday.Thur]: 0,
  };

  for (const counselor of counselors) {
    for (const day of counselor.getDaysOff()) {
      offCounts[day]++;
    }
  }

  return offCounts;
}
