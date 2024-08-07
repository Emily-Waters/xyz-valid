export default class XYZErrors {
  static invalidType<T>(expected: T, received?: string) {
    return `Invalid Type: Expected ${expected}, received ${received}`;
  }

  static invalidMin(expected: number, received: number, mod: "length" | "range") {
    return `Invalid Min: Expected min ${mod} ${expected}, received ${received}`;
  }

  static invalidMax(expected: number, received: number, mod: "length" | "range") {
    return `Invalid Max: Expected max ${mod} ${expected}, received ${received}`;
  }

  static invalidLength(expected: number, received: number) {
    return `Invalid Length: Expected length ${expected}, received length ${received}`;
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

  static invalidCompare() {
    return `Invalid Compare`;
  }
}
