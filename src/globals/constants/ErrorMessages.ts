import { DOT } from "@/globals/constants/Constants.ts";

const ERROR_MESSAGE_MAXVALUE_LESS_0_PREFIX: string = "Invalid maxValue: ";
const ERROR_MESSAGE_MAXVALUE_LESS_0_SUFFIX: string =
  ". Value must be greater than 0!";
export const getErrorMessageMaxValueLess0 = (maxValue: number): string => {
  return `${ERROR_MESSAGE_MAXVALUE_LESS_0_PREFIX}${maxValue}${ERROR_MESSAGE_MAXVALUE_LESS_0_SUFFIX}`;
};

const ERROR_MESSAGE_NEWPOSITION_GREATER_MAXVALUE_PREFIX: string =
  "Invalid newPosition: ";
const ERROR_MESSAGE_NEWPOSITION_GREATER_MAXVALUE_SUFFIX: string =
  ". Value can't be greater than maxValue: ";
export const getErrorMessageNewPositionGreaterMaxValue = (
  newPosition: number,
  maxValue: number,
): string => {
  return `${ERROR_MESSAGE_NEWPOSITION_GREATER_MAXVALUE_PREFIX}${newPosition}${ERROR_MESSAGE_NEWPOSITION_GREATER_MAXVALUE_SUFFIX}${maxValue}${DOT}`;
};

const ERROR_MESSAGE_NEWPOSITION_LESS_0_PREFIX: string = "Invalid newPosition: ";
const ERROR_MESSAGE_NEWPOSITION_LESS_0_SUFFIX: string =
  ". Value can't be negative!";
export const getErrorMessageNewPositionLess0 = (
  newPosition: number,
): string => {
  return `${ERROR_MESSAGE_NEWPOSITION_LESS_0_PREFIX}${newPosition}${ERROR_MESSAGE_NEWPOSITION_LESS_0_SUFFIX}`;
};

const ERROR_MESSAGE_EVENT_KEY_NEITHER_ARROWLEFT_NOR_ARROWRIGHT_PREFIX: string =
  "Invalid event.key: ";
const ERROR_MESSAGE_EVENT_KEY_NEITHER_ARROWLEFT_NOR_ARROWRIGHT_SUFFIX: string =
  ". Value must be ArrowLeft or ArrowRight.";
export const getErrorMessageEventKeyNeitherArrowLeftNorArrowRight = (
  eventKey: string,
): string => {
  return `${ERROR_MESSAGE_EVENT_KEY_NEITHER_ARROWLEFT_NOR_ARROWRIGHT_PREFIX}${eventKey}${ERROR_MESSAGE_EVENT_KEY_NEITHER_ARROWLEFT_NOR_ARROWRIGHT_SUFFIX}`;
};

const ERROR_MESSAGE_MINVALUE_GREATER_MAXVALUE_PREFIX: string =
  "Invalid minValue: ";
const ERROR_MESSAGE_MINVALUE_GREATER_MAXVALUE_SUFFIX: string =
  ". Value can't be greater than maxValue: ";
export const getErrorMessageMinValueGreaterMaxValue = (
  minValue: number,
  maxValue: number,
): string => {
  return `${ERROR_MESSAGE_MINVALUE_GREATER_MAXVALUE_PREFIX}${minValue}${ERROR_MESSAGE_MINVALUE_GREATER_MAXVALUE_SUFFIX}${maxValue}${DOT}`;
};

export const ERROR_MESSAGE_SLIDER_KEYBOARD_KEYDOWN_PREFIX: string =
  "Error handling keydown event: ";

const ERROR_MESSAGE_CONTAINERWIDTH_IS_0_PREFIX: string =
  "Invalid containerWidth: ";
const ERROR_MESSAGE_CONTAINERWIDTH_IS_0_SUFFIX: string =
  ". Value must not be 0!";
export const getErrorMessageContainerWidthIs0 = (
  containerWidth: number,
): string => {
  return `${ERROR_MESSAGE_CONTAINERWIDTH_IS_0_PREFIX}${containerWidth}${ERROR_MESSAGE_CONTAINERWIDTH_IS_0_SUFFIX}`;
};

export const ERROR_MESSAGE_SLIDER_MOUSE_UPDATE_PREFIX: string =
  "Error handling mouse update event: ";

const ERROR_MESSAGE_CHARACTERLENGTH_LESS_0_PREFIX: string =
  "Invalid characterLength: ";
const ERROR_MESSAGE_CHARACTERLENGTH_LESS_0_SUFFIX: string =
  ". Value must be greater than 0!";
export const getErrorMessageCharacterLengthLess0 = (
  characterLength: number,
): string => {
  return `${ERROR_MESSAGE_CHARACTERLENGTH_LESS_0_PREFIX}${characterLength}${ERROR_MESSAGE_CHARACTERLENGTH_LESS_0_SUFFIX}`;
};

export const ERROR_MESSAGE_MISSING_OPTION: string = "Options are missing!";
