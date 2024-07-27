import XYZErrors from "./errors";
import { XYZType } from "./type";

function create<T extends string>(literal: T) {
  class XYZLiteral extends XYZType<any, T> {
    constructor() {
      super();
      this.primitive = "string";

      this.checks.push((value) => {
        if (value !== literal) {
          this.errors.push(XYZErrors.invalidLiteral(literal, value));
        }
      });
    }
  }

  return new XYZLiteral();
}

export default { create };
