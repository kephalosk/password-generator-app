import "./SliderBarContainer.scss";
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import SliderBar from "@/components/atoms/Slider/SliderBar/SliderBar.tsx";
import SliderBarValue from "@/components/atoms/Slider/SliderBarValue/SliderBarValue.tsx";
import SliderBarAdjuster from "@/components/atoms/Slider/SliderBarAdjuster/SliderBarAdjuster.tsx";
import { OFFSET_ADJUSTER } from "@/globals/config.ts";

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
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const containerRef: React.RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null);
  const wrapperRef: React.RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null);

  const isNewPositionValid = useCallback(
    (newPositionUnitedAbsolute: number) => {
      return (
        newPositionUnitedAbsolute >= minValue &&
        newPositionUnitedAbsolute <= maxValue
      );
    },
    [maxValue, minValue],
  );

  const getNewPositionUnited = useCallback(
    (
      event: MouseEvent | React.MouseEvent,
      container: HTMLDivElement,
    ): number => {
      const containerWidth: number = container.offsetWidth;
      const clickPosition: number =
        event.clientX - container.getBoundingClientRect().left;
      const newPosition: number = clickPosition / containerWidth;
      return Math.round(newPosition * maxValue);
    },
    [maxValue],
  );

  const updatePosition = useCallback(
    (event: MouseEvent | React.MouseEvent) => {
      if (containerRef.current) {
        const container: HTMLDivElement = containerRef.current;
        let newPositionUnitedAbsolute: number = getNewPositionUnited(
          event,
          container,
        );

        if (newPositionUnitedAbsolute < minValue) {
          newPositionUnitedAbsolute = minValue;
        }

        if (!isNewPositionValid(newPositionUnitedAbsolute)) {
          return;
        }

        const newPositionUnitedRelative: number =
          (newPositionUnitedAbsolute / maxValue) * 100;

        setPositionPercent(newPositionUnitedRelative);
        propagateNewValue(newPositionUnitedAbsolute);
      }
    },
    [
      getNewPositionUnited,
      isNewPositionValid,
      maxValue,
      minValue,
      propagateNewValue,
    ],
  );

  const handleMouseDown = useCallback((): void => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback((): void => {
    setIsDragging(false);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }, [timeoutId]);

  const handleMouseMove = useCallback(
    (event: MouseEvent | React.MouseEvent): void => {
      if (isDragging) {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        const newTimeoutId: NodeJS.Timeout = setTimeout(() => {
          updatePosition(event);
        }, 10);

        setTimeoutId(newTimeoutId);
      }
    },
    [isDragging, timeoutId, updatePosition],
  );

  const handleClick = useCallback(
    (event: React.MouseEvent): void => {
      updatePosition(event);
    },
    [updatePosition],
  );

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

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
      ref={wrapperRef}
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
