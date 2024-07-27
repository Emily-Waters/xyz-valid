import { XYZType } from "./type";

function create<Shape extends { [x: string]: XYZType }>(shape: Shape) {
  class XYZObject extends XYZType<any, { [K in keyof Shape]: ReturnType<Shape[K]["parse"]> }> {
    constructor(public shape: Shape) {
      super();
      this.primitive = "object";

      this.checks.push((value) => {
        for (const key in shape) {
          const errors = this.shape[key].safeParse(value[key]).errors;

          if (errors) {
            this.errors.push(...errors);
          }
        }
      });
    }
  }

  return new XYZObject(shape);
}

export default { create };
