import XYZErrors from "./errors";
import { XYZType } from "./type";

export class XYZNumber extends XYZType<number, number> {
  constructor() {
    super();
    this._primitive = "number";
  }

  min(n: number) {
    this._checks.push((input) => {
      if (input < n) {
        this._errors.push(XYZErrors.invalidLength(n, input, "min"));
      }
    });

    return this;
  }

  max(n: number) {
    this._checks.push((input) => {
      if (input > n) {
        this._errors.push(XYZErrors.invalidLength(n, input, "max"));
      }
    });

    return this;
  }
}
