import { SecurityLevelEnum } from "@/globals/models/enums/SecurityLevelEnum.ts";

const getStrengthLevelFromPoints = (
  strengthPoints: number,
): SecurityLevelEnum => {
  if (strengthPoints <= 0) {
    return SecurityLevelEnum.NONE;
  }
  if (strengthPoints <= 3) {
    return SecurityLevelEnum.WEAK;
  }
  if (strengthPoints <= 4) {
    return SecurityLevelEnum.LOW;
  }
  if (strengthPoints <= 5) {
    return SecurityLevelEnum.MEDIUM;
  }
  return SecurityLevelEnum.STRONG;
};

export default getStrengthLevelFromPoints;
