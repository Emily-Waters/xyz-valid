import { Primitives, XYZType } from "./type";

function create<Input, Transform extends (value: Input) => any>(primitive: Primitives, transform: Transform) {
  class XYZTransform extends XYZType<Input, ReturnType<typeof transform>> {
    constructor() {
      super();
      this.primitive = primitive;
      this.transformFn = transform;
    }
  }

  return new XYZTransform();
}

export default { create };
