import XYZErrors from "./errors";

export type Primitives = "string" | "object" | "undefined" | "number" | "regex";
export type InferType<T extends XYZType> = ReturnType<T["parse"]>;

export abstract class XYZType<
  TInput = any,
  TOutput = TInput,
  TDef extends { [K in keyof TInput]: TInput[K] } = { [K in keyof TInput]: TInput[K] },
> {
  readonly _input: TInput;
  readonly _output: TOutput;
  _def: TDef;
  _primitive: Primitives;

  readonly _errors: string[] = [];
  readonly _checks: ((input: TInput) => void)[] = [];
  _optional: boolean = false;

  optional() {
    this._optional = true;
    return new XYZOptional<this>(this);
  }

  transform<Transform extends (input: TInput) => any>(fn: Transform) {
    this._transform = fn;
    return new XYZTransform<this, ReturnType<typeof fn>>(this);
  }

  protected _transform(input: unknown): TOutput {
    return input as TOutput;
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
    if (this._typeCheck(input)) {
      this._checks.forEach((check) => check(input));
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
  constructor(parent: TType) {
    super();

    for (const key in { ...this, ...parent }) {
      this[key] = parent[key];
    }
  }
}

class XYZTransform<TType extends XYZType, TOutput> extends XYZType<TType["_input"], TOutput, TType["_def"]> {
  constructor(parent: TType) {
    super();

    for (const key in { ...this, ...parent }) {
      this[key] = parent[key];
    }
  }
}
