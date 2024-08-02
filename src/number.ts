import { XYZBaseType, config, common } from "./base";
import XYZErrors from "./errors";

type XYZNumber = XYZBaseType<number, number> & { min: (min: number) => XYZNumber; max: (max: number) => XYZNumber };

export function number(): XYZNumber {
  const cfg = config("number");

  return {
    ...common(cfg),
    min(min: number) {
      cfg._checks.push((input) => {
        if (input < min) {
          cfg._errors.push(XYZErrors.invalidLength(min, input, "min"));
        }
      });

      return this;
    },
    max(max: number) {
      cfg._checks.push((input) => {
        if (input > max) {
          cfg._errors.push(XYZErrors.invalidLength(max, input, "max"));
        }
      });

      return this;
    },
  };
}
