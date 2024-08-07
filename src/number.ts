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
          cfg._errors.push(XYZErrors.invalidMin(min, input, "range"));
        }
      });

      return this;
    },
    max(max: number) {
      cfg._checks.push((input) => {
        if (input > max) {
          cfg._errors.push(XYZErrors.invalidMax(max, input, "range"));
        }
      });

      return this;
    },
  };
}
