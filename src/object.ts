import { XYZObjectShape, XYZType } from "./type";

type UndefinedKeys<T> = keyof { [K in keyof T]: T[K] extends undefined ? never : T[K] };
type CombinedProperties<T> = Partial<Pick<T, UndefinedKeys<T>>> & Omit<T, UndefinedKeys<T>>;
type OptionalUndefined<T> = { [K in keyof CombinedProperties<T>]: NonNullable<T[K]> };

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
