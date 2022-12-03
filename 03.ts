import { getDailyInput, sumArray } from "./helpers";

(async () => {
  const input = await getDailyInput("3");
  //console.log(input.split("\n"));
  const parsedInput = input
    .split("\n")
    .filter((line) => line !== undefined && line !== "");

  const priorityArr = parsedInput.map((contents) =>
    getBackpackReorgPriorityScore(contents)
  );
  console.log(
    `the total reorganization priority score is: ${sumArray(priorityArr)}`
  );

  const groupPriorities = getBadgePriorities(parsedInput);
  console.log(
    `the total badge reorg priority score is: ${sumArray(groupPriorities)}`
  );
})();

function getBackpackReorgPriorityScore(content: string): number {
  let priorityScore = 0;
  let sharedItemTypes: string[] = [];

  // split the arr in half
  const contentMidpoint = content.length / 2;
  const compartmentAContents = content.slice(0, contentMidpoint).split("");
  const compartmentBContents = content.slice(contentMidpoint).split("");

  // find any values that appear in both
  compartmentAContents
    .filter((element, position) => {
      return compartmentAContents.indexOf(element) == position;
    })
    .forEach((item) => {
      if (compartmentBContents.includes(item)) {
        sharedItemTypes.push(item);
      }
    });

  if (sharedItemTypes.length > 0) {
    const totalScore = sumArray(
      sharedItemTypes.map((item) => getPriorityScore(item))
    );
    return totalScore;
  } else {
    return 0;
  }
  // sum the priorities
}

function getBadgePriorities(input: string[]): number[] {
  const groupPriorities: number[] = [];
  const badgeGroups: string[][] = [];
  while (input.length > 0) {
    badgeGroups.push(input.splice(0, 3));
  }

  badgeGroups.forEach((group) => {
    // find the common item
    const bagA = group[0].split("");
    const bagB = group[1].split("");
    const bagC = group[2].split("");

    bagA
      .filter((element, position) => {
        return bagA.indexOf(element) == position;
      })
      .forEach((item) => {
        if (bagB.includes(item) && bagC.includes(item)) {
          groupPriorities.push(getPriorityScore(item));
        }
      });
    // push priority score to return arr
  });
  return groupPriorities;
}

function getPriorityScore(item: string): number {
  let score = 0;
  switch (item) {
    case "a": {
      score = 1;
      break;
    }
    case "b": {
      score = 2;
      break;
    }
    case "c": {
      score = 3;
      break;
    }
    case "d": {
      score = 4;
      break;
    }
    case "e": {
      score = 5;
      break;
    }
    case "f": {
      score = 6;
      break;
    }
    case "g": {
      score = 7;
      break;
    }
    case "h": {
      score = 8;
      break;
    }
    case "i": {
      score = 9;
      break;
    }
    case "j": {
      score = 10;
      break;
    }
    case "k": {
      score = 11;
      break;
    }
    case "l": {
      score = 12;
      break;
    }
    case "m": {
      score = 13;
      break;
    }
    case "n": {
      score = 14;
      break;
    }
    case "o": {
      score = 15;
      break;
    }
    case "p": {
      score = 16;
      break;
    }
    case "q": {
      score = 17;
      break;
    }
    case "r": {
      score = 18;
      break;
    }
    case "s": {
      score = 19;
      break;
    }
    case "t": {
      score = 20;
      break;
    }
    case "u": {
      score = 21;
      break;
    }
    case "v": {
      score = 22;
      break;
    }
    case "w": {
      score = 23;
      break;
    }
    case "x": {
      score = 24;
      break;
    }
    case "y": {
      score = 25;
      break;
    }
    case "z": {
      score = 26;
      break;
    }
    case "A": {
      score = 27;
      break;
    }
    case "B": {
      score = 28;
      break;
    }
    case "C": {
      score = 29;
      break;
    }
    case "D": {
      score = 30;
      break;
    }
    case "E": {
      score = 31;
      break;
    }
    case "F": {
      score = 32;
      break;
    }
    case "G": {
      score = 33;
      break;
    }
    case "H": {
      score = 34;
      break;
    }
    case "I": {
      score = 35;
      break;
    }
    case "J": {
      score = 36;
      break;
    }
    case "K": {
      score = 37;
      break;
    }
    case "L": {
      score = 38;
      break;
    }
    case "M": {
      score = 39;
      break;
    }
    case "N": {
      score = 40;
      break;
    }
    case "O": {
      score = 41;
      break;
    }
    case "P": {
      score = 42;
      break;
    }
    case "Q": {
      score = 43;
      break;
    }
    case "R": {
      score = 44;
      break;
    }
    case "S": {
      score = 45;
      break;
    }
    case "T": {
      score = 46;
      break;
    }
    case "U": {
      score = 47;
      break;
    }
    case "V": {
      score = 48;
      break;
    }
    case "W": {
      score = 49;
      break;
    }
    case "X": {
      score = 50;
      break;
    }
    case "Y": {
      score = 51;
      break;
    }
    case "Z": {
      score = 52;
      break;
    }
  }
  return score;
}
