import XYZObject from "./object";
import XYZString from "./string";
import XYZOptional from "./optional";
import XYZErrors from "./errors";
import XYZNumber from "./number";
import XYZLiteral from "./literal";
import XYZTransform from "./transform";

export type Primitives = "string" | "object" | "undefined" | "number";
export class XYZType<Input = any, Output = any> {
  protected primitive: Primitives;
  protected _transform: (value: Input) => Output = (val) => val as unknown as Output;
  protected isOptional: boolean = false;
  protected checks: ((value: Input) => void)[] = [];
  protected errors: string[] = [];

  protected typeCheck = (value: unknown): value is Input => {
    if (this.isOptional && value === undefined) {
      this.checks = [];
      return true;
    } else if (this.primitive !== typeof value) {
      this.errors.push(XYZErrors.invalidType(this.primitive, typeof value));
      return false;
    }

    return true;
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

  literal<Literal extends string>(literal: Literal) {
    return XYZLiteral.create(literal);
  }

  optional() {
    return XYZOptional.create<Output>();
  }

  transform<Transform extends (value: Output) => any>(transform: Transform) {
    return XYZTransform.create<Output, ReturnType<Transform>, Transform>(this.primitive, transform);
  }

  safeParse(value: unknown) {
    if (this.typeCheck(value)) {
      if (!this.errors.length) {
        this.checks.forEach((check) => check(value));
      }

      if (!this.errors.length) {
        return { errors: null, value };
      }
    }

    return { errors: this.errors, value };
  }

  parse(value: unknown) {
    const { errors, value: val } = this.safeParse(value);

    if (errors) {
      throw new Error(this.errors.join("\n"));
    } else if (this.typeCheck(val)) {
      return this._transform(val);
    }

    return val;
  }
}
