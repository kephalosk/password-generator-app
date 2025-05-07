import "./SliderHeaderContainer.scss";
import React, { ReactElement } from "react";
import Label from "@/components/atoms/Label/Label.tsx";
import { LabelTypeEnum } from "@/globals/constants/LabelTypeEnum.ts";
import { SLIDER_HEADER_LABEL_TEXT } from "@/globals/constants/constants.ts";
import { RootState } from "@/redux/store.ts";
import { useSelector } from "react-redux";

const SliderHeaderContainer: React.FC = (): ReactElement => {
  const characterLength: number = useSelector(
    (state: RootState) => state.characterLength.value,
  );
  const characterLengthString: string = characterLength.toString();

  return (
    <div className="sliderHeaderContainer">
      <span className="sliderHeaderContainerSpace">
        <Label
          type={LabelTypeEnum.HEADER_LABEL}
          text={SLIDER_HEADER_LABEL_TEXT}
        />
      </span>
      <Label type={LabelTypeEnum.NUMBER_LABEL} text={characterLengthString} />
    </div>
  );
};

export default SliderHeaderContainer;
