import XYZErrors from "./errors";
import { XYZType } from "./type";

export class XYZEnum<T extends Array<string>> extends XYZType<T[number], T[number]> {
  constructor(schema: T) {
    super();
    this._primitive = "string";

    this._checks.push((input) => {
      if (!schema.includes(input)) {
        this._errors.push(XYZErrors.invalidEnumMember(schema, input));
      }
    });
  }
}
