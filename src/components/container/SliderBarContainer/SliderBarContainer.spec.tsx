import { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import SliderBar from "@/components/atoms/Slider/SliderBar/SliderBar.tsx";
import SliderBarContainer from "@/components/container/SliderBarContainer/SliderBarContainer.tsx";
import SliderBarValue from "@/components/atoms/Slider/SliderBarValue/SliderBarValue.tsx";
import SliderBarAdjuster from "@/components/atoms/Slider/SliderBarAdjuster/SliderBarAdjuster.tsx";

const sliderBarDataTestId: string = "slider-bar";
jest.mock(
  "@/components/atoms/Slider/SliderBar/SliderBar.tsx",
  (): jest.Mock =>
    jest.fn((props): ReactElement => {
      return <div data-testid={sliderBarDataTestId}>{props.children}</div>;
    }),
);

const sliderBarValueDataTestId: string = "slider-bar-value";
jest.mock(
  "@/components/atoms/Slider/SliderBarValue/SliderBarValue.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={sliderBarValueDataTestId}></div>;
    }),
);

const sliderBarAdjusterDataTestId: string = "slider-bar-adjuster";
jest.mock(
  "@/components/atoms/Slider/SliderBarAdjuster/SliderBarAdjuster.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={sliderBarAdjusterDataTestId}></div>;
    }),
);

describe("SliderBarContainer Component", (): void => {
  const setup = (): { container: HTMLElement } => {
    return render(<SliderBarContainer />);
  };

  it("renders div sliderBarContainer", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".sliderBarContainer",
    );

    expect(element).toBeInTheDocument();
  });

  it("renders component SliderBar", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(sliderBarDataTestId);

    expect(element).toBeInTheDocument();
    expect(SliderBar).toHaveBeenCalledTimes(1);
    expect(SliderBar).toHaveBeenCalledWith(
      { children: expect.any(Array) },
      undefined,
    );
  });

  it("renders span sliderBarContainerValue", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".sliderBarContainerValue",
    );

    expect(element).toBeInTheDocument();
  });

  it("renders component SliderBarValue", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(sliderBarValueDataTestId);

    expect(element).toBeInTheDocument();
    expect(SliderBarValue).toHaveBeenCalledTimes(1);
    expect(SliderBarValue).toHaveBeenCalledWith({}, undefined);
  });

  it("renders span sliderBarContainerAdjuster", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".sliderBarContainerAdjuster",
    );

    expect(element).toBeInTheDocument();
  });

  it("renders component SliderBarAdjuster", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(
      sliderBarAdjusterDataTestId,
    );

    expect(element).toBeInTheDocument();
    expect(SliderBarAdjuster).toHaveBeenCalledTimes(1);
    expect(SliderBarAdjuster).toHaveBeenCalledWith({}, undefined);
  });
});
