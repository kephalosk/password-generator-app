import { SecurityLevelEnum } from "@/globals/models/enums/SecurityLevelEnum.ts";
import getStrengthLevelFromPoints from "@/globals/helper/password/getStrengthLevelFromPossibilities.ts";

describe("getStrengthLevelFromPoints function", (): void => {
  it.each([
    [SecurityLevelEnum.NONE, 0],
    [SecurityLevelEnum.WEAK, 1],
    [SecurityLevelEnum.WEAK, 2],
    [SecurityLevelEnum.WEAK, 3],
    [SecurityLevelEnum.LOW, 4],
    [SecurityLevelEnum.MEDIUM, 5],
    [SecurityLevelEnum.STRONG, 6],
  ])(
    "returns Securitylevel %s for %s points",
    (level: SecurityLevelEnum, points: number): void => {
      const result: SecurityLevelEnum = getStrengthLevelFromPoints(points);

      expect(result).toEqual(level);
    },
  );
});
