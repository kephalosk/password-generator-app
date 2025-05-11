import { OptionItem } from "@/globals/constants/OptionItems.ts";
import { PasswordGenerationHook } from "@/globals/models/types/PasswordGenerationTypes.ts";
import getAvailableCharacters from "@/globals/helper/password/getAvailableCharacters.ts";
import calculatePassword from "@/globals/helper/password/calculatePassword.ts";
import isEverySelectedOptionIncluded from "@/globals/helper/password/isEverySelectedOptionIncluded.ts";
import { ALERT_MISSING_OPTION } from "@/globals/constants/AlertMessages.ts";

const usePasswordGeneration = (
  currentOptions: OptionItem[],
  characterLength: number,
): PasswordGenerationHook => {
  const generatePassword = (): string => {
    const availableCharacters: string = getAvailableCharacters(currentOptions);

    if (!availableCharacters) {
      alert(ALERT_MISSING_OPTION);
      return "";
    }

    let password: string = "";
    let passwordHasAllOptions: boolean = false;
    while (!passwordHasAllOptions) {
      password = calculatePassword(availableCharacters, characterLength);

      if (isEverySelectedOptionIncluded(password, currentOptions)) {
        passwordHasAllOptions = true;
      }
    }

    return password;
  };

  return { generatePassword };
};

export default usePasswordGeneration;
