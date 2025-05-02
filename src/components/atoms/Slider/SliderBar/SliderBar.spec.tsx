import SliderBar from "@/components/atoms/Slider/SliderBar/SliderBar.tsx";
import { render } from "@testing-library/react";

describe("SliderBarValue Component", (): void => {
  const setup = (): { container: HTMLElement } => {
    return render(<SliderBar />);
  };
  it("renders div sliderBar", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(".sliderBar");

    expect(element).toBeInTheDocument();
  });
});
