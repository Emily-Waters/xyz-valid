import { XYZType } from "./type";

type ExtractOptional<T> = {
  [K in keyof T as Extract<T[K], undefined> extends never ? never : K]+?: T[K];
};

type ExtractRequired<T> = Omit<{ [K in keyof T]: T[K] }, keyof ExtractOptional<T>>;
type OptionalUndefined<T> = ExtractRequired<T> & ExtractOptional<T>;

export class XYZObject<Shape extends XYZType["_def"]> extends XYZType<
  OptionalUndefined<{ [K in keyof Shape]: ReturnType<Shape[K]["parse"]> }>,
  OptionalUndefined<{ [K in keyof Shape]: ReturnType<Shape[K]["parse"]> }>,
  XYZType["_def"]
> {
  constructor(shape: XYZType["_def"]) {
    super();
    this._primitive = "object";
    this._def = shape;

    this._checks.push((input) => {
      for (const key in shape) {
        const result = shape[key].safeParse(input[key]);

        if (result.errors) {
          this._errors.push(...result.errors);
        }
      }
    });
  }
}
