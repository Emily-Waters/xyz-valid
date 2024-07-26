import XYZObject from "./object";
import XYZString from "./string";
export class XYZType<Input = any, Output = any> {
  isOptional: boolean = false;
  checks: ((value: Input) => void)[] = [];
  errors: string[] = [];

  string() {
    return XYZString.create();
  }

  object(shape: Parameters<typeof XYZObject.create>[0]) {
    return XYZObject.create(shape);
  }

  _parse(value: Input) {
    if (!this.isOptional && value !== undefined) {
      this.checks.forEach((check) => check(value));
    }

    return this;
  }

  parse(value: Input) {
    this._parse(value);

    if (this.errors.length) {
      throw new Error(this.errors.join("\n"));
    }

    return value;
  }
}
