import { XYZBaseType, config, common, BaseTypes } from "./base";
import XYZErrors from "./errors";

type XYZEnum<T extends string> = XYZBaseType<T, T>;

export function enumValidator<T extends Array<string>>(def: T): XYZEnum<T[number]> {
  const cfg = config("string");

  cfg._checks.push((input) => {
    if (!def.includes(input)) {
      cfg._errors.push(XYZErrors.invalidEnumMember(def, input));
    }
  });

  return { ...common(cfg) };
}
