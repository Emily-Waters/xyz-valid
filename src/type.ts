import XYZObject from "./object";
import XYZString from "./string";
import XYZOptional from "./optional";
import XYZErrors from "./errors";
import XYZNumber from "./number";

export type Primitives = "string" | "object" | "undefined" | "number";
export class XYZType<Input = any, Output = any> {
  primitive: Primitives;
  isOptional: boolean = false;
  checks: ((value: Input) => void)[] = [];
  errors: string[] = [];

  protected typeCheck = (value: Input) => {
    if (this.isOptional && value === undefined) {
      this.checks = [];
    } else if (this.primitive !== typeof value) {
      this.errors.push(XYZErrors.invalidType(this.primitive, typeof value));
    }
  };

  string() {
    return XYZString.create();
  }

  object<Shape extends { [x: string]: XYZType }>(shape: Shape) {
    return XYZObject.create(shape);
  }

  number() {
    return XYZNumber.create();
  }

  optional() {
    return XYZOptional.create();
  }

  _parse(value: Input) {
    this.typeCheck(value);
    this.checks.forEach((check) => check(value));

    return this;
  }

  parse(value: Input) {
    this._parse(value);

    if (this.errors.length) {
      throw new Error(this.errors.join("\n"));
    }

    return value as unknown as Output;
  }
}
