import "./ContentContainer.scss";
import SliderContainer from "@/components/container/SliderContainer/SliderContainer.tsx";
import OptionContainer from "@/components/container/OptionContainer/OptionContainer.tsx";
import StrengthContainer from "@/components/container/StrengthContainer/StrengthContainer.tsx";
import Button from "@/components/atoms/Button/Button.tsx";
import { BUTTON_TEXT } from "@/globals/constants/Constants.ts";

const ContentContainer = () => {
  return (
    <div className="contentContainer">
      <SliderContainer />
      <OptionContainer />
      <StrengthContainer />
      <Button
        text={BUTTON_TEXT}
        handleButtonClick={function (): void {
          console.log("Function not implemented.");
        }}
      />
    </div>
  );
};

export default ContentContainer;
