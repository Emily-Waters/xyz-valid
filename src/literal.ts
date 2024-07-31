import XYZErrors from "./errors";
import { XYZType } from "./type";

export class XYZLiteral<TLiteral extends string> extends XYZType<TLiteral, TLiteral> {
  constructor(literal: TLiteral) {
    super();
    this._primitive = "string";

    this._checks.push((input) => {
      if (input !== literal) {
        this._errors.push(XYZErrors.invalidLiteral(literal, input));
      }
    });
  }
}
