import { Primitives, XYZType } from "./type";

function create<Shape extends { [x: string]: XYZType }>(shape: Shape) {
  class XYZObject extends XYZType<any, { [K in keyof Shape]: ReturnType<Shape[K]["parse"]> }> {
    primitive: Primitives = "object";

    constructor(public shape: Shape) {
      super();

      this.checks.push((value) => {
        for (const key in shape) {
          this.errors.push(...this.shape[key]._parse(value[key]).errors);
        }
      });
    }
  }

  return new XYZObject(shape);
}

export default { create };
