import "./SliderBarValue.scss";
import React, { ReactElement } from "react";

export interface SliderBarValueProps {
  widthPercentage: number;
}

const SliderBarValue: React.FC<SliderBarValueProps> = ({
  widthPercentage,
}: SliderBarValueProps): ReactElement => {
  return (
    <div
      className="sliderBar"
      style={{
        width: `${widthPercentage}%`,
      }}
    ></div>
  );
};

export default SliderBarValue;
