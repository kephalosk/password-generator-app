import React, { useState } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import useSliderMouseEvents from "@/hooks/slider/useSliderMouseEvents.ts";
import {
  CHARACTER_LENGTH_MAX_VALUE,
  CHARACTER_LENGTH_MIN_VALUE,
} from "@/globals/config.ts";
import preventZeroAsDivisor from "@/globals/utils/preventZeroAsDivisor.ts";

const positionPercentInit: number = 0;
const isDraggingMock: string = "dragging";
const propagateNewValueMock: jest.Mock = jest.fn();
const minValue: number = CHARACTER_LENGTH_MIN_VALUE;
const maxValue: number = CHARACTER_LENGTH_MAX_VALUE;

const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = (): React.ReactElement => {
  const [positionPercent, setPositionPercent] =
    useState<number>(positionPercentInit);

  const { handleMouseDown, handleClick, isDragging, containerRef } =
    useSliderMouseEvents(
      minValue,
      maxValue,
      propagateNewValueMock,
      (newPositionPercent: number) => setPositionPercent(newPositionPercent),
    );

  return (
    <div
      ref={containerRef}
      data-testid={testComponentDataTestId}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      className={`${isDragging ? isDraggingMock : ""}`}
      style={{ width: "100px", height: "100px" }}
    >
      {positionPercent}
    </div>
  );
};

jest.mock(
  "@/globals/utils/preventZeroAsDivisor.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

describe("useSliderMouseEvents hook", (): void => {
  const setup = (): { container: HTMLElement } => {
    return render(<TestComponent />);
  };

  const triggerTimeout = (): HTMLElement => {
    setup();
    const sliderContainer: HTMLElement = screen.getByTestId(
      testComponentDataTestId,
    );
    fireEvent.mouseDown(sliderContainer, { clientX: triggerSmallValue });
    fireEvent.mouseMove(sliderContainer, { clientX: triggerMaxValue });
    return sliderContainer;
  };

  const triggerSmallValue: number = 0.8;
  const triggerMaxValue: number = 1;
  const maxValuePercent: number = 100;

  const clearTimeoutMock: jest.Mock = jest.fn();

  beforeEach((): void => {
    (preventZeroAsDivisor as jest.Mock).mockReturnValue(triggerMaxValue);
  });

  it("renders TestComponent", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);

    expect(element).toBeInTheDocument();
  });

  it("initializes positionPercent to positionPercentInit", (): void => {
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    expect(element).toHaveTextContent(`${positionPercentInit}`);
  });

  it("changes the position on mouse click", async (): Promise<void> => {
    setup();

    const sliderContainer: HTMLElement = screen.getByTestId(
      testComponentDataTestId,
    );
    fireEvent.click(sliderContainer, {
      clientX: triggerMaxValue,
    });

    expect(sliderContainer).toHaveTextContent(`${maxValuePercent}`);
  });

  it("sets value to minValue if value is too small", async (): Promise<void> => {
    const valueTooSmall: number = 0.3;
    const minValuePercent: number = (minValue / maxValue) * 100;
    setup();

    const sliderContainer: HTMLElement = screen.getByTestId(
      testComponentDataTestId,
    );
    fireEvent.click(sliderContainer, {
      clientX: valueTooSmall,
    });

    expect(sliderContainer).toHaveTextContent(`${minValuePercent}`);
  });

  it("returns if value is too big", async (): Promise<void> => {
    const valueTooBig: number = 100;
    setup();

    const sliderContainer: HTMLElement = screen.getByTestId(
      testComponentDataTestId,
    );
    fireEvent.click(sliderContainer, {
      clientX: valueTooBig,
    });

    expect(sliderContainer).toHaveTextContent(`${positionPercentInit}`);
  });

  it("updates position on mouse move", async (): Promise<void> => {
    setup();

    const sliderContainer: HTMLElement = screen.getByTestId(
      testComponentDataTestId,
    );

    fireEvent.mouseDown(sliderContainer, {
      clientX: triggerSmallValue,
    });

    fireEvent.mouseMove(sliderContainer, {
      clientX: triggerMaxValue,
    });

    await waitFor((): void => {
      expect(sliderContainer).toHaveTextContent(`${maxValuePercent}`);
    });
  });

  it("stops dragging on mouse up", (): void => {
    setup();

    const sliderContainer: HTMLElement = screen.getByTestId(
      testComponentDataTestId,
    );

    fireEvent.mouseDown(sliderContainer, {
      clientX: triggerMaxValue,
    });

    expect(sliderContainer).toHaveClass(isDraggingMock);

    fireEvent.mouseUp(sliderContainer);

    expect(sliderContainer).not.toHaveClass(isDraggingMock);
  });

  it("propagates value change", () => {
    setup();

    const sliderContainer: HTMLElement = screen.getByTestId(
      testComponentDataTestId,
    );

    fireEvent.click(sliderContainer, {
      clientX: triggerMaxValue,
    });

    expect(propagateNewValueMock).toHaveBeenCalledTimes(1);
    expect(propagateNewValueMock).toHaveBeenCalledWith(maxValue);
  });

  it("calls clearTimeout when mouse up is triggered", (): void => {
    jest.useFakeTimers();
    const sliderContainer: HTMLElement = triggerTimeout();

    global.clearTimeout = clearTimeoutMock;
    fireEvent.mouseUp(sliderContainer);

    expect(clearTimeoutMock).toHaveBeenCalled();
    jest.useRealTimers();
  });

  it("calls clearTimeout when mouse move is triggered", (): void => {
    jest.useFakeTimers();
    const sliderContainer: HTMLElement = triggerTimeout();

    global.clearTimeout = clearTimeoutMock;
    fireEvent.mouseMove(sliderContainer, { clientX: triggerSmallValue });

    expect(clearTimeoutMock).toHaveBeenCalled();
    jest.useRealTimers();
  });
});
