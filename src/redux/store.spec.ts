import { store, RootState } from "./store";
import { setCharacterLengthValue } from "@/redux/slices/characterLengthSlice.ts";
import { CHARACTER_LENGTH_MAX_VALUE } from "@/globals/config.ts";

describe("Redux Store", (): void => {
  it("handles setCharacterLengthValue correctly", (): void => {
    store.dispatch(setCharacterLengthValue(CHARACTER_LENGTH_MAX_VALUE));

    const state: RootState = store.getState() as RootState;
    expect(state.characterLength.value).toEqual(CHARACTER_LENGTH_MAX_VALUE);
  });

  it("retains the previous state when no action is dispatched", (): void => {
    const initialState: RootState = store.getState();
    store.dispatch({ type: "" });

    const newState: RootState = store.getState();
    expect(newState).toEqual(initialState);
  });
});
