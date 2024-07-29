import { XYZObjectShape, XYZType } from "./type";

type ExtractOptional<T> = {
  [K in keyof T as Extract<T[K], undefined> extends never ? never : K]+?: NonNullable<T[K]>;
};

type ExtractRequired<T> = Omit<{ [K in keyof T]: T[K] }, keyof ExtractOptional<T>>;
type OptionalUndefined<T> = ExtractRequired<T> & ExtractOptional<T>;

function create<Shape extends XYZObjectShape>(shape: Shape) {
  class XYZObject extends XYZType<
    OptionalUndefined<{ [K in keyof Shape]: ReturnType<Shape[K]["parse"]> }>,
    OptionalUndefined<{ [K in keyof Shape]: ReturnType<Shape[K]["parse"]> }>
  > {
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
