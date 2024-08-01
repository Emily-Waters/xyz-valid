import XYZErrors from "./errors";
import { InferType, XYZType } from "./type";

export class XYZObject<Shape extends XYZType["_def"]> extends XYZType<
  { [K in keyof Shape]: InferType<Shape[K]> },
  { [K in keyof Shape]: InferType<Shape[K]> },
  Shape
> {
  private _strict: boolean = false;

  constructor(shape: Shape) {
    super();
    this._primitive = "object";
    this._def = shape;

    this._checks.push((input) => {
      if (this._strict) {
        const inputKeys = Object.keys(input);
        const shapeKeys = Object.keys(shape);

        if (inputKeys.length !== shapeKeys.length) {
          this._errors.push(XYZErrors.invalidStrict(shape, input));
        }

        for (const key of inputKeys) {
          if (!(key in shape)) {
            this._errors.push(XYZErrors.invalidKey(shape, key));
          }
        }
      }

      for (const key in shape) {
        const result = shape[key].safeParse(input[key]);

        if (result.errors) {
          this._errors.push(...result.errors);
        }
      }
    });
  }

  strict() {
    this._strict = true;

    return this;
  }
}
