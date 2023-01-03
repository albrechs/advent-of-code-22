import { getDailyInput, sumArray } from "./helpers";

(async () => {
  const day = "5";
  // get the day's input
  const input = await getDailyInput(day);

  // parse the day's input
  let [containerStacks, instructions] = parseInput(input);

  // solve q1
  const q1Answer = sortContainerStacks(containerStacks, instructions, "9000");
  console.log(`Day ${day}, Question 1: ${q1Answer}`);

  // solve q2
  const q2Answer = sortContainerStacks(containerStacks, instructions, "9001");
  console.log(`Day ${day}, Question 2: ${q2Answer}`);
})();

type CraneModel = "9000" | "9001";

function sortContainerStacks(
  stacks: CargoHold,
  instructions: ParsedInstruction[],
  crane: CraneModel
): string {
  instructions.forEach((instruction) => {
    /* console.log("---start---");
    console.log(instruction);
    console.log("BEFORE");
    console.log(`from: ${instruction.fromStack}`);
    console.log(stacks[instruction.fromStack]);
    console.log(`to: ${instruction.toStack}`);
    console.log(stacks[instruction.toStack]);
    console.log(""); */

    let containersToMove = stacks[instruction.fromStack].pop(
      instruction.containersToMove
    );

    if (crane === "9000") {
      containersToMove = containersToMove.reverse();
    }

    //console.log(containersToMove);
    stacks[instruction.toStack].push(containersToMove);

    /* console.log("");
    console.log("AFTER");
    console.log(`from: ${instruction.fromStack}`);
    console.log(stacks[instruction.fromStack]);
    console.log(`to: ${instruction.toStack}`);
    console.log(stacks[instruction.toStack]);
    console.log("----end----"); */
  });

  let topContainers: string[] = [];
  Object.keys(stacks).forEach((key) => {
    topContainers.push(stacks[key].containers[0]);
  });

  return topContainers.join("");
}

interface ParsedInstruction {
  containersToMove: number;
  fromStack: number;
  toStack: number;
}

interface CargoHold {
  [key: string]: ContainerStack;
}

class ContainerStack {
  containers: string[] = [];

  push(containers: string[]): void {
    this.containers.splice(0, 0, ...containers);
  }

  pop(number: number): string[] {
    return this.containers.splice(0, number);
  }

  constructor(containers?: string[]) {
    //this.containers: string[] = []
    if (containers) {
      this.push(containers);
    }
  }
}

function parseInput(rawInput: string): [CargoHold, ParsedInstruction[]] {
  const inputArr = rawInput.split("\n");

  const containerStacks = parseCargoHoldInput(
    inputArr.splice(
      0,
      inputArr.findIndex((elem) => elem === "")
    )
  );

  const instructionSet = inputArr
    .filter((instruction) => instruction !== "")
    .map((instruction) => {
      const instructionArr = instruction.split(" ");
      return {
        containersToMove: parseInt(instructionArr[1]),
        fromStack: parseInt(instructionArr[3]),
        toStack: parseInt(instructionArr[5]),
      };
    });
  return [containerStacks, instructionSet];
}

function parseCargoHoldInput(rawInput: string[]): CargoHold {
  const stackCount: string[] = rawInput
    .pop()!
    .split(" ")
    .filter((elem) => elem !== "");

  let cargoHold: CargoHold = {};
  stackCount.forEach((stack) => {
    cargoHold[stack] = new ContainerStack();
  });

  while (rawInput.length > 0) {
    let targetRow = rawInput.pop()!;
    stackCount.forEach((stack) => {
      const stackEntry = targetRow.slice(0, 3);
      targetRow = targetRow.slice(4, targetRow.length);
      if (stackEntry.charAt(0) === "[") {
        cargoHold[stack].push([stackEntry.charAt(1)]);
      }
    });
  }
  return cargoHold;
}
