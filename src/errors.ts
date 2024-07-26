export default class XYZErrors {
  static invalidType<T>(expected: T, received?: string) {
    return `Invalid Type: Expected ${expected}, received ${received}`;
  }

  static invalidLength(expected: number, received: number, min: boolean) {
    return `Invalid Length: Expected ${min ? "min" : "max"} length ${expected} but received length ${received}`;
  }

  static invalidLiteral<T>(expected: T, received: any) {
    return `Invalid Literal : Expected "${expected}", received "${received}"`;
  }

  static invalidStrict<E, R>(expected: E, received: R) {
    return `Invalid Strict Object: Expected ${expected}, received ${received}`;
  }
}
