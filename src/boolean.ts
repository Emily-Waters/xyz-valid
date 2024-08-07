import { config, common } from "./base";

export function boolean() {
  const cfg = config("boolean");

  return { ...common(cfg) };
}
