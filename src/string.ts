import { XYZBaseType, config, common } from "./base";
import XYZErrors from "./errors";

type XYZString = XYZBaseType<string, string> & { min: (min: number) => XYZString; max: (max: number) => XYZString };

export function string(): XYZString {
  const cfg = config("string");

  return {
    ...common(cfg),
    min(min: number) {
      cfg._checks.push((input) => {
        if (input.length < min) {
          cfg._errors.push(XYZErrors.invalidLength(min, input.length, "min"));
        }
      });

      return this;
    },
    max(max: number) {
      cfg._checks.push((input) => {
        if (input.length > max) {
          cfg._errors.push(XYZErrors.invalidLength(max, input.length, "max"));
        }
      });

      return this;
    },
  };
}
