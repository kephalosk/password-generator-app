import { ReactElement } from "react";
import { render } from "@testing-library/react";
import Label from "@/components/atoms/Label/Label.tsx";
import { LabelTypeEnum } from "@/globals/constants/LabelTypeEnum.ts";
import {
  SLIDER_HEADER_LABEL_TEXT,
  ZERO_LABEL_TEXT,
} from "@/globals/constants/constants.ts";
import SliderHeaderContainer from "@/components/container/SliderHeaderContainer/SliderHeaderContainer.tsx";

const labelDataTestId: string = "label";
jest.mock(
  "@/components/atoms/Label/Label.tsx",
  (): jest.Mock =>
    jest.fn((props): ReactElement => {
      return <div data-testid={labelDataTestId} className={props.type}></div>;
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

describe("SliderHeaderContainer Component", (): void => {
  const setup = (): { container: HTMLElement } => {
    return render(<SliderHeaderContainer />);
  };

  it("renders div sliderHeaderContainer", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".sliderHeaderContainer",
    );

    expect(element).toBeInTheDocument();
  });

  it("renders span sliderHeaderContainerSpace", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".sliderHeaderContainerSpace",
    );

    expect(element).toBeInTheDocument();
  });

  it("renders component Label for header", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      `.${LabelTypeEnum.HEADER_LABEL}`,
    );

    expect(element).toBeInTheDocument();
    expect(Label).toHaveBeenCalledTimes(2);
    expect(Label).toHaveBeenNthCalledWith(
      1,
      { type: LabelTypeEnum.HEADER_LABEL, text: SLIDER_HEADER_LABEL_TEXT },
      undefined,
    );
  });

  it("renders component Label for number", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      `.${LabelTypeEnum.NUMBER_LABEL}`,
    );

    expect(element).toBeInTheDocument();
    expect(Label).toHaveBeenCalledTimes(2);
    expect(Label).toHaveBeenNthCalledWith(
      2,
      { type: LabelTypeEnum.NUMBER_LABEL, text: ZERO_LABEL_TEXT },
      undefined,
    );
  });
});
