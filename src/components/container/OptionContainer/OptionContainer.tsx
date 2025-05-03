import "./OptionContainer.scss";
import { OptionItem } from "@/globals/constants/OptionItems.ts";
import CheckboxContainer from "@/components/container/CheckboxContainer/CheckboxContainer.tsx";
import { ReactElement } from "react";
import useCurrentOptions from "@/hooks/useCurrentOptions.ts";

const OptionContainer = () => {
  const { currentOptions } = useCurrentOptions();

  return (
    <div className="optionContainer">
      {currentOptions.map((option: OptionItem, index: number): ReactElement => {
        return (
          <CheckboxContainer
            key={index}
            option={option.option}
            isChecked={option.isChecked}
          />
        );
      })}
    </div>
  );
};

export default OptionContainer;
