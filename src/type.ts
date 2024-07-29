import XYZObject from "./object";
import XYZString from "./string";
import XYZOptional from "./optional";
import XYZErrors from "./errors";
import XYZNumber from "./number";
import XYZLiteral from "./literal";
import XYZTransform from "./transform";

export type XYZObjectShape<T = unknown> = T extends unknown
  ? { [x: string]: XYZType }
  : { [K in keyof T]: XYZType<any, T[K]> };

export type Primitives = "string" | "object" | "undefined" | "number";
export class XYZType<Input = any, Output = any> {
  primitive: Primitives;
  transformFn: (value: Input) => Output = (val) => val as unknown as Output;
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

  object<Shape extends { [x: string]: unknown }>(shape: {
    [K in keyof Shape]: XYZType<any, Shape[K]> extends infer X ? X : never;
  }) {
    return XYZObject.create(shape);
  }

  number() {
    return XYZNumber.create();
  }

  literal<Literal extends string>(literal: Literal) {
    return XYZLiteral.create(literal);
  }

  optional() {
    return XYZOptional.create<Output>();
  }

  transform<Transform extends (value: Output) => any>(transform: Transform) {
    return XYZTransform.create<Output, ReturnType<Transform>, Transform>(this.primitive, transform);
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

  parse(value) {
    this.safeParse(value);

    if (this.errors.length) {
      throw new Error(this.errors.join("\n"));
    } else {
      return this.transformFn(value);
    }
  }
}
