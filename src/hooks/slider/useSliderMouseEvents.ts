import React, { useState, useCallback, useRef, useEffect } from "react";
import preventZeroAsDivisor from "@/globals/utils/preventZeroAsDivisor.ts";

const useSliderMouseEvents = (
  minValue: number,
  maxValue: number,
  propagateNewValue: (newValue: number) => void,
  onPositionChange: (newPositionPercent: number) => void,
): {
  containerRef: React.RefObject<HTMLDivElement | null>;
  handleClick: (event: React.MouseEvent) => void;
  isDragging: boolean;
  handleMouseDown: () => void;
} => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const containerRef: React.RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null);

  const getNewPositionUnited = useCallback(
    (
      event: MouseEvent | React.MouseEvent,
      container: HTMLDivElement,
    ): number => {
      const containerWidth: number = container.offsetWidth;
      const clickPosition: number =
        event.clientX - container.getBoundingClientRect().left;
      const newPosition: number =
        clickPosition / preventZeroAsDivisor(containerWidth);
      return Math.round(newPosition * maxValue);
    },
    [maxValue],
  );

  const isNewPositionValid = useCallback(
    (newPositionUnitedAbsolute: number) => {
      return (
        newPositionUnitedAbsolute >= minValue &&
        newPositionUnitedAbsolute <= maxValue
      );
    },
    [maxValue, minValue],
  );

  const correctValuesThatAreTooSmall = useCallback(
    (newValue: number): number => {
      return newValue < minValue ? minValue : newValue;
    },
    [minValue],
  );

  const updatePosition = useCallback(
    (event: MouseEvent | React.MouseEvent): void => {
      if (containerRef.current) {
        const container: HTMLDivElement = containerRef.current;
        let newPositionUnitedAbsolute: number = getNewPositionUnited(
          event,
          container,
        );

        newPositionUnitedAbsolute = correctValuesThatAreTooSmall(
          newPositionUnitedAbsolute,
        );

        if (!isNewPositionValid(newPositionUnitedAbsolute)) {
          return;
        }

        const newPositionUnitedRelative: number =
          (newPositionUnitedAbsolute / maxValue) * 100;

        onPositionChange(newPositionUnitedRelative);
        propagateNewValue(newPositionUnitedAbsolute);
      }
    },
    [
      correctValuesThatAreTooSmall,
      getNewPositionUnited,
      isNewPositionValid,
      maxValue,
      onPositionChange,
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

        const newTimeoutId: NodeJS.Timeout = setTimeout((): void => {
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

  return {
    isDragging,
    handleMouseDown,
    handleClick,
    containerRef,
  };
};

export default useSliderMouseEvents;
