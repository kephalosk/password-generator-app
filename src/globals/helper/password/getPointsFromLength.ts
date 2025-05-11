import { LONG_STRING_LENGTH, SHORT_STRING_LENGTH } from "@/globals/config.ts";

const getPointsFromLength = (password: string): number => {
  if (!password.length) {
    return 0;
  }
  if (password.length < SHORT_STRING_LENGTH) {
    return 1;
  }
  if (password.length < LONG_STRING_LENGTH) {
    return 2;
  }
  return 3;
};

export default getPointsFromLength;
