export class XYZType<Input = any, Output = any> {
  checks: ((value: Input) => void)[];

  _parse(value: Input) {
    this.checks.forEach((check) => check(value));
    return this;
  }
}
