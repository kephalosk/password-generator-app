import "./SliderContainer.scss";
import React, { ReactElement, useCallback } from "react";
import SliderHeaderContainer from "@/components/container/SliderHeaderContainer/SliderHeaderContainer.tsx";
import SliderBarContainer from "@/components/container/SliderBarContainer/SliderBarContainer.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";
import {
  CHARACTER_LENGTH_MAX_VALUE,
  CHARACTER_LENGTH_MIN_VALUE,
} from "@/globals/config.ts";
import { Dispatch } from "@reduxjs/toolkit";
import { setCharacterLengthValue } from "@/redux/slices/characterLengthSlice.ts";

const SliderContainer: React.FC = (): ReactElement => {
  const characterLength: number = useSelector(
    (state: RootState) => state.characterLength.value,
  );

  const dispatch: Dispatch = useDispatch();

  const handleValueChange = useCallback(
    (newValue: number): void => {
      dispatch(setCharacterLengthValue(newValue));
    },
    [dispatch],
  );

  return (
    <div className="sliderContainer">
      <SliderHeaderContainer />
      <SliderBarContainer
        currentValue={characterLength}
        minValue={CHARACTER_LENGTH_MIN_VALUE}
        maxValue={CHARACTER_LENGTH_MAX_VALUE}
        propagateNewValue={handleValueChange}
      />
    </div>
  );
};

export default SliderContainer;
