import { OptionEnum } from "@/globals/constants/OptionEnum.ts";

export interface OptionItem {
  option: OptionEnum;
  isChecked: boolean;
}

export const OptionItems: OptionItem[] = [
  {
    option: OptionEnum.UPPERCASE_LETTERS,
    isChecked: false,
  },
  {
    option: OptionEnum.LOWERCASE_LETTERS,
    isChecked: false,
  },
  {
    option: OptionEnum.NUMBERS,
    isChecked: false,
  },
  {
    option: OptionEnum.SYMBOLS,
    isChecked: false,
  },
];
