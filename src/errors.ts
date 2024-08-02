export default class XYZErrors {
  static invalidType<T>(expected: T, received?: string) {
    return `Invalid Type: Expected ${expected}, received ${received}`;
  }

  static invalidLength(expected: number, received: number, mod: "min" | "max") {
    return `Invalid Length: Expected ${mod} length of ${expected} but received length ${received}`;
  }

  static invalidLiteral<T>(expected: T, received: any) {
    return `Invalid Literal: Expected "${expected}", received "${received}"`;
  }

  static invalidStrict<E, R>(expected: E, received: R) {
    return `Invalid Strict Object: Expected ${expected}, received ${received}`;
  }

  static invalidRegex<T>(expected: T, received?: string) {
    return `Invalid Regex: Expected ${expected}, received ${received}`;
  }

  static invalidKeys(keys: string[]) {
    return `Invalid Key: Unrecognized keys "${keys.join(", ")}"`;
  }

  static invalidEnumMember<T extends Array<string>>(expected: T, received: string) {
    return `Invalid Enum Member: Expected "${expected.join(`" | "`)}", received "${received}"`;
  }
}
