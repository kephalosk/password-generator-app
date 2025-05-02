import { render } from "@testing-library/react";
import SliderBarValue, {
  SliderBarValueProps,
} from "@/components/atoms/Slider/SliderBarValue/SliderBarValue.tsx";

describe("SliderBarValueAdjuster Component", (): void => {
  const widthPercentage: number = 80;

  const setup = (
    propsOverride?: Partial<SliderBarValueProps>,
  ): { container: HTMLElement } => {
    const defaultProps: SliderBarValueProps = {
      widthPercentage,
    };

    const props: SliderBarValueProps = { ...defaultProps, ...propsOverride };
    return render(<SliderBarValue {...props} />);
  };

  it("renders div sliderBarValue", (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".sliderBarValue");

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("style", `width: ${widthPercentage}%;`);
  });
});
