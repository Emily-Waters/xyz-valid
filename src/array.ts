import { XYZBaseType, config, common, BaseTypes } from "./base";

type XYZArray<TType extends BaseTypes> = XYZBaseType<
  Array<ReturnType<TType["parse"]>>,
  Array<ReturnType<TType["parse"]>>
>;

export function array<T extends BaseTypes>(def: T): XYZArray<T> {
  const cfg = config("object");

  cfg._checks.push((input) => {
    input.forEach((e: unknown, i: number) => {
      const result = def.safeParse(e);

      if (result.errors) {
        cfg._errors.push(...result.errors);
      } else {
        input[i] = result.value;
      }
    });
  });

  return { ...common(cfg) };
}
