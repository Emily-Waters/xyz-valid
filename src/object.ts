import { XYZBaseType, config, common, BaseTypes } from "./base";
import XYZErrors from "./errors";

type Def = { [x: string]: BaseTypes };

type XYZObject<TDef extends Def> = XYZBaseType<
  { [K in keyof TDef]: ReturnType<TDef[K]["parse"]> },
  { [K in keyof TDef]: ReturnType<TDef[K]["parse"]> }
> & { strict: () => Omit<XYZObject<TDef>, "strict"> };

export function object<TDef extends Def>(def: TDef): XYZObject<TDef> {
  const cfg = config("object");
  let strict = false;

  cfg._checks.push((input) => {
    cfg._output = {};

    if (strict) {
      const unrecognizedKeys = [];
      for (const key in input) {
        if (!def[key]) {
          unrecognizedKeys.push(key);
        }
      }

      if (unrecognizedKeys.length) {
        cfg._errors.push(XYZErrors.invalidKeys(unrecognizedKeys));
      }
    }

    for (const key in def) {
      const result = def[key].safeParse(input[key]);

      if (result.errors) {
        cfg._errors.push(...result.errors);
      } else {
        cfg._output[key] = result.value;
      }
    }
  });

  return {
    ...common(cfg),
    strict() {
      strict = true;
      return common(cfg);
    },
  };
}
