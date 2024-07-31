import { XYZType } from "./type";

export class XYZObject<Shape extends XYZType["_def"]> extends XYZType<
  { [K in keyof Shape]: ReturnType<Shape[K]["parse"]> },
  { [K in keyof Shape]: ReturnType<Shape[K]["parse"]> },
  Shape
> {
  constructor(shape: Shape) {
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
