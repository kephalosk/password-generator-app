import React from "react";

export type SliderMouseUpdateHook = {
  updatePosition: (event: MouseEvent | React.MouseEvent) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
};
