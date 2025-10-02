/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRuleDecision } from "@isettingkit/input";
import { keyOf } from "../keyOf";

const makeIdExtractor =
  (getList: () => IRuleDecision[]) =>
  (...args: any[]): string | null => {
    for (const a of args) {
      if (!a) continue;

      if (typeof a === "string" && a) return a;
      if (typeof a === "number" && Number.isFinite(a)) {
        const item = getList()[a];
        return item ? keyOf(item) : null;
      }
      if (typeof a === "object") {
        if (a.decisionId || a.businessRuleId || a.id) {
          return keyOf(a as IRuleDecision);
        }
        if (a.preventDefault) {
          try {
            a.preventDefault();
            a.stopPropagation?.();
          } catch (error) {
            console.error(error);
          }
          const ds = a?.currentTarget?.dataset ?? a?.target?.dataset;
          if (ds?.id) return String(ds.id);
          if (ds?.index != null) {
            const idx = Number(ds.index);
            if (!Number.isNaN(idx)) {
              const it = getList()[idx];
              return it ? keyOf(it) : null;
            }
          }
        }
      }
    }
    return null;
  };

export { makeIdExtractor };
