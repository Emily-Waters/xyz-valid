import { Primitives, XYZType } from "./type";

function create<Output>() {
  class XYZOptional extends XYZType<any, Output | undefined> {
    constructor() {
      super();
      this.primitive = "undefined";
    }
  }

  return new XYZOptional();
}

export default { create };
