import { EMPTY_STRING } from "@/globals/constants/Constants.ts";
import {
  LOWERCASE_LETTERS,
  NUMBERS,
  SYMBOLS,
  UPPERCASE_LETTERS,
} from "@/globals/constants/Characters.ts";
import getPointsFromOptions from "@/globals/helper/password/getPointsFromOptions.ts";

describe("getPointsFromOptions function", (): void => {
  const passwordWith1Option: string = `${UPPERCASE_LETTERS.at(0)}`;
  const passwordWith2Options: string = `${UPPERCASE_LETTERS.at(0)}${LOWERCASE_LETTERS.at(0)}`;
  const passwordWith3Options: string = `${UPPERCASE_LETTERS.at(0)}${LOWERCASE_LETTERS.at(0)}${NUMBERS.at(0)}`;
  const passwordWith4Options: string = `${UPPERCASE_LETTERS.at(0)}${LOWERCASE_LETTERS.at(0)}${NUMBERS.at(0)}${SYMBOLS.at(0)}`;

  it.each([
    [0, EMPTY_STRING],
    [1, passwordWith1Option],
    [2, passwordWith2Options],
    [3, passwordWith3Options],
    [4, passwordWith4Options],
  ])(
    "returns %s points for %s options",
    (points: number, password: string): void => {
      const result: number = getPointsFromOptions(password);

      expect(result).toEqual(points);
    },
  );
});
