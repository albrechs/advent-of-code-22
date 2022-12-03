import { getDailyInput } from "./helpers";

(async () => {
  let input = await getDailyInput("1");
  let parsedInput = input.split("\n");

  //console.log(input);
  const elves: ElfCalories[] = [];

  while (parsedInput.length > 0) {
    const delimIndex = parsedInput.findIndex((elem) => elem === "");
    const newElfCalArr = parsedInput
      .splice(0, delimIndex + 1)
      .slice(0, -1)
      .map((elem: string) => parseInt(elem));
    elves.push(new ElfCalories(newElfCalArr));
  }
  //console.log(elves);
  elves.sort((a, b) => {
    return b.totalCalories - a.totalCalories;
  });

  console.log(
    `The elf with the most calories is carrying ${elves[0].totalCalories} cals`
  );

  const topThreeTotal = elves
    .slice(0, 3)
    .map((elf) => elf.totalCalories)
    .reduce((next, total) => {
      return next + total;
    }, 0);

  console.log(`The top 3 elves are carrying ${topThreeTotal} cals`);
})();

class ElfCalories {
  items: number[];
  totalCalories: number;

  constructor(items: number[]) {
    this.items = items;
    this.totalCalories = this.getTotalCalories(this.items);
  }

  getTotalCalories(items: number[]): number {
    return items.reduce((nextVal, totalVal) => {
      return nextVal + totalVal;
    }, 0);
  }
}
