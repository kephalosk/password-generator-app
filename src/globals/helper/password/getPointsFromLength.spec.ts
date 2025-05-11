import getPointsFromLength from "@/globals/helper/password/getPointsFromLength.ts";

describe("getPointsFromLength function", (): void => {
  it.each([
    [0, ""],
    [1, "1234"],
    [2, "12345678"],
    [3, "12345678910111213141516"],
  ])(
    "returns %s points for length of %s",
    (points: number, password: string): void => {
      const result: number = getPointsFromLength(password);

      expect(result).toEqual(points);
    },
  );
});
