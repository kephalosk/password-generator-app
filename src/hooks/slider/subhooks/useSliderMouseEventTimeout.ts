import { useCallback, useState } from "react";
import { SliderMouseTimeoutHook } from "@/globals/types/SliderMouseTypes.ts";

const useSliderMouseEventTimeout = (): SliderMouseTimeoutHook => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const clearTimeoutId = useCallback((): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }, [timeoutId]);

  return { setTimeoutId, clearTimeoutId };
};

export default useSliderMouseEventTimeout;
