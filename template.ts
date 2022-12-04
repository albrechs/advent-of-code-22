import { getDailyInput, sumArray } from "./helpers";

const day = ""

(async () => {
  // get the day's input
  const input = await getDailyInput(day);

  // parse the day's input
  const parsedInput = input.split("\n");

  // solve q1
  console.log(
    `Day ${day}, Question 1: ${}`
  );

  // solve q2
  console.log(
    `Day ${day}, Question 2: ${}`
  );
})();
