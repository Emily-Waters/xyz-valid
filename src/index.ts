import { XYZString } from "./string";
import { XYZNumber } from "./number";
import { XYZLiteral } from "./literal";
import { XYZObject } from "./object";
import { XYZType } from "./type";
import { XYZRegex } from "./regex";
import { XYZArray } from "./array";
import { XYZEnum } from "./enum";

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
  enum<TSchema extends Array<string>>(schema: { [K in keyof TSchema]: TSchema[K] }) {
    return new XYZEnum(schema);
  },
};

export default xyz;
