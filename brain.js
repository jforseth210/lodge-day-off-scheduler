groups = [
  {
    name: "Mon Prayer",
    days: ["Mon"],
    counselors: ["Lily K"],
    minCounselors: 1,
  },
  {
    name: "Tues Prayer",
    days: ["Tue"],
    counselors: ["Justin"],
    minCounselors: 1,
  },
  {
    name: "Wed Prayer",
    days: ["Wed"],
    counselors: ["Kara"],
    minCounselors: 1,
  },
  {
    name: "Thurs Prayer",
    days: ["Thurs"],
    counselors: ["Luke"],
    minCounselors: 1,
  },
  {
    name: "SG 1",
    days: ["Mon", "Tue", "Wed", "Thur"],
    counselors: ["Mason", "Grace H"],
    minCounselors: 1,
  },
  {
    name: "SG 2",
    days: ["Mon", "Tue", "Wed", "Thur"],
    counselors: ["Kyley", "Asher"],
    minCounselors: 1,
  },
  {
    name: "SG 3",
    days: ["Mon", "Tue", "Wed", "Thur"],
    counselors: ["Ryan", "Lily T"],
    minCounselors: 1,
  },
  {
    name: "SG 4",
    days: ["Mon", "Tue", "Wed", "Thur"],
    counselors: ["Jack S", "Kara"],
    minCounselors: 1,
  },
  {
    name: "SG 5",
    days: ["Mon", "Tue", "Wed", "Thur"],
    counselors: ["Jack H", "Becca"],
    minCounselors: 1,
  },
  {
    name: "SG 6",
    days: ["Mon", "Tue", "Wed", "Thur"],
    counselors: ["Luke", "Grace K"],
    minCounselors: 1,
  },
  {
    name: "SG 7",
    days: ["Mon", "Tue", "Wed", "Thur"],
    counselors: ["Jack M", "Lily K"],
    minCounselors: 1,
  },
  {
    name: "SG 8",
    days: ["Mon", "Tue", "Wed", "Thur"],
    counselors: ["Mike", "Vanessa"],
    minCounselors: 1,
  },
  {
    name: "SG 9",
    days: ["Mon", "Tue", "Wed", "Thur"],
    counselors: ["Justin", "Amy"],
    minCounselors: 1,
  },
  {
    name: "Bear",
    days: ["Mon", "Tue", "Wed", "Thur"],
    counselors: ["Kara", "Kyley", "Amy", "Becca", "Grace H"],
    minCounselors: 2,
  },
  {
    name: "Wildcat",
    days: ["Mon", "Tue", "Wed", "Thur"],
    counselors: ["Grace K", "Vanessa", "Lily K", "Lily T"],
    minCounselors: 2,
  },
  {
    name: "Coyote",
    days: ["Mon", "Tue", "Wed", "Thur"],
    counselors: ["Mason", "Jack S", "Mike"],
    minCounselors: 2,
  },
  {
    name: "Goat's Nest",
    days: ["Mon", "Tue", "Wed", "Thur"],
    counselors: ["Asher", "Jack H", "Justin"],
    minCounselors: 2,
  },
  {
    name: "Chipmunk",
    days: ["Mon", "Tue", "Wed", "Thur"],
    counselors: ["Ryan", "Luke", "Jack M"],
    minCounselors: 2,
  },
];
counselors = [
  { name: "Mason", mon: false, tues: false, weds: false, thurs: false },
  { name: "Grace H", mon: false, tues: false, weds: false, thurs: false },
  { name: "Asher", mon: false, tues: false, weds: false, thurs: false },
  { name: "Kyley", mon: false, tues: false, weds: false, thurs: false },
  { name: "Ryan", mon: false, tues: false, weds: false, thurs: false },
  { name: "Lily T", mon: false, tues: false, weds: false, thurs: false },
  { name: "Jack S", mon: false, tues: false, weds: false, thurs: false },
  { name: "Kara", mon: false, tues: false, weds: false, thurs: false },
  { name: "Jack H", mon: false, tues: false, weds: false, thurs: false },
  { name: "Becca", mon: false, tues: false, weds: false, thurs: false },
  { name: "Luke", mon: false, tues: false, weds: false, thurs: false },
  { name: "Grace K", mon: false, tues: false, weds: false, thurs: false },
  { name: "Jack M", mon: false, tues: false, weds: false, thurs: false },
  { name: "Lily K", mon: false, tues: false, weds: false, thurs: false },
  { name: "Mike", mon: false, tues: false, weds: false, thurs: false },
  { name: "Vanessa", mon: false, tues: false, weds: false, thurs: false },
  { name: "Justin", mon: false, tues: false, weds: false, thurs: false },
  { name: "Amy", mon: false, tues: false, weds: false, thurs: false },
];
function determineDaysOff() {
  for (let i = 0; i < days.length; i++) {
    const day = days[i];
    for (let j = 0; j < groups.length; j++) {
      const group = groups[j];
      if (!hasEnough(group, day)) {
        // Something something recursion
      }
    }
  }
}
function hasEnough(group, day) {
  counter = 0;
  for (let i = 0; i < group.counselors.length; i++) {
    const counselor = group.counselors[i];
    if (counselor[day]) {
      counter++;
    }
    if (counter >= group.minCounselors) {
      return true;
    }
  }
  return false;
}
function availableCounselors() {}
determineDaysOff();
