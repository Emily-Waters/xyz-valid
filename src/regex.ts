import { XYZBaseType, config, common } from "./base";
import XYZErrors from "./errors";

type XYZRegex = XYZBaseType & { min: (min: number) => XYZRegex; max: (max: number) => XYZRegex };

export function regex<T extends RegExp>(def: T): XYZRegex {
  const cfg = config("string");

  cfg._checks.push((input) => {
    if (!def.test(input)) {
      cfg._errors.push(XYZErrors.invalidRegex(def, input));
    }
  });

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
