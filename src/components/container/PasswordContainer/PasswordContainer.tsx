import "./PasswordContainer.scss";
import Label from "../../atoms/Label/Label";
import { LabelTypeEnum } from "@/globals/models/enums/LabelTypeEnum.ts";
import {
  COPY_ICON_ALT_TEXT,
  COPY_TEXT,
  EMPTY_STRING,
} from "@/globals/constants/constants.ts";
import { COPY_ICON_SRC } from "@/globals/constants/ressources.ts";

const PasswordContainer = () => {
  return (
    <div className="passwordContainer">
      <span className="passwordContainerSpace">
        <Label type={LabelTypeEnum.PASSWORD_LABEL} text={EMPTY_STRING} />
      </span>
      <Label type={LabelTypeEnum.COPY_LABEL} text={COPY_TEXT} />
      <img
        className="passwordContainerIcon"
        src={COPY_ICON_SRC}
        alt={COPY_ICON_ALT_TEXT}
        aria-label={COPY_ICON_ALT_TEXT}
        aria-hidden={false}
        tabIndex={0}
      />
    </div>
  );
};

export default PasswordContainer;
