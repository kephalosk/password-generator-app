import SliderContainer from "@/components/container/SliderContainer/SliderContainer.tsx";
import OptionContainer from "@/components/container/OptionContainer/OptionContainer.tsx";
import StrengthContainer from "@/components/container/StrengthContainer/StrengthContainer.tsx";
import Button from "@/components/atoms/Button/Button.tsx";
import { ReactElement } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ContentContainer from "@/components/container/ContentContainer/ContentContainer.tsx";
import { BUTTON_TEXT } from "@/globals/constants/Constants.ts";

const sliderContainerDataTestId: string = "slider-container";
jest.mock(
  "@/components/container/SliderContainer/SliderContainer.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={sliderContainerDataTestId}></div>;
    }),
);

const optionContainerDataTestId: string = "option-container";
jest.mock(
  "@/components/container/OptionContainer/OptionContainer.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={optionContainerDataTestId}></div>;
    }),
);

const strengthContainerDataTestId: string = "strength-container";
jest.mock(
  "@/components/container/StrengthContainer/StrengthContainer.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={strengthContainerDataTestId}></div>;
    }),
);

const buttonDataTestId: string = "button";
jest.mock(
  "@/components/atoms/Button/Button.tsx",
  (): jest.Mock =>
    jest.fn((props): ReactElement => {
      return (
        <div
          data-testid={buttonDataTestId}
          onClick={props.handleButtonClick}
        ></div>
      );
    }),
);

describe("ContentContainer Component", (): void => {
  const setup = (): { container: HTMLElement } => {
    return render(<ContentContainer />);
  };

  const contentContainerSelector: string = "contentContainer";

  it(`renders div ${contentContainerSelector}`, (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      `.${contentContainerSelector}`,
    );

    expect(element).toBeInTheDocument();
  });

  it("renders component SliderContainer", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(sliderContainerDataTestId);

    expect(element).toBeInTheDocument();
    expect(SliderContainer).toHaveBeenCalledTimes(1);
    expect(SliderContainer).toHaveBeenCalledWith({}, undefined);
  });

  it("renders component OptionContainer", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(optionContainerDataTestId);

    expect(element).toBeInTheDocument();
    expect(OptionContainer).toHaveBeenCalledTimes(1);
    expect(OptionContainer).toHaveBeenCalledWith({}, undefined);
  });

  it("renders component StrengthContainer", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(
      strengthContainerDataTestId,
    );

    expect(element).toBeInTheDocument();
    expect(StrengthContainer).toHaveBeenCalledTimes(1);
    expect(StrengthContainer).toHaveBeenCalledWith({}, undefined);
  });

  it("renders component Button", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(buttonDataTestId);

    expect(element).toBeInTheDocument();
    expect(Button).toHaveBeenCalledTimes(1);
    expect(Button).toHaveBeenCalledWith(
      {
        handleButtonClick: expect.any(Function),
        text: BUTTON_TEXT,
      },
      undefined,
    );
  });

  it("calls handleButtonClick", (): void => {
    const handleButtonClickMock: jest.Mock = jest.fn();
    setup();

    const element: HTMLElement = screen.getByTestId(buttonDataTestId);
    element.onclick = handleButtonClickMock;
    fireEvent.click(element);

    expect(handleButtonClickMock).toHaveBeenCalledTimes(1);
    expect(handleButtonClickMock).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "click",
        target: element,
      }),
    );
  });
});
