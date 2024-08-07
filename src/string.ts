import { XYZBaseType, config, common } from "./base";
import XYZErrors from "./errors";

type XYZString = XYZBaseType<string, string> & {
  min: (min: number) => XYZString;
  max: (max: number) => XYZString;
  length: (length: number) => XYZString;
};

export function string(): XYZString {
  const cfg = config("string");

  return {
    ...common(cfg),
    min(min: number) {
      cfg._checks.push((input) => {
        if (input.length < min) {
          cfg._errors.push(XYZErrors.invalidMin(min, input.length, "length"));
        }
      });

      return this;
    },
    max(max: number) {
      cfg._checks.push((input) => {
        if (input.length > max) {
          cfg._errors.push(XYZErrors.invalidMax(max, input.length, "length"));
        }
      });

      return this;
    },
    length(length: number) {
      cfg._checks.push((input) => {
        if (input.length !== length) {
          cfg._errors.push(XYZErrors.invalidLength(length, input.length));
        }
      });

      return this;
    },
  };
}
