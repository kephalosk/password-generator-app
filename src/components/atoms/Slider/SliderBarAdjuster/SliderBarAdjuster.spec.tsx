import { render } from "@testing-library/react";
import SliderBarAdjuster, {
  SliderBarAdjusterProps,
} from "@/components/atoms/Slider/SliderBarAdjuster/SliderBarAdjuster.tsx";

describe("SliderBarAdjuster Component", (): void => {
  const widthPercentage: number = 80;

  const setup = (
    propsOverride?: Partial<SliderBarAdjusterProps>,
  ): { container: HTMLElement } => {
    const defaultProps: SliderBarAdjusterProps = {
      widthPercentage,
    };

    const props: SliderBarAdjusterProps = { ...defaultProps, ...propsOverride };
    return render(<SliderBarAdjuster {...props} />);
  };

  it("renders div sliderBarAdjuster", (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".sliderBarAdjuster");

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("style", `left: ${widthPercentage}%;`);
  });
});
