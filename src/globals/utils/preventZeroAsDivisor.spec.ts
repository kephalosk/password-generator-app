import preventZeroAsDivisor from "@/globals/utils/preventZeroAsDivisor.ts";

describe("preventZeroAsDivisor", (): void => {
  it("returns given value if value does not equal 0", (): void => {
    const testValue: number = 10;

    const result: number = preventZeroAsDivisor(testValue);

    expect(result).toEqual(testValue);
    expect(result).not.toEqual(0);
  });

  it("returns 1 if given value equals 0", (): void => {
    const testValue: number = 0;

    const result: number = preventZeroAsDivisor(testValue);

    expect(result).toEqual(1);
  });
});
