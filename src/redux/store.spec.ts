import { RootState, store } from "./store";
import { setCharacterLengthValue } from "@/redux/slices/characterLengthSlice.ts";
import { CHARACTER_LENGTH_MAX_VALUE } from "@/globals/config.ts";
import { setSecurityLevelValue } from "@/redux/slices/securityLevelSlice.ts";
import { SecurityLevelEnum } from "@/globals/constants/SecurityLevelEnum.ts";

describe("Redux Store", (): void => {
  it("handles setCharacterLengthValue correctly", (): void => {
    store.dispatch(setCharacterLengthValue(CHARACTER_LENGTH_MAX_VALUE));

    const state: RootState = store.getState() as RootState;
    expect(state.characterLength.value).toEqual(CHARACTER_LENGTH_MAX_VALUE);
  });

  it("handles setSecurityLevelValue correctly", (): void => {
    store.dispatch(setSecurityLevelValue(SecurityLevelEnum.STRONG));

    const state: RootState = store.getState() as RootState;
    expect(state.securityLevel.value).toEqual(SecurityLevelEnum.STRONG);
  });

  it("retains the previous state when no action is dispatched", (): void => {
    const initialState: RootState = store.getState();
    store.dispatch({ type: "" });

    const newState: RootState = store.getState();
    expect(newState).toEqual(initialState);
  });
});
