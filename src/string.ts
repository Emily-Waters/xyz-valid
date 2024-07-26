import XYZErrors from "./errors";
import { XYZType } from "./type";

function create() {
  class XYZString extends XYZType<any, string> {
    constructor() {
      super();
      this.checks.push((value) => {
        if (typeof value !== "string") {
          this.errors.push(XYZErrors.invalidType("string", typeof value));
        }
      });
    }
  }

  return new XYZString();
}

export default { create };
