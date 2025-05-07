import "./SliderBarContainer.scss";
import React, { ReactElement, useCallback, useState } from "react";
import SliderBar from "@/components/atoms/Slider/SliderBar/SliderBar.tsx";
import SliderBarValue from "@/components/atoms/Slider/SliderBarValue/SliderBarValue.tsx";
import SliderBarAdjuster from "@/components/atoms/Slider/SliderBarAdjuster/SliderBarAdjuster.tsx";
import { OFFSET_ADJUSTER } from "@/globals/config.ts";
import useSliderMouseEvents from "@/hooks/slider/useSliderMouseEvents.ts";

export interface SliderBarContainerProps {
  currentValue: number;
  minValue: number;
  maxValue: number;
  propagateNewValue: (newValue: number) => void;
}

const SliderBarContainer: React.FC<SliderBarContainerProps> = ({
  currentValue,
  minValue,
  maxValue,
  propagateNewValue,
}: SliderBarContainerProps): ReactElement => {
  const [positionPercent, setPositionPercent] = useState<number>(
    (currentValue / maxValue) * 100,
  );
  const onPositionChange = useCallback((newPositionPercent: number) => {
    setPositionPercent(newPositionPercent);
  }, []);

  const { isDragging, handleMouseDown, handleClick, containerRef } =
    useSliderMouseEvents(
      minValue,
      maxValue,
      propagateNewValue,
      onPositionChange,
    );

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const isCharacterLengthGoingOutOfBounce = useCallback(
    (event: React.KeyboardEvent): boolean => {
      if (event.key === "ArrowLeft") {
        return currentValue <= minValue;
      } else {
        return currentValue >= maxValue;
      }
    },
    [currentValue, maxValue, minValue],
  );

  const setNewPosition = useCallback(
    (newPosition: number): void => {
      const newPositionUnitedRelative: number = (newPosition / maxValue) * 100;

      setPositionPercent(newPositionUnitedRelative);
      propagateNewValue(newPosition);
    },
    [maxValue, propagateNewValue],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>): void => {
      if (event.key != "ArrowLeft" && event.key != "ArrowRight") {
        return;
      }

      setIsFocused(true);

      if (isCharacterLengthGoingOutOfBounce(event)) {
        return;
      }

      if (event.key === "ArrowLeft") {
        const newPosition: number = currentValue - 1;
        setNewPosition(newPosition);
      } else {
        const newPosition: number = currentValue + 1;
        setNewPosition(newPosition);
      }
    },
    [currentValue, isCharacterLengthGoingOutOfBounce, setNewPosition],
  );

  const handleKeyUp = useCallback((): void => {
    setIsFocused(false);
  }, []);

  return (
    <div
      className="sliderBarContainerWrapper"
      onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        handleClick(event)
      }
      onMouseDown={handleMouseDown}
      onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) =>
        handleKeyDown(event)
      }
      onKeyUp={handleKeyUp}
      tabIndex={0}
    >
      <div ref={containerRef} className="sliderBarContainer">
        <SliderBar>
          <span
            className="sliderBarContainerValue"
            style={{ width: `${positionPercent}%` }}
          >
            <SliderBarValue />
          </span>
          <span
            className="sliderBarContainerAdjuster"
            style={{ left: `calc(${positionPercent}% - ${OFFSET_ADJUSTER}px)` }}
          >
            <SliderBarAdjuster isClicked={isDragging || isFocused} />
          </span>
        </SliderBar>
      </div>
    </div>
  );
};

export default SliderBarContainer;
