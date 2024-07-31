import XYZErrors from "./errors";

export type Primitives = "string" | "object" | "undefined" | "number";

export abstract class XYZType<
  Input = any,
  Output = Input,
  Def extends { [x: string]: XYZType } = { [x: string]: XYZType },
> {
  _input: Input;
  _def: Def;
  _output: Output;
  _primitive: Primitives;

  _errors: string[] = [];
  _checks: ((input: Input) => void)[] = [];
  _optional: boolean = false;

  optional() {
    return new XYZOptional();
  }

  transform<Transform extends (input: Input) => any>(fn: Transform) {
    return new XYZTransform(fn, this._primitive);
  }

  protected _transform(input): Output {
    return input;
  }

  protected _typeCheck(input: unknown): input is Input {
    if (this._optional && input === undefined) {
      return false;
    } else if (typeof input !== this._primitive) {
      this._errors.push(XYZErrors.invalidType(this._primitive, typeof input));
      return false;
    }

    return true;
  }

  safeParse(input: unknown) {
    //@ts-ignore
    this._input = input;
    //@ts-ignore
    this._output = input;

    if (this._typeCheck(input)) {
      this._checks.forEach((check) => check.call(this, input));
    }

    if (!this._errors.length) {
      return { errors: null, value: this._transform(input) };
    } else {
      return { errors: this._errors, value: input };
    }
  }

  parse(input: unknown) {
    const { errors, value } = this.safeParse(input);

    if (errors) {
      throw new Error(errors.join("\n"));
    } else {
      return value;
    }
  }
}
class XYZOptional<T extends XYZType> extends XYZType<T["_input"] | undefined, T["_output"] | undefined> {
  _optional: boolean = true;

  constructor() {
    super();
  }
}

class XYZTransform<T extends XYZType, Output> extends XYZType<T["_input"], Output, T["_def"]> {
  constructor(transform: (input: T["_input"]) => Output, primitive: T["_primitive"]) {
    super();
    this._transform = transform;
    this._primitive = primitive;
  }
}
