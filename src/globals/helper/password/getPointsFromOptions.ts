import {
  OptionItems,
  optionToCharacters,
} from "@/globals/constants/OptionItems.ts";

const getPointsFromOptions = (password: string): number => {
  if (!password) {
    return 0;
  }

  let points: number = 0;

  for (const option of OptionItems) {
    const characters: string = optionToCharacters[option.option];
    if (
      characters
        .split("")
        .some((char: string): boolean => password.includes(char))
    ) {
      points += 1;
    }
  }

  return points;
};

export default getPointsFromOptions;
