import { SecurityLevelEnum } from "@/globals/constants/SecurityLevelEnum.ts";
import { BeamColorEnum } from "@/globals/constants/BeamColorEnum.ts";

const getBeamColorFromSecurityLevel = (
  securityLevel: SecurityLevelEnum,
): BeamColorEnum => {
  switch (securityLevel) {
    case SecurityLevelEnum.NONE:
      return BeamColorEnum.TRANSPARENT;
    case SecurityLevelEnum.WEAK:
      return BeamColorEnum.RED;
    case SecurityLevelEnum.LOW:
      return BeamColorEnum.ORANGE;
    case SecurityLevelEnum.MEDIUM:
      return BeamColorEnum.YELLOW;
    case SecurityLevelEnum.STRONG:
      return BeamColorEnum.GREEN;
  }
};

export default getBeamColorFromSecurityLevel;
