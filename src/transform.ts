import { Primitives, XYZType } from "./type";

function create<Input, Output, Transform extends (value: Input) => Output>(
  primitive: Primitives,
  transform: Transform
) {
  class XYZTransform extends XYZType<Input, Output> {
    constructor() {
      super();
      this.primitive = primitive;
      this._transform = transform;
    }
  }

  return new XYZTransform();
}

export default { create };
