import XYZObject from "./object";
import XYZString from "./string";
import XYZOptional from "./optional";
import XYZErrors from "./errors";
import XYZNumber from "./number";
import XYZLiteral from "./literal";
import XYZTransform from "./transform";

export type Primitives = "string" | "object" | "undefined" | "number";
export class XYZType<Input = any, Output = any> {
  primitive: Primitives;
  transformFn?: <T>(value: Input) => T;
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

  literal<T extends string>(literal: T) {
    return XYZLiteral.create(literal);
  }

  optional() {
    return XYZOptional.create();
  }

  transform<T extends (...args: any) => any>(transform: T) {
    return XYZTransform.create(this.primitive, transform);
  }

  safeParse(value) {
    this.typeCheck(value);

    if (!this.errors.length) {
      this.checks.forEach((check) => check(value));
    }

    if (this.errors.length) {
      return { errors: this.errors, value };
    } else {
      return { value };
    }
  }

  parse(value: Input) {
    this.safeParse(value);

    if (this.errors.length) {
      throw new Error(this.errors.join("\n"));
    }

    if (this.transformFn) {
      return this.transformFn<Output>(value) as unknown as Output;
    }

    return value as unknown as Output;
  }
}
