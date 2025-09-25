interface TNavItem {
  kind: "group" | "link";
  groupId: string;
  id: string;
  path: string;
};

export type { TNavItem };