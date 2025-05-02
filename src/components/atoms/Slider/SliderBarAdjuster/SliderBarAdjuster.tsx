import "./SliderBarAdjuster.scss";
import React, { ReactElement } from "react";

export interface SliderBarAdjusterProps {
  widthPercentage: number;
}

const SliderBarAdjuster: React.FC<SliderBarAdjusterProps> = ({
  widthPercentage,
}: SliderBarAdjusterProps): ReactElement => {
  return (
    <div
      className="sliderBarAdjuster"
      style={{
        left: `${widthPercentage}%`,
      }}
    ></div>
  );
};

export default SliderBarAdjuster;
