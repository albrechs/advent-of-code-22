import { getDailyInput, sumArray } from "./helpers";

(async () => {
  let input = await getDailyInput("2");
  //console.log(input.split("\n"));
  let parsedInput = input
    .split("\n")
    .slice(0, -1)
    .map((entry) => entry.split(" ")) as Array<[InstructionA, InstructionB]>;

  const roundScores = parsedInput.map((round) => scoreRound(round));
  console.log(
    `The total score if all goes to plan is: ${sumArray(roundScores)} `
  );

  const realRoundScores = parsedInput.map((round) =>
    scoreRoundRealCipher(round)
  );
  console.log(
    `The total score with the real cipher is: ${sumArray(realRoundScores)} `
  );
})();

// A = Rock
// B = Paper
// C = Scissors

// Loss = 0
// Draw = 3
// Win = 6

type InstructionA = "A" | "B" | "C";
type InstructionB = "X" | "Y" | "Z";
type RoundOutcome = "win" | "lose" | "draw";

function scoreRound(throws: string[]): number {
  const opponnentThrow = throws[0];
  const recThrow = throws[1];

  let score = 0;

  switch (recThrow) {
    // rock
    case "X": {
      score += 1;
      switch (opponnentThrow) {
        // win case
        case "C": {
          score += 6;
          break;
        }
        // draw case
        case "A": {
          score += 3;
          break;
        }
        default: {
          break;
        }
      }
      break;
    }
    // paper
    case "Y": {
      score += 2;
      switch (opponnentThrow) {
        // win case
        case "A": {
          score += 6;
          break;
        }
        // draw case
        case "B": {
          score += 3;
          break;
        }
        default: {
          break;
        }
      }
      break;
    }
    // scissors
    case "Z": {
      score += 3;
      switch (opponnentThrow) {
        // win case
        case "B": {
          score += 6;
          break;
        }
        // draw case
        case "C": {
          score += 3;
          break;
        }
        default: {
          break;
        }
      }
      break;
    }
    default: {
      throw new Error(`Unrecognized throw: ${recThrow}`);
    }
  }

  return score;
}

// X = lose
// Y = Draw
// Z = Win

function scoreRoundRealCipher(throws: [InstructionA, InstructionB]): number {
  const opponnentThrow = throws[0];
  const recOutcome = throws[1];
  let score = 0;

  switch (recOutcome) {
    // lose
    case "X": {
      score += getRecommendedThrowScore(opponnentThrow, "lose");
      break;
    }
    // draw
    case "Y": {
      score += getRecommendedThrowScore(opponnentThrow, "draw");
      break;
    }
    // win
    case "Z": {
      score += getRecommendedThrowScore(opponnentThrow, "win");
      break;
    }
    default: {
      throw new Error(`Unrecognized outcome: ${recOutcome}`);
    }
  }

  return score;
}

function getRecommendedThrowScore(
  opponnentThrow: InstructionA,
  outcome: RoundOutcome
): number {
  let thrown: string;
  let score = 0;
  switch (outcome) {
    case "win": {
      score += 6;
      switch (opponnentThrow) {
        case "A": {
          thrown = "paper";
          break;
        }
        case "B": {
          thrown = "scissors";
          break;
        }
        case "C": {
          thrown = "rock";
          break;
        }
      }
      break;
    }
    case "lose": {
      switch (opponnentThrow) {
        case "A": {
          thrown = "scissors";
          break;
        }
        case "B": {
          thrown = "rock";
          break;
        }
        case "C": {
          thrown = "paper";
          break;
        }
      }
      break;
    }
    case "draw": {
      score += 3;
      switch (opponnentThrow) {
        case "A": {
          thrown = "rock";
          break;
        }
        case "B": {
          thrown = "paper";
          break;
        }
        case "C": {
          thrown = "scissors";
          break;
        }
      }
      break;
    }
  }

  switch (thrown) {
    case "rock": {
      score += 1;
      break;
    }
    case "paper": {
      score += 2;
      break;
    }
    case "scissors": {
      score += 3;
      break;
    }
  }
  return score;
}
