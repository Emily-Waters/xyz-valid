import XYZErrors from "./errors";
import { XYZType } from "./type";

export class XYZLiteral<T> extends XYZType<T, T> {
  constructor(literal: T) {
    super();
    this._primitive = "string";

    this._checks.push((input) => {
      if (input !== literal) {
        this._errors.push(XYZErrors.invalidLiteral(literal, input));
      }
    });
  }
}
