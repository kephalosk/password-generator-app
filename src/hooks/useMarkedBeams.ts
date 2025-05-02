import { SecurityLevelEnum } from "@/globals/constants/SecurityLevelEnum.ts";
import { useCallback } from "react";
import { BeamItem, BeamItems } from "@/globals/constants/BeamItems.ts";
import { BeamColorEnum } from "@/globals/constants/BeamColorEnum.ts";
import getBeamColorFromSecurityLevel from "@/globals/helper/getBeamColorFromSecurityLevel.ts";

const useMarkedBeams = (
  securityLevel: SecurityLevelEnum,
): { beams: BeamItem[] } => {
  const getBeamsBySecurityLevel = useCallback((): BeamItem[] => {
    const beams: BeamItem[] = [...BeamItems];
    const color: BeamColorEnum = getBeamColorFromSecurityLevel(securityLevel);

    return beams.map((beam: BeamItem): BeamItem => {
      if (beam.index <= securityLevel) {
        return { ...beam, color };
      }
      return beam;
    });
  }, [securityLevel]);

  return { beams: getBeamsBySecurityLevel() };
};

export default useMarkedBeams;
