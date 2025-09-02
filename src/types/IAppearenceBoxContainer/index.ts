const appearenceBoxContainer = [
  "light",
  "gray",
  "dark",
  "help",
  "warning",
] as const;

type IAppearenceBoxContainer = (typeof appearenceBoxContainer)[number];

export type { IAppearenceBoxContainer };
export { appearenceBoxContainer };
