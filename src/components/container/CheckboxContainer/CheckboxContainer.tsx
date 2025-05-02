import "./CheckboxContainer.scss";
import { OptionEnum } from "@/globals/constants/OptionEnum.ts";
import Checkbox from "@/components/atoms/Checkbox/Checkbox.tsx";
import Label from "@/components/atoms/Label/Label.tsx";
import { LabelTypeEnum } from "@/globals/constants/LabelTypeEnum.ts";
import React from "react";

export interface CheckboxContainerProps {
  option: OptionEnum;
  isChecked: boolean;
}

const CheckboxContainer: React.FC<CheckboxContainerProps> = ({
  option,
  isChecked,
}: CheckboxContainerProps) => {
  return (
    <div className="checkboxContainer">
      <Checkbox isChecked={isChecked} />
      <Label type={LabelTypeEnum.CHECKBOX_LABEL} text={option} />
    </div>
  );
};

export default CheckboxContainer;
