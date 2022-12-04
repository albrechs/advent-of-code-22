import { getDailyInput, sumArray } from "./helpers";

(async () => {
  const day = "4";
  // get the day's input
  const input = await getDailyInput(day);

  // parse the day's input
  const parsedInput = input
    .split("\n")
    .filter((line) => line !== undefined && line !== "")
    .map((group) => parseAssignments(group));
  // console.log(parsedInput);

  // solve q1
  const q1Answer = countOverlappingAssignments(parsedInput, "total");
  console.log(`Day ${day}, Question 1: ${q1Answer}`);

  // solve q2
  const q2Answer = countOverlappingAssignments(parsedInput, "partial");
  console.log(`Day ${day}, Question 2: ${q2Answer}`);
})();

type Overlap = "partial" | "total";

// q1 main function
function countOverlappingAssignments(
  assignments: AssignmentGroup[],
  overlap: Overlap
): number {
  let overlappingCount = 0;

  assignments.forEach((assignment) => {
    const sorted = assignment.sort((a, b) => {
      return a.size - b.size;
    });
    const smaller = sorted[0];
    const larger = sorted[1];

    switch (overlap) {
      case "total": {
        if (checkForTotalOverlap(smaller, larger)) {
          overlappingCount++;
        }
        break;
      }
      case "partial": {
        if (checkForPartialOverlap(smaller, larger)) {
          overlappingCount++;
        }
        break;
      }
    }
  });

  return overlappingCount;
}

function checkForTotalOverlap(
  smaller: Assignment,
  larger: Assignment
): boolean {
  if (smaller.start >= larger.start && smaller.end <= larger.end) {
    return true;
  } else {
    return false;
  }
}

function checkForPartialOverlap(
  smaller: Assignment,
  larger: Assignment
): boolean {
  if (
    (smaller.start <= larger.start && smaller.end >= larger.start) ||
    (smaller.start <= larger.end && smaller.end >= larger.end) ||
    (smaller.start >= larger.start && smaller.end <= larger.end)
  ) {
    return true;
  } else {
    return false;
  }
}

function parseAssignments(assignmentGroup: string): AssignmentGroup {
  const splitGroup = assignmentGroup.split(",");
  return [new Assignment(splitGroup[0]), new Assignment(splitGroup[1])];
}

type AssignmentGroup = [Assignment, Assignment];

class Assignment {
  start: number;
  end: number;
  size: number;

  constructor(rawAssignment: string) {
    const parsed = rawAssignment.split("-");
    this.start = parseInt(parsed[0]);
    this.end = parseInt(parsed[1]);
    this.size = this.end - this.start;
  }
}
