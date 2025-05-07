import { OptionEnum } from "@/globals/constants/OptionEnum.ts";
import { OptionKeyEnum } from "@/globals/constants/OptionKeyEnum.ts";

export interface OptionItem {
  key: OptionKeyEnum;
  option: OptionEnum;
  isChecked: boolean;
}

export const OptionItems: OptionItem[] = [
  {
    key: OptionKeyEnum.UPPERCASE_LETTERS,
    option: OptionEnum.UPPERCASE_LETTERS,
    isChecked: false,
  },
  {
    key: OptionKeyEnum.LOWERCASE_LETTERS,
    option: OptionEnum.LOWERCASE_LETTERS,
    isChecked: false,
  },
  {
    key: OptionKeyEnum.NUMBERS,
    option: OptionEnum.NUMBERS,
    isChecked: false,
  },
  {
    key: OptionKeyEnum.SYMBOLS,
    option: OptionEnum.SYMBOLS,
    isChecked: false,
  },
];
