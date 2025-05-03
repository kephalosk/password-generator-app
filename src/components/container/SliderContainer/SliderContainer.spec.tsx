import { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import SliderContainer from "@/components/container/SliderContainer/SliderContainer.tsx";
import SliderHeaderContainer from "@/components/container/SliderHeaderContainer/SliderHeaderContainer.tsx";
import SliderBarContainer from "@/components/container/SliderBarContainer/SliderBarContainer.tsx";

const sliderHeaderDataTestId: string = "slider-header";
jest.mock(
  "@/components/container/SliderHeaderContainer/SliderHeaderContainer.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={sliderHeaderDataTestId}></div>;
    }),
);

const sliderBarDataTestId: string = "slider-bar";
jest.mock(
  "@/components/container/SliderBarContainer/SliderBarContainer.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={sliderBarDataTestId}></div>;
    }),
);

describe("SliderContainer Component", (): void => {
  const setup = (): { container: HTMLElement } => {
    return render(<SliderContainer />);
  };

  it("renders div sliderContainer", (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".sliderContainer");

    expect(element).toBeInTheDocument();
  });

  it("renders component SliderHeaderContainer", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(sliderHeaderDataTestId);

    expect(element).toBeInTheDocument();
    expect(SliderHeaderContainer).toHaveBeenCalledTimes(1);
    expect(SliderHeaderContainer).toHaveBeenCalledWith({}, undefined);
  });

  it("renders component SliderBarContainer", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(sliderBarDataTestId);

    expect(element).toBeInTheDocument();
    expect(SliderBarContainer).toHaveBeenCalledTimes(1);
    expect(SliderBarContainer).toHaveBeenCalledWith({}, undefined);
  });
});
