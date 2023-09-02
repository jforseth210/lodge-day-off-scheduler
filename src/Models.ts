export enum Weekday {
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
}
type ValueOfWeekday = `${Weekday}`;
type DayOnDictionary = {
  [P in ValueOfWeekday]: boolean;
};
export class Group {
  private name: string;
  private minCounselors: number;
  private days: Weekday[];
  private memberCounselors: Counselor[];
  constructor(name: string, days: Weekday[], minCounselors: number) {
    this.name = name;
    this.days = days;
    this.minCounselors = minCounselors;
    this.memberCounselors = [];
  }
  hasMinimum(day: Weekday) {
    // If the group doesn't apply to the given day,
    // it doesn't need any counselors. For example, if it's Tuesday,
    // and we want to know if the Monday session group has
    // enough people, the answer is yes.
    if (!this.days.includes(day)) {
      return true;
    }

    let count = 0;
    for (const counselor of this.memberCounselors) {
      if (counselor.isOn(day)) {
        count++;
      }
    }
    return count >= this.minCounselors;
  }
  getName() {
    return this.name;
  }
  getMemberCounselors() {
    return this.memberCounselors;
  }
  setMemberCounselors(counselors: Counselor[]) {
    this.memberCounselors = counselors;
  }
  clearMemberCounselors() {
    this.memberCounselors = [];
  }

  getCounselorsOff(day: Weekday) {
    return this.memberCounselors.filter((counselor) => !counselor.isOn(day));
  }
  getCounselorsOn(day: Weekday) {
    return this.memberCounselors.filter((counselor) => counselor.isOn(day));
  }
  getCounselorRatio(day: Weekday) {
    return this.minCounselors / this.getCounselorsOff(day).length;
  }
  getDays() {
    return this.days;
  }
  getMinCounselors() {
    return this.minCounselors;
  }

  addCounselor(counselor: Counselor) {
    this.memberCounselors.push(counselor);
  }
  clone() {
    const myClone = new Group(this.name, this.days, this.minCounselors);
    myClone.setMemberCounselors(this.getMemberCounselors());
    return myClone;
  }
}
export class Counselor {
  private name: string;
  private visible: boolean;
  private daysOn: DayOnDictionary;
  private groups: Array<Group>;
  constructor(name: string) {
    this.name = name;
    this.visible = true;
    this.daysOn = {
      [Weekday.MONDAY]: false,
      [Weekday.TUESDAY]: false,
      [Weekday.WEDNESDAY]: false,
      [Weekday.THURSDAY]: false,
    };
    this.groups = [];
  }
  getGroups() {
    return this.groups;
  }
  setGroups(groups: Group[]) {
    this.groups = groups;
  }
  addGroup(group: Group) {
    this.groups.push(group);
  }
  clearGroups() {
    this.groups = [];
  }
  getVisibility() {
    return this.visible;
  }
  setVisibility(visible: boolean) {
    this.visible = visible;
  }
  getName() {
    return this.name;
  }
  isOn(day: Weekday) {
    return this.daysOn[day];
  }

  setOn(day: Weekday, isOn: boolean) {
    this.daysOn[day] = isOn;

    // The counselor is working every day this week!
    if (isOn && Object.values(this.daysOn).every((value) => value)) {
      return false;
    }
    return true;
  }
  setDaysOn(daysOn: DayOnDictionary) {
    this.daysOn = daysOn;
  }

  canWorkAnotherDay() {
    if (this.name === "Volunteer") {
      return true;
    }
    let count = 0;
    for (const day in this.daysOn) {
      if (!this.isOn(Weekday[day as keyof typeof Weekday])) {
        count++;
      }
    }
    return count > 1;
  }

  getDaysOff() {
    const off: Weekday[] = [];
    for (const [day, isOn] of Object.entries(this.daysOn)) {
      if (!isOn) {
        off.push(Weekday[day as keyof typeof Weekday]);
      }
    }
    return off;
  }

  setAllDaysOff() {
    for (const day in this.daysOn) {
      const weekdayDay: Weekday = Weekday[day as keyof typeof Weekday];
      this.daysOn[weekdayDay] = false;
    }
  }
  clone() {
    const myClone = new Counselor(this.name);
    myClone.setVisibility(this.visible);
    myClone.setDaysOn(this.daysOn);
    myClone.setGroups(this.groups);
    return myClone;
  }
}
