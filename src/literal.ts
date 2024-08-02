import { XYZBaseType, config, common } from "./base";
import XYZErrors from "./errors";

type XYZLiteral<T> = XYZBaseType<T, T>;

export function literal<T extends string>(def: T): XYZLiteral<T> {
  const cfg = config("string");

  cfg._checks.push((input) => {
    if (input !== def) {
      cfg._errors.push(XYZErrors.invalidLiteral(def, input));
    }
  });

  return { ...common(cfg) };
}
