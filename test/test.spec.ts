// import xyz from "../src";

// describe("Parse", () => {
//   describe("String", () => {
//     it("should parse a string", () => {
//       const s = "string";
//       const r = xyz.string().parse(s);

//       expect(r).toBe(s);
//     });

//     it("should allow optional", () => {
//       const u = undefined;
//       const r = xyz.string().optional().parse(u);

//       expect(r).toBe(u);
//     });

//     it("should throw when value is undefined and not optional", () => {
//       const u = undefined;

//       const throwable = () => {
//         xyz.string().parse(u);
//       };

//       expect(throwable).toThrow();
//     });

//     it("should not throw an error with valid min and max length", () => {
//       const throwable = () => {
//         xyz.string().min(1).max(3).parse("12");
//       };

//       expect(throwable).not.toThrow();
//     });

//     it("should throw an error on invalid min length", () => {
//       const throwable = () => {
//         xyz.string().min(10).parse("1");
//       };

//       expect(throwable).toThrow();
//     });

//     it("should throw an error on invalid max length", () => {
//       const throwable = () => {
//         xyz.string().max(2).parse("123");
//       };

//       expect(throwable).toThrow();
//     });
//   });

//   describe("Literal", () => {
//     it("should parse", () => {
//       const l = "literal";
//       const r = xyz.literal(l).parse(l);

//       expect(r).toBe(l);
//     });

//     it("should throw when not matching", () => {
//       const l = "literal";
//       const v = "string";

//       const throwable = () => {
//         const r = xyz.literal(l).parse(v);
//       };

//       expect(throwable).toThrow();
//     });

//     it("should throw on invalid value", () => {
//       const l = "literal";
//       const v = 1;

//       const throwable = () => {
//         const r = xyz.literal(l).parse(v);
//       };

//       expect(throwable).toThrow();
//     });
//   });

//   describe("Object", () => {
//     it("should parse", () => {
//       const r = xyz.object({ id: xyz.string() }).parse({ id: "string" });
//     });

//     it("should throw on wrong type", () => {
//       const throwable = () => {
//         xyz.object({ id: xyz.string() }).parse({ id: 1 });
//       };

//       expect(throwable).toThrow();
//     });
//   });
// });
