import "./SliderContainer.scss";
import React, { ReactElement } from "react";
import SliderHeaderContainer from "@/components/container/SliderHeaderContainer/SliderHeaderContainer.tsx";
import SliderBarContainer from "@/components/container/SliderBarContainer/SliderBarContainer.tsx";

const SliderContainer: React.FC = (): ReactElement => {
  return (
    <div className="sliderContainer">
      <SliderHeaderContainer />
      <SliderBarContainer />
    </div>
  );
};

export default SliderContainer;
