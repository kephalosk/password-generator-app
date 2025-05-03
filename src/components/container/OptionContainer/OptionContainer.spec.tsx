import CheckboxContainer from "@/components/container/CheckboxContainer/CheckboxContainer.tsx";
import { OptionItem, OptionItems } from "@/globals/constants/OptionItems.ts";
import { ReactElement } from "react";
import useCurrentOptions from "@/hooks/useCurrentOptions.ts";
import { render, screen } from "@testing-library/react";
import OptionContainer from "@/components/container/OptionContainer/OptionContainer.tsx";

const checkboxContainerDataTestId: string = "checkbox-container";
jest.mock(
  "@/components/container/CheckboxContainer/CheckboxContainer.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={checkboxContainerDataTestId}></div>;
    }),
);

jest.mock(
  "@/hooks/useCurrentOptions.ts",
  (): { __esModule: boolean; default: jest.Mock } => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

describe("OptionContainer Component", (): void => {
  const setup = (): { container: HTMLElement } => {
    return render(<OptionContainer />);
  };

  const useCurrentOptionsMock: { currentOptions: OptionItem[] } = {
    currentOptions: OptionItems,
  };

  beforeEach((): void => {
    (useCurrentOptions as jest.Mock).mockReturnValue(useCurrentOptionsMock);
  });

  it("renders div optionContainer", (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".optionContainer");

    expect(element).toBeInTheDocument();
  });

  it("renders components CheckboxContainer", (): void => {
    setup();

    const elements: HTMLElement[] = screen.getAllByTestId(
      checkboxContainerDataTestId,
    );

    expect(elements).toHaveLength(OptionItems.length);
    expect(CheckboxContainer).toHaveBeenCalledTimes(OptionItems.length);
    OptionItems.forEach((option: OptionItem, index: number): void => {
      expect(CheckboxContainer).toHaveBeenNthCalledWith(
        index + 1,
        {
          option: option.option,
          isChecked: option.isChecked,
        },
        undefined,
      );
    });
  });

  it("calls hook useCurrentOptions", (): void => {
    setup();

    expect(useCurrentOptions).toHaveBeenCalledTimes(1);
    expect(useCurrentOptions).toHaveBeenCalledWith();
  });
});
