import XYZErrors from "./errors";
import { XYZType } from "./type";

export class XYZString<TInput extends string, TOutput extends string> extends XYZType<TInput, TOutput, any> {
  constructor() {
    super();
    this._primitive = "string";
  }

  min(min: number) {
    this._checks.push((input) => {
      if (input.length < min) {
        this._errors.push(XYZErrors.invalidLength(min, input.length, "min"));
      }
    });

    return this;
  }

  max(max: number) {
    this._checks.push((input) => {
      if (input.length > max) {
        this._errors.push(XYZErrors.invalidLength(max, input.length, "max"));
      }
    });

    return this;
  }
}
