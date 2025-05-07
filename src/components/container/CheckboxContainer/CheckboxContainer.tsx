import "./CheckboxContainer.scss";
import { OptionEnum } from "@/globals/constants/OptionEnum.ts";
import Checkbox from "@/components/atoms/Checkbox/Checkbox.tsx";
import Label from "@/components/atoms/Label/Label.tsx";
import { LabelTypeEnum } from "@/globals/constants/LabelTypeEnum.ts";
import React, { useRef } from "react";
import useKeyClickBypass from "@/hooks/useKeyClickBypass.ts";
import useBlurOnPointerUp from "@/hooks/useBlurOnPointerUp.ts";

export interface CheckboxContainerProps {
  option: OptionEnum;
  isChecked: boolean;
  handleOptionClick: () => void;
}

const CheckboxContainer: React.FC<CheckboxContainerProps> = ({
  option,
  isChecked,
  handleOptionClick,
}: CheckboxContainerProps) => {
  const divRef: React.RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);
  const { handleClick, handleKeyDown } = useKeyClickBypass(handleOptionClick);
  const handlePointerUp = useBlurOnPointerUp(divRef);

  return (
    <div
      ref={divRef}
      className="checkboxContainer"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) =>
        handleKeyDown(event)
      }
      onMouseDown={handlePointerUp}
    >
      <Checkbox isChecked={isChecked} />
      <Label type={LabelTypeEnum.CHECKBOX_LABEL} text={option} />
    </div>
  );
};

export default CheckboxContainer;
