import { render } from "@testing-library/react";
import SliderBarAdjuster, {
  SliderBarAdjusterProps,
} from "@/components/atoms/Slider/SliderBarAdjuster/SliderBarAdjuster.tsx";

describe("SliderBarAdjuster Component", (): void => {
  const isClicked: boolean = false;

  const setup = (
    propsOverride?: Partial<SliderBarAdjusterProps>,
  ): { container: HTMLElement } => {
    const defaultProps: SliderBarAdjusterProps = {
      isClicked,
    };

    const props: SliderBarAdjusterProps = { ...defaultProps, ...propsOverride };
    return render(<SliderBarAdjuster {...props} />);
  };

  it("renders div sliderBarAdjuster", (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".sliderBarAdjuster");

    expect(element).toBeInTheDocument();
  });

  it.each([[true], [false]])(
    "handles class clicked when passed prop isClicked is %s",
    (isClicked: boolean): void => {
      const { container } = setup({ isClicked });

      const element: HTMLElement | null =
        container.querySelector(".sliderBarAdjuster");

      expect(element).toBeInTheDocument();
      if (isClicked) {
        expect(element).toHaveClass("clicked");
      } else {
        expect(element).not.toHaveClass("clicked");
      }
    },
  );
});
