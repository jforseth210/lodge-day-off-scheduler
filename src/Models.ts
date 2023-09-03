export enum Weekday {
  Mon = "Mon",
  Tue = "Tue",
  Wed = "Wed",
  Thur = "Thur",
}
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
type DayOffDictionary = {
  Mon: boolean;
  Tue: boolean;
  Wed: boolean;
  Thur: boolean;
};
export class Counselor {
  private name: string;
  private visible: boolean;
  private daysOn: { [key: string]: boolean };
  private groups: Array<Group>;
  constructor(name: string) {
    this.name = name;
    this.visible = true;
    this.daysOn = {
      Mon: false,
      Tue: false,
      Wed: false,
      Thur: false,
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
  isOn(day: Weekday): boolean {
    return this.daysOn[day.toString() as keyof DayOffDictionary];
  }

  setOn(day: Weekday, isOn: boolean): boolean {
    this.daysOn[day.toString() as keyof DayOffDictionary] = isOn;

    // The counselor is working every day this week!
    if (isOn && Object.values(this.daysOn).every((value) => value)) {
      return false;
    }
    return true;
  }
  setDaysOn(daysOn: { [key: string]: boolean }) {
    this.daysOn = daysOn;
  }

  canWorkAnotherDay(): boolean {
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

  getDaysOff(): Weekday[] {
    const off: Weekday[] = [];
    for (const [day, isOn] of Object.entries(this.daysOn)) {
      if (!isOn) {
        off.push(Weekday[day as keyof typeof Weekday]);
      }
    }
    return off;
  }
  getDaysOn(): Weekday[] {
    const off: Weekday[] = [];
    for (const [day, isOn] of Object.entries(this.daysOn)) {
      if (isOn) {
        off.push(Weekday[day as keyof typeof Weekday]);
      }
    }
    return off;
  }

  setAllDaysOff(): void {
    for (const day in this.daysOn) {
      this.daysOn[day as keyof DayOffDictionary] = false;
    }
  }
  clone(): Counselor {
    const myClone = new Counselor(this.name);
    myClone.setVisibility(this.visible);
    myClone.setDaysOn(this.daysOn);
    myClone.setGroups(this.groups);
    return myClone;
  }
}
