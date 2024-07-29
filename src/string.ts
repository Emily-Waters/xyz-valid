import XYZErrors from "./errors";
import { XYZType } from "./type";

function create() {
  class XYZString extends XYZType<string, string> {
    constructor() {
      super();
      this.primitive = "string";
    }

    min(n: number) {
      this.checks.push((value) => {
        if (value.length < n) {
          this.errors.push(XYZErrors.invalidLength(value.length, n, "min"));
        }
      });

      return this;
    }
    max(n: number) {
      this.checks.push((value) => {
        if (value.length > n) {
          this.errors.push(XYZErrors.invalidLength(value.length, n, "max"));
        }
      });

      return this;
    }
  }

  return new XYZString();
}

export default { create };
