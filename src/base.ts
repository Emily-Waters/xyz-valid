import XYZErrors from "./errors";

export type Primitives = "string" | "number" | "object";

export type XYZBaseType<TInput = unknown, TOutput = unknown> = {
  safeParse: (input: unknown) => { errors: string[]; value: unknown } | { errors: null; value: TOutput };
  parse: (input: unknown) => TOutput;
  optional: () => Omit<XYZBaseType<TInput | undefined, TOutput | undefined>, "optional">;
  transform: <TTransform extends (input: TOutput) => any>(
    t: TTransform
  ) => Omit<XYZBaseType<TInput, ReturnType<TTransform>>, "optional" | "transform">;
};
export type BaseTypes = XYZBaseType | ReturnType<XYZBaseType["optional"]> | ReturnType<XYZBaseType["transform"]>;

export type XYZConfig<TInput = any, TOutput = any> = {
  _checks: ((input: TInput) => void)[];
  _input: TInput;
  _output: TOutput;
  _errors: string[];
  _optional: boolean;
  _type: Primitives;
  _transform?: <NewOutput>(input: TOutput) => NewOutput;
};

export function typeCheck<TConfig extends XYZConfig>(config: TConfig, input: unknown): input is TConfig["_output"] {
  if (typeof input === config._type) {
    return true;
  } else if (config._optional && input === undefined) {
    config._checks = [];
    return true;
  } else {
    config._errors.push(XYZErrors.invalidType(config._type, typeof input));
    return false;
  }
}

export function safeParse<TConfig extends XYZConfig>(
  config: TConfig,
  input: unknown
): { errors: null; value: TConfig["_output"] } | { errors: string[]; value: TConfig["_input"] } {
  config._input = input;

  if (typeCheck(config, input)) {
    config._checks.forEach((check) => check(input));
    config._output = input;

    if (!config._errors.length) {
      if (config._transform) {
        config._output = config._transform(config._output);
      }

      return { errors: null, value: config._output };
    }
  }

  return { errors: config._errors, value: input };
}

export function parse<TConfig extends XYZConfig>(config: TConfig, input: unknown) {
  const { errors, value } = safeParse(config, input);

  if (errors) {
    throw new Error(errors.join("\n"));
  }

  return value;
}

export function config<T extends Primitives>(type: T): XYZConfig {
  return {
    _type: type,
    _input: null,
    _output: null,
    _checks: [],
    _errors: [],
    _optional: false,
  };
}

export function common<TConfig extends XYZConfig>(cfg: TConfig): XYZBaseType<TConfig["_input"], TConfig["_output"]> {
  return {
    safeParse(input) {
      return safeParse(cfg, input);
    },
    parse(input) {
      return parse(cfg, input);
    },
    optional() {
      cfg._optional = true;
      return { parse: this.parse, safeParse: this.safeParse, transform: this.transform };
    },
    transform(t) {
      cfg._transform = t;
      return { parse: this.parse, safeParse: this.safeParse };
    },
  };
}
