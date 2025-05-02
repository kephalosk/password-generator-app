import { render, screen } from "@testing-library/react";
import { ReactElement } from "react";
import Checkbox from "@/components/atoms/Checkbox/Checkbox.tsx";
import Label from "@/components/atoms/Label/Label.tsx";
import { OptionEnum } from "@/globals/constants/OptionEnum.ts";
import CheckboxContainer, {
  CheckboxContainerProps,
} from "@/components/container/CheckboxContainer/CheckboxContainer.tsx";
import { LabelTypeEnum } from "@/globals/constants/LabelTypeEnum.ts";

const checkboxTestId: string = "checkbox";
jest.mock(
  "@/components/atoms/Checkbox/Checkbox.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={checkboxTestId}></div>;
    }),
);

const labelTestId: string = "label";
jest.mock(
  "@/components/atoms/Label/Label.tsx",
  (): jest.Mock =>
    jest.fn((): ReactElement => {
      return <div data-testid={labelTestId}></div>;
    }),
);

describe("CheckboxContainer Component", (): void => {
  const option: OptionEnum = OptionEnum.NUMBERS;
  const isChecked: boolean = false;

  const setup = (
    propsOverride?: Partial<CheckboxContainerProps>,
  ): { container: HTMLElement } => {
    const defaultProps: CheckboxContainerProps = {
      option,
      isChecked,
    };

    const props: CheckboxContainerProps = { ...defaultProps, ...propsOverride };
    return render(<CheckboxContainer {...props} />);
  };

  it("renders div checkboxContainer", (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".checkboxContainer");

    expect(element).toBeInTheDocument();
  });

  it("renders component Checkbox with passed prop isChecked", (): void => {
    setup({ isChecked });

    const element: HTMLElement = screen.getByTestId(checkboxTestId);

    expect(element).toBeInTheDocument();
    expect(Checkbox).toHaveBeenCalledTimes(1);
    expect(Checkbox).toHaveBeenCalledWith({ isChecked }, undefined);
  });

  it("renders component Label with passed prop option", (): void => {
    setup({ option });

    const element: HTMLElement = screen.getByTestId(labelTestId);

    expect(element).toBeInTheDocument();
    expect(Label).toHaveBeenCalledTimes(1);
    expect(Label).toHaveBeenCalledWith(
      { text: option, type: LabelTypeEnum.CHECKBOX_LABEL },
      undefined,
    );
  });
});
