import "./SliderBarContainer.scss";
import React, { ReactElement } from "react";
import SliderBar from "@/components/atoms/Slider/SliderBar/SliderBar.tsx";
import SliderBarValue from "@/components/atoms/Slider/SliderBarValue/SliderBarValue.tsx";
import SliderBarAdjuster from "@/components/atoms/Slider/SliderBarAdjuster/SliderBarAdjuster.tsx";

const SliderBarContainer: React.FC = (): ReactElement => {
  return (
    <div className="sliderBarContainer">
      <SliderBar>
        <span className="sliderBarContainerValue">
          <SliderBarValue widthPercentage={50} />
        </span>
        <span className="sliderBarContainerAdjuster">
          <SliderBarAdjuster widthPercentage={50} />
        </span>
      </SliderBar>
    </div>
  );
};

export default SliderBarContainer;
