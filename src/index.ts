import { XYZString } from "./string";
import { XYZNumber } from "./number";
import { XYZLiteral } from "./literal";
import { XYZObject } from "./object";
import { XYZType } from "./type";
import { XYZRegex } from "./regex";
import { XYZArray } from "./array";

const xyz = {
  string() {
    return new XYZString();
  },
  literal<T extends string>(literal: T) {
    return new XYZLiteral(literal);
  },
  regex(regex: RegExp) {
    return new XYZRegex(regex);
  },
  number() {
    return new XYZNumber();
  },
  object<Shape extends XYZType["_def"]>(shape: Shape) {
    return new XYZObject(shape);
  },
  array<TSchema extends XYZType>(schema: TSchema) {
    return new XYZArray(schema);
  },
};

export default xyz;
