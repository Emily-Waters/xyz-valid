import { parse, safeParse, XYZBaseType, XYZConfig } from "./base";

export function string(): XYZBaseType<string, string> & { min: (min: number) => void; max: (max: number) => void } {
  type ConfigType = XYZConfig<string, string>;

  let _output: ConfigType["_output"] = "";
  let _input: ConfigType["_input"] = "";

  const config: ConfigType = {
    _input,
    _output,
    _checks: [],
    _errors: [],
    _type: "string",
    _optional: false,
  };

  return {
    safeParse(input) {
      return safeParse(config, input);
    },
    parse(input) {
      return parse(config, input);
    },
    min(min: number) {
      config._checks.push((input) => {
        if (input.length < min) {
        }
      });
    },
    max(max: number) {},
    optional() {
      config._optional = true;
      return { parse: this.parse, safeParse: this.safeParse };
    },
  };
}
