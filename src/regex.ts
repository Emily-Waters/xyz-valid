import XYZErrors from "./errors";
import { XYZString } from "./string";
import { XYZType } from "./type";

export class XYZRegex extends XYZString<string, string> {
  constructor(regex: RegExp) {
    super();

    this._checks.push((input) => {
      if (!regex.test(input)) {
        this._errors.push(XYZErrors.invalidRegex(regex, input));
      }
    });
  }
}
