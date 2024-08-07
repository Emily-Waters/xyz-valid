import { XYZBaseType, config, common } from "./base";
import XYZErrors from "./errors";

type XYZRegex = XYZBaseType<string, string>;

export function regex<T extends RegExp>(def: T): XYZRegex {
  const cfg = config("string");

  cfg._checks.push((input) => {
    if (!def.test(input)) {
      cfg._errors.push(XYZErrors.invalidRegex(def, input));
    }
  });

  return {
    ...common(cfg),
  };
}
