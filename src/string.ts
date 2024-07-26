import XYZErrors from "./errors";
import { Primitives, XYZType } from "./type";

function create() {
  class XYZString extends XYZType<any, string> {
    primitive: Primitives = "string";

    constructor() {
      super();
    }
  }

  return new XYZString();
}

export default { create };
