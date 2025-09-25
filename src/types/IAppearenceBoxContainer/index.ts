const appearenceBoxContainer = [
  "light",
  "gray",
  "dark",
  "help",
  "warning",
  "danger",
] as const;

type IAppearenceBoxContainer = (typeof appearenceBoxContainer)[number];

export type { IAppearenceBoxContainer };
export { appearenceBoxContainer };
