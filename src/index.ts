import { XYZString } from "./string";
import { XYZNumber } from "./number";
import { XYZLiteral } from "./literal";
import { XYZObject } from "./object";
import { XYZType } from "./type";

const xyz = {
  string() {
    return new XYZString();
  },
  literal<T extends string>(literal: T) {
    return new XYZLiteral(literal);
  },
  number() {
    return new XYZNumber();
  },
  object<Shape extends XYZType["_def"]>(shape: Shape) {
    return new XYZObject(shape);
  },
};

export default xyz;
