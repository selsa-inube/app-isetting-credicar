import { TGroupLite } from "@ptypes/creditLines/TGroupLite";
import { TNavItem } from "@ptypes/creditLines/TNavItem";

const buildNavDropDownSequence = (src: readonly TGroupLite[]): TNavItem[] => {
  const out: TNavItem[] = [];
  for (const g of src) {
    if (g.path)
      out.push({ kind: "group", groupId: g.id, id: g.id, path: g.path });
    const links = g.links ?? [];
    for (const l of links) {
      if (!l?.path) continue;
      out.push({ kind: "link", groupId: g.id, id: l.id, path: l.path });
    }
  }
  return out;
};

export { buildNavDropDownSequence };
