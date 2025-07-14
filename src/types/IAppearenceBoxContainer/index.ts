const appearenceBoxContainer = ["light", "gray", "dark"] as const;

type IAppearenceBoxContainer = (typeof appearenceBoxContainer)[number];

export type { IAppearenceBoxContainer };
export { appearenceBoxContainer };
