from enum import Enum
import random
from random import shuffle
import json
class Weekday(Enum):
    MONDAY = 1
    TUESDAY = 2
    WEDNESDAY = 3
    THURSDAY = 4

class Group:
    def __init__(self, name: str, days: list[Weekday], minCounselors: int):
        self.name = name
        self.days = days
        self.minCounselors = minCounselors
        self.memberCounselors = []
    
    def has_minimum(self, day):
        # If the group doesn't apply to the given day, 
        # it doesn't need any counselors. EG: If it's Tuesday, 
        # and we want to know if the Monday session group has 
        # enough people, yes. yes it does
        if day not in self.days:
            return True
        
        count = 0
        for counselor in self.memberCounselors:
            if counselor.is_on(day):
                count+=1
        return count >= self.minCounselors

    def get_counselors_off(self, day):
        return [counselor for counselor in self.memberCounselors if not counselor.is_on(day)]
    
    def get_counselor_ratio(self, day):
        return minCounselors / self.get_counselors_off(day)

    def add_counselor(self, counselor):
        self.memberCounselors.append(counselor)
class Counselor:
    def __init__(self, name):
        self.name = name
        self.days_on = {
            Weekday.MONDAY : False,
            Weekday.TUESDAY: False,
            Weekday.WEDNESDAY: False,
            Weekday.THURSDAY: False
        }
        self.groups = []
    def add_group(self, group): 
        self.groups.append(group)
    
    def is_on(self, day):
        return self.days_on[day]
    
    def set_on(self, day, is_on):
        self.days_on[day] = is_on

        # The counselor is working every day this week!
        if is_on and all(self.days_on.values()):
            return False
        return True
    def can_work_another_day(self):
        if self.name == "Volunteer":
            return True
        count = 0
        for day in Weekday:
            if not self.is_on(day): 
                count+= 1
        return count > 1
    def get_days_off(self):
        off = []
        for day, is_on in self.days_on.items():
            if not is_on: 
                off.append(day)
        return off
    def set_all_days_off(self):
        for day in self.days_on.keys():
            self.days_on[day] = False
def add_counselor_to_group(counselor, group):
    counselor.add_group(group)
    group.add_counselor(counselor)

#counselors = [Counselor("Justin Forseth"), Counselor("Jack Holy"), Counselor("Amy Tekverk"), Counselor("Luke Ostberg"), Counselor("Kara Donahue")]
#groups = [Group("Monday Session", [Weekday.MONDAY],2), Group("Tuesday Session",[Weekday.TUESDAY],2), Group("Some random thing", [Weekday.MONDAY, Weekday.TUESDAY, Weekday.WEDNESDAY, Weekday.THURSDAY], 3)]
#add_counselor_to_group(counselors[0], groups[0])
#add_counselor_to_group(counselors[1], groups[0])
#add_counselor_to_group(counselors[2], groups[1])
#add_counselor_to_group(counselors[3], groups[1])
#add_counselor_to_group(counselors[0], groups[2])
#add_counselor_to_group(counselors[1], groups[2])
#add_counselor_to_group(counselors[2], groups[2])
#add_counselor_to_group(counselors[3], groups[2])
#add_counselor_to_group(counselors[4], groups[2])
TRIES = 1
def solve(groups,counselors):
    for day in Weekday:
        for group in groups: 
            while not group.has_minimum(day):
                if len(group.get_counselors_off(day)) > 0: 
                    for counselor in group.get_counselors_off(day):
                        if (counselor.can_work_another_day()):
                            counselor.set_on(day, True)
                            break
                        else:
                            print(f"Not enough counselors for {group.name} on {day.name}")
                            return False
                else:
                    print(f"Not enough counselors for {group.name} on {day.name}")
                    return False
        groups=sorted(groups, key= lambda g: g.get_counselor_ratio())
    for day in Weekday:
        if all(counselor.is_on(day) for counselor in counselors):
            print(f"No one off on {day.name}")
            return False
                
    for counselor in counselors:
        while len(counselor.get_days_off()) > 1:
            counselor.set_on(random.choice(counselor.get_days_off()), True)
    return tuple([(counselor.name, [day.name for day in counselor.get_days_off()][0]) for counselor in counselors])
if __name__ == "__main__":
    with open("groups.json", "r") as file: 
        groups_json=json.loads(file.read())
    groups = []
    counselors = []
    for group_json in groups_json:
        group = Group(group_json["name"],[Weekday[day] for day in group_json["days"]],group_json["minCounselors"])
        for counselor_name in group_json["counselors"]:
            counselor_exists = False
            for counselor_i in counselors:
                if counselor_i.name == counselor_name: 
                    counselor_exists = True
                    counselor = counselor_i
            if not counselor_exists:
                counselor = Counselor(counselor_name)
                counselors.append(counselor)
            add_counselor_to_group(counselor, group)

    solutions = []
    for i in range(TRIES):
        shuffle(counselors)
        shuffle(groups)
        for counselor in counselors: 
            counselor.set_all_days_off()
        solution = solve(groups, counselors)
        if(solution):
            solution = tuple(sorted(solution, key=lambda x: x[1]))
            solutions.append(solution)
    solutions = list(set(solutions))
    for solution in solutions:
        print("Possible days off:")    
        print("==================")
        
        for name, days_on in solution: 
            print(name, days_on)
        print("")
