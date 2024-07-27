import { XYZType } from "./type";

function create() {
  class XYZString extends XYZType<any, string> {
    constructor() {
      super();
      this.primitive = "string";
    }
  }

  return new XYZString();
}

export default { create };
