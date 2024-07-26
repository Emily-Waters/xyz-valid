import XYZErrors from "./errors";
import { XYZType } from "./type";

function create() {
  class XYZNumber extends XYZType<any, number> {
    constructor() {
      super();
      this.primitive = "number";
    }

    min(n: number) {
      this.checks.push((value) => {
        if (typeof value === this.primitive && value < n) {
          this.errors.push(XYZErrors.invalidLength(n, value, "min"));
        }
      });

      return this;
    }

    max(n: number) {
      this.checks.push((value) => {
        if (typeof value === this.primitive && value > n) {
          this.errors.push(XYZErrors.invalidLength(n, value, "max"));
        }
      });

      return this;
    }
  }

  return new XYZNumber();
}

export default { create };
