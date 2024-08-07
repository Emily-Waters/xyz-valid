import { config, common, XYZBaseType } from "./base";

export function boolean(): XYZBaseType<boolean, boolean> {
  const cfg = config("boolean");

  return { ...common(cfg) };
}
