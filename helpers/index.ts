import { curly } from "node-libcurl";

export async function getDailyInput(day: string): Promise<string> {
  const token = process.env.AOC_TOKEN;
  const response = await curly.get(
    `https://adventofcode.com/2022/day/${day}/input`,
    {
      cookie: `session=${token}`,
    }
  );
  return response.data;
}

export function sumArray(inputArr: number[]): number {
  return inputArr.reduce((next, total) => {
    return next + total;
  }, 0);
}
