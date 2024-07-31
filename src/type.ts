import XYZErrors from "./errors";

export type Primitives = "string" | "object" | "undefined" | "number" | "regex";

export abstract class XYZType<
  TInput = any,
  TOutput = TInput,
  TDef extends { [K in keyof TInput]: TInput[K] } = { [K in keyof TInput]: TInput[K] },
> {
  _input: TInput;
  _def: TDef;
  _output: TOutput;
  _primitive: Primitives;

  _errors: string[] = [];
  _checks: ((input: TInput) => void)[] = [];
  _optional: boolean = false;

  optional() {
    return new XYZOptional<this>();
  }

  transform<Transform extends (input: TInput) => any>(fn: Transform) {
    return new XYZTransform<this, ReturnType<typeof fn>>(fn, this._primitive);
  }

  protected _transform(input): TOutput {
    return input;
  }

  protected _typeCheck(input: unknown): input is TInput {
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
class XYZOptional<TType extends XYZType> extends XYZType<
  TType["_input"] | undefined,
  TType["_output"] | undefined,
  TType["_def"]
> {
  _optional: boolean = true;

  constructor() {
    super();
  }
}

class XYZTransform<TType extends XYZType, TOutput> extends XYZType<TType["_input"], TOutput, TType["_def"]> {
  constructor(transform: (input: TType["_input"]) => TOutput, primitive: TType["_primitive"]) {
    super();
    this._transform = transform;
    this._primitive = primitive;
  }
}
