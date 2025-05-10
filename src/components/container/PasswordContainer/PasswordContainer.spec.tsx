import Label from "@/components/atoms/Label/Label.tsx";
import { ReactElement } from "react";
import { render } from "@testing-library/react";
import PasswordContainer from "@/components/container/PasswordContainer/PasswordContainer.tsx";
import { LabelTypeEnum } from "@/globals/constants/LabelTypeEnum.ts";
import { COPY_ICON_SRC } from "@/globals/constants/ressources.ts";
import {
  COPY_ICON_ALT_TEXT,
  COPY_TEXT,
  EMPTY_STRING,
} from "@/globals/constants/constants.ts";

const labelDataTestId: string = "label";
jest.mock(
  "@/components/atoms/Label/Label.tsx",
  (): jest.Mock =>
    jest.fn((props): ReactElement => {
      return <div data-testid={labelDataTestId} className={props.type}></div>;
    }),
);

describe("", (): void => {
  const setup = (): { container: HTMLElement } => {
    return render(<PasswordContainer />);
  };

  it("renders div passwordContainer", (): void => {
    const { container } = setup();

    const element: HTMLElement | null =
      container.querySelector(".passwordContainer");

    expect(element).toBeInTheDocument();
  });

  it("renders span passwordContainerSpace", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".passwordContainerSpace",
    );

    expect(element).toBeInTheDocument();
  });

  it("renders component Label for password", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      `.${LabelTypeEnum.PASSWORD_LABEL}`,
    );

    expect(element).toBeInTheDocument();
    expect(Label).toHaveBeenCalledTimes(2);
    expect(Label).toHaveBeenNthCalledWith(
      1,
      { text: EMPTY_STRING, type: LabelTypeEnum.PASSWORD_LABEL },
      undefined,
    );
  });

  it("renders component Label for copy", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      `.${LabelTypeEnum.COPY_LABEL}`,
    );

    expect(element).toBeInTheDocument();
    expect(Label).toHaveBeenCalledTimes(2);
    expect(Label).toHaveBeenNthCalledWith(
      2,
      { text: COPY_TEXT, type: LabelTypeEnum.COPY_LABEL },
      undefined,
    );
  });

  it("renders img passwordContainerIcon", (): void => {
    const { container } = setup();

    const element: HTMLElement | null = container.querySelector(
      ".passwordContainerIcon",
    );

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("src", COPY_ICON_SRC);
    expect(element).toHaveAttribute("alt", COPY_ICON_ALT_TEXT);
    expect(element).toHaveAttribute("aria-label", COPY_ICON_ALT_TEXT);
    expect(element).toHaveAttribute("aria-hidden", "false");
    expect(element).toHaveAttribute("tabIndex", "0");
  });
});
