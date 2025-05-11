import React, { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import usePasswordGeneration from "@/hooks/usePasswordGeneration.ts";
import { OptionItem, OptionItems } from "@/globals/constants/OptionItems.ts";
import { PasswordGenerationHook } from "@/globals/models/types/PasswordGenerationTypes.ts";
import { EMPTY_STRING } from "@/globals/constants/Constants.ts";
import getAvailableCharacters from "@/globals/helper/password/getAvailableCharacters.ts";
import calculatePassword from "@/globals/helper/password/calculatePassword.ts";
import isEverySelectedOptionIncluded from "@/globals/helper/password/isEverySelectedOptionIncluded.ts";
import {
  LOWERCASE_LETTERS,
  NUMBERS,
  SYMBOLS,
  UPPERCASE_LETTERS,
} from "@/globals/constants/Characters.ts";
import { ALERT_MISSING_OPTION } from "@/globals/constants/AlertMessages.ts";

jest.mock(
  "@/globals/helper/password/getAvailableCharacters.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/globals/helper/password/calculatePassword.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

jest.mock(
  "@/globals/helper/password/isEverySelectedOptionIncluded.ts",
  (): {
    __esModule: boolean;
    default: jest.Mock;
  } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

const currentOptionsMock: OptionItem[] = OptionItems;
const characterLengthMock: number = 5;

const testComponentDataTestId: string = "test-component";
const TestComponent: React.FC = () => {
  const [password, setPassword] = useState<string>("");

  const { generatePassword }: PasswordGenerationHook = usePasswordGeneration(
    currentOptionsMock,
    characterLengthMock,
  );

  const handlePasswordGeneration = (): void => {
    setPassword(generatePassword());
  };

  return (
    <div
      data-testid={testComponentDataTestId}
      onClick={handlePasswordGeneration}
    >
      {password}
    </div>
  );
};

describe("usePasswordGeneration Hook", (): void => {
  const setup = (): void => {
    render(<TestComponent />);
  };

  const availableCharactersMock: string = UPPERCASE_LETTERS;
  const passwordWithEveryOption: string = `${UPPERCASE_LETTERS.at(0)}${LOWERCASE_LETTERS.at(0)}${NUMBERS.at(0)}${SYMBOLS.at(0)}`;
  const isEverySelectedOptionIncludedMock: boolean = true;

  beforeEach((): void => {
    (getAvailableCharacters as jest.Mock).mockReturnValue(
      availableCharactersMock,
    );
    (calculatePassword as jest.Mock).mockReturnValue(passwordWithEveryOption);
    (isEverySelectedOptionIncluded as jest.Mock).mockReturnValue(
      isEverySelectedOptionIncludedMock,
    );
    global.alert = jest.fn();
  });

  afterEach((): void => {
    jest.restoreAllMocks();
  });

  it("generates a Password", (): void => {
    const generatedPassword: string = "newPassword1!";
    (calculatePassword as jest.Mock).mockReturnValue(generatedPassword);
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(element).toHaveTextContent(generatedPassword);
  });

  it("alerts and returns an empty string if no option is selected", (): void => {
    (getAvailableCharacters as jest.Mock).mockReturnValue(EMPTY_STRING);
    setup();

    const element: HTMLElement = screen.getByTestId(testComponentDataTestId);
    fireEvent.click(element);

    expect(element).toHaveTextContent(EMPTY_STRING);
    expect(global.alert).toHaveBeenCalledWith(ALERT_MISSING_OPTION);
  });
});
