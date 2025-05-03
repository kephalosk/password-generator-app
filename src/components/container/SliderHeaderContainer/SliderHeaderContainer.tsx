import "./SliderBarContainer.scss";
import React, { ReactElement } from "react";
import Label from "@/components/atoms/Label/Label.tsx";
import { LabelTypeEnum } from "@/globals/constants/LabelTypeEnum.ts";
import {
  SLIDER_HEADER_LABEL_TEXT,
  ZERO_LABEL_TEXT,
} from "@/globals/constants/constants.ts";

const SliderHeaderContainer: React.FC = (): ReactElement => {
  return (
    <div className="sliderHeaderContainer">
      <span className="sliderHeaderContainerSpace">
        <Label
          type={LabelTypeEnum.HEADER_LABEL}
          text={SLIDER_HEADER_LABEL_TEXT}
        />
      </span>
      <Label type={LabelTypeEnum.NUMBER_LABEL} text={ZERO_LABEL_TEXT} />
    </div>
  );
};

export default SliderHeaderContainer;
