import { XYZType } from "./type";

export class XYZArray<Schema extends XYZType> extends XYZType<
  ReturnType<Schema["parse"]>[],
  ReturnType<Schema["parse"]>[]
> {
  constructor(schema: Schema) {
    super();
    this._primitive = "object";

    this._checks.push((input) => {
      input.forEach((input) => {
        const result = schema.safeParse(input);

        if (result.errors) {
          this._errors.push(...result.errors);
        }
      });
    });
  }
}
