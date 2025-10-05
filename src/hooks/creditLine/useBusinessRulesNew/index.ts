/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  buildEsConditionSentence,
  EValueHowToSetUp,
  getConditionsByGroup,
  mapByGroup,
  parseRangeFromString,
  sortDisplayDataSampleSwitchPlaces,
  sortDisplayDataSwitchPlaces,
} from "@isettingkit/business-rules";
import { useEffect, useMemo, useRef, useState } from "react";
import { IRuleDecision, IValue } from "@isettingkit/input";
import { mapDecisionsToRulePayload } from "@utils/mapDecisionsToRulePayload";
import { ensureUniqueIds } from "@utils/decisions/ensureUniqueIds";
import { nextDecisionLabel } from "@utils/decisions/nextDecisionLabel";
import { makeIdExtractor } from "@utils/decisions/makeIdExtractor";
import { IUseBusinessRulesNewGeneral } from "@ptypes/creditLines/IUseBusinessRulesNewGeneral";

const asArray = (v: unknown): any[] =>
  Array.isArray(v)
    ? v
    : v && typeof v === "object"
      ? Object.values(v as Record<string, unknown>)
      : [];

const normalizeCondition = (c: any) => ({
  ...c,
  listOfPossibleValues: asArray(c?.listOfPossibleValues),
});

const ensureArrayGroupsDeep = (decision: IRuleDecision): IRuleDecision => {
  const cloned: IRuleDecision = JSON.parse(JSON.stringify(decision ?? {}));
  const groups: Record<string, unknown> = getConditionsByGroup(cloned) ?? {};
  const normalizedGroups = Object.fromEntries(
    Object.entries(groups).map(([g, list]) => [
      g,
      asArray(list).map(normalizeCondition),
    ]),
  );
  (cloned as any).conditionsThatEstablishesTheDecision =
    normalizedGroups as any;
  return cloned;
};

const isIRuleDecision = (v: unknown): v is IRuleDecision =>
  typeof v === "object" && v !== null;

const toArrayConditionsDecision = (d: IRuleDecision): IRuleDecision => {
  const cloned: IRuleDecision = JSON.parse(JSON.stringify(d ?? {}));
  const groups: Record<string, unknown> = getConditionsByGroup(cloned) ?? {};
  const flat = Object.values(groups).flatMap(asArray);
  (cloned as any).conditionsThatEstablishesTheDecision = flat;
  return cloned;
};

const nameToGroupMapOf = (d: IRuleDecision) => {
  const groups = (getConditionsByGroup(d) || {}) as Record<string, unknown>;
  const map = new Map<string, string>();
  Object.entries(groups).forEach(([group, list]) => {
    asArray(list).forEach((c: any) => {
      if (c?.conditionName) map.set(c.conditionName, group);
    });
  });
  return map;
};

const safeSortDisplayDataSampleSwitchPlaces = (input: {
  decisionTemplate?: IRuleDecision | null;
  nameToGroup?: Map<string, string>;
}): IRuleDecision => {
  try {
    const original = ensureArrayGroupsDeep(
      input.decisionTemplate ?? ({} as IRuleDecision),
    );
    const nameToGroup = input.nameToGroup ?? nameToGroupMapOf(original);

    const flatTpl = toArrayConditionsDecision(original);
    const sorted = sortDisplayDataSampleSwitchPlaces({
      decisionTemplate: flatTpl,
    }) as any;

    const arr = Array.isArray(sorted?.conditionsThatEstablishesTheDecision)
      ? (sorted.conditionsThatEstablishesTheDecision as any[])
      : (((flatTpl as any).conditionsThatEstablishesTheDecision as
          | any[]
          | undefined) ?? []);

    const regrouped: Record<string, any[]> = {};
    for (const c of arr) {
      const g = nameToGroup.get(c?.conditionName) ?? "group-primary";
      (regrouped[g] ||= []).push(c);
    }

    return {
      ...(isIRuleDecision(sorted) ? sorted : original),
      conditionsThatEstablishesTheDecision: regrouped as any,
    } as IRuleDecision;
  } catch (err) {
    console.warn(
      "sortDisplayDataSampleSwitchPlaces failed, returning input:",
      err,
    );
    return ensureArrayGroupsDeep(
      input.decisionTemplate ?? ({} as IRuleDecision),
    );
  }
};

const localizeLabel = (
  base: { labelName?: string; i18n?: Record<string, string> } | undefined,
  lang: "es" | "en" | undefined,
) => (lang && base?.i18n?.[lang]) || base?.labelName || "";

const localizeDecision = (
  raw: IRuleDecision,
  lang: "es" | "en" | undefined,
): IRuleDecision => {
  const cloned: IRuleDecision = JSON.parse(JSON.stringify(raw ?? {}));
  cloned.labelName = localizeLabel(raw, lang);

  const groups: Record<string, unknown> = getConditionsByGroup(cloned) ?? {};
  const localizedGroups = Object.fromEntries(
    Object.entries(groups).map(([g, list]) => [
      g,
      asArray(list).map((c: any) =>
        normalizeCondition({ ...c, labelName: localizeLabel(c, lang) }),
      ),
    ]),
  );

  (cloned as any).conditionsThatEstablishesTheDecision = localizedGroups as any;
  return cloned;
};

const normalizeHowToSet = (raw: unknown): EValueHowToSetUp => {
  if (typeof raw === "string") {
    const k = raw.toLowerCase();
    if (k.includes("equal")) return EValueHowToSetUp.EQUAL;
    if (k.includes("greater")) return EValueHowToSetUp.GREATER_THAN;
    if (k.includes("less")) return EValueHowToSetUp.LESS_THAN;
    if (k.includes("range") || k.includes("between"))
      return EValueHowToSetUp.RANGE;
    if (k.includes("multi")) return EValueHowToSetUp.LIST_OF_VALUES_MULTI;
    if (k.includes("list_of_values") || k.includes("among") || k.includes("in"))
      return EValueHowToSetUp.LIST_OF_VALUES;
  }
  return (raw as EValueHowToSetUp) ?? EValueHowToSetUp.EQUAL;
};

const withConditionSentences = (
  decision: IRuleDecision,
  isPrimaryFirst = true,
): IRuleDecision => {
  const d: IRuleDecision = JSON.parse(JSON.stringify(decision));
  const groups = (getConditionsByGroup(d) || {}) as Record<string, unknown>;

  const orderedKeys = [
    ...Object.keys(groups).filter((k) => k === "group-primary"),
    ...Object.keys(groups).filter((k) => k !== "group-primary"),
  ];

  let firstUsed = !isPrimaryFirst;

  const decorated = Object.fromEntries(
    orderedKeys.map((g) => {
      const list = asArray(groups[g]);
      const mapped = list.map((c: any, idx: number) => {
        const isFirst = !firstUsed && g === "group-primary" && idx === 0;
        if (isFirst) firstUsed = true;

        const how = normalizeHowToSet(
          c.howToSetTheCondition ?? c.valueUse ?? EValueHowToSetUp.EQUAL,
        );

        const sentence = buildEsConditionSentence({
          label: c.labelName || "",
          howToSet: how as any,
          isFirst,
        });

        return { ...c, labelName: sentence };
      });
      return [g, mapped];
    }),
  );

  (d as any).conditionsThatEstablishesTheDecision = decorated as any;
  return d;
};

const transformDecision = (
  d: IRuleDecision,
  language: "es" | "en" | undefined,
): IRuleDecision => {
  const loc = ensureArrayGroupsDeep(localizeDecision(d, language));
  const withSentences = withConditionSentences(loc);
  return {
    ...withSentences,
    value: parseRangeFromString(withSentences.value),
    conditionsThatEstablishesTheDecision: mapByGroup(
      getConditionsByGroup(withSentences),
      (condition: {
        value: string | number | IValue | string[] | undefined;
      }) => ({
        ...normalizeCondition(condition),
        labelName: localizeLabel(
          condition as { labelName?: string; i18n?: Record<string, string> },
          language,
        ),
        value: parseRangeFromString(condition.value),
      }),
    ),
  } as any;
};

const stableStringify = (v: unknown) => {
  const seen = new WeakSet();
  return JSON.stringify(v, (_k, val) => {
    if (val && typeof val === "object") {
      if (seen.has(val)) return;
      seen.add(val);
      if (!Array.isArray(val)) {
        return Object.keys(val)
          .sort()
          .reduce<Record<string, unknown>>((o, k) => {
            o[k] = (val as Record<string, unknown>)[k];
            return o;
          }, {});
      }
    }
    return val;
  });
};

const keyOf = (x: IRuleDecision) =>
  String(
    (x as any).decisionId ?? (x as any).businessRuleId ?? (x as any).id ?? "",
  );

const useBusinessRulesNew = (props: IUseBusinessRulesNewGeneral) => {
  const {
    decisionTemplate,
    initialDecisions,
    language,
    setDecisionData,
    onDecisionsChange,
  } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDecision, setSelectedDecision] =
    useState<IRuleDecision | null>(null);

  const localizedTemplate = useMemo(
    () =>
      ensureArrayGroupsDeep(
        localizeDecision(decisionTemplate as any, language),
      ),
    [decisionTemplate, language],
  );

  const [decisions, setDecisions] = useState<IRuleDecision[]>(
    ensureUniqueIds(
      (initialDecisions ?? []).map((d) => transformDecision(d, language)),
    ),
  );

  useEffect(() => {
    if ((initialDecisions?.length ?? 0) > 0 && decisions.length === 0) {
      setDecisions(
        (initialDecisions ?? []).map((d) => transformDecision(d, language)),
      );
    }
  }, [initialDecisions, language]);

  const [selectedConditionsCSV, setSelectedConditionsCSV] =
    useState<string>("");
  const selectedIds = useMemo(
    () => new Set(selectedConditionsCSV.split(",").filter(Boolean)),
    [selectedConditionsCSV],
  );

  const [removedConditionNames, setRemovedConditionNames] = useState<
    Set<string>
  >(new Set());

  const removeCondition = (conditionName: string) => {
    setRemovedConditionNames((prev) => {
      const next = new Set(prev);
      next.add(conditionName);
      return next;
    });
  };

  const restoreConditions = (names: string[]) => {
    if (!names?.length) return;
    setRemovedConditionNames((prev) => {
      if (prev.size === 0) return prev;
      const next = new Set(prev);
      names.forEach((n) => next.delete(n));
      return next;
    });
  };

  const multipleChoicesOptions = useMemo(() => {
    const groups = (getConditionsByGroup(localizedTemplate) || {}) as Record<
      string,
      unknown
    >;
    return Object.values(groups)
      .flatMap(asArray)
      .map((c: any) => ({
        id: c.conditionName,
        label: localizeLabel(c, language),
        value: c.conditionName,
      }));
  }, [localizedTemplate, language]);

  const onMultipleChoicesChange = (_name: string, valueCSV: string) => {
    setSelectedConditionsCSV(valueCSV);
  };

  const openModal = (decision: IRuleDecision | null = null) => {
    setSelectedDecision(decision);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDecision(null);
  };

  const submitForm = (dataDecision: any) => {
    const isEditing = selectedDecision !== null;

    const base = isEditing
      ? { ...selectedDecision, ...dataDecision }
      : {
          ...localizedTemplate,
          ...dataDecision,
        };

    const tplGroups = (getConditionsByGroup(localizedTemplate) || {}) as Record<
      string,
      unknown
    >;
    const dataGroups = (getConditionsByGroup(dataDecision) || {}) as Record<
      string,
      unknown
    >;

    const mergedGroups = Object.fromEntries(
      Object.entries(tplGroups).map(([group, tplList]) => {
        const dataList = asArray(dataGroups[group]);

        const merged = asArray(tplList).map((tplItem: any) => {
          const match = dataList.find(
            (d: any) => d?.conditionName === tplItem?.conditionName,
          );
          return normalizeCondition({
            ...tplItem,
            labelName: localizeLabel(tplItem, language),
            value: match?.value ?? tplItem.value,
            listOfPossibleValues:
              match?.listOfPossibleValues ?? tplItem.listOfPossibleValues,
          });
        });

        const finalList = merged.filter((m: any) => {
          const passesSelected =
            selectedIds.size === 0 || selectedIds.has(m.conditionName);
          const notRemoved = !removedConditionNames.has(m.conditionName);
          return passesSelected && notRemoved;
        });

        return [group, finalList];
      }),
    );

    const usedIds = new Set(decisions.map((d) => String(d.decisionId ?? "")));
    const decisionIdForNew = isEditing
      ? base.decisionId
      : base.decisionId && !usedIds.has(base.decisionId)
        ? base.decisionId
        : nextDecisionLabel(usedIds);

    const newDecision: IRuleDecision = {
      ...base,
      decisionId: decisionIdForNew,
      labelName: localizeLabel(base, language),
      conditionsThatEstablishesTheDecision: mergedGroups as any,
    };

    const decisionWithSentences = transformDecision(newDecision, language);

    setDecisions((prev) => {
      if (isEditing && selectedDecision) {
        return prev.map((d) =>
          keyOf(d) === keyOf(selectedDecision) ? decisionWithSentences : d,
        );
      }
      return [...prev, decisionWithSentences];
    });

    closeModal();
  };

  useEffect(() => {
    onDecisionsChange?.(decisions);
  }, [decisions, onDecisionsChange]);

  const filteredDecisionTemplate = useMemo(() => {
    const normalizedTemplate = ensureArrayGroupsDeep(localizedTemplate);
    const nameToGroup = nameToGroupMapOf(normalizedTemplate);

    const tpl = safeSortDisplayDataSampleSwitchPlaces({
      decisionTemplate: normalizedTemplate,
      nameToGroup,
    });

    const tplGroups = (getConditionsByGroup(tpl) || {}) as Record<
      string,
      unknown
    >;

    const filteredEntries = Object.entries(tplGroups).reduce(
      (acc, [group, list]) => {
        const kept = asArray(list).filter(
          (c: any) =>
            (selectedIds.size === 0 || selectedIds.has(c.conditionName)) &&
            !removedConditionNames.has(c.conditionName) &&
            !c?.hidden,
        );
        if (kept.length > 0) acc.push([group, kept]);
        return acc;
      },
      [] as [string, any[]][],
    );

    const filtered = Object.fromEntries(filteredEntries);

    const withFiltered = {
      ...tpl,
      labelName: localizeLabel(tpl, language),
      conditionsThatEstablishesTheDecision: filtered,
    };

    return withConditionSentences(
      ensureArrayGroupsDeep(withFiltered as unknown as IRuleDecision),
    );
  }, [localizedTemplate, language, selectedIds, removedConditionNames]);

  const decisionsSorted = useMemo(() => {
    const prepared = decisions.map((d) => ({
      flat: toArrayConditionsDecision(d),
      map: nameToGroupMapOf(d),
      original: d,
    }));

    const sorted = sortDisplayDataSwitchPlaces({
      decisions: prepared.map((p) => p.flat),
    }) as unknown as IRuleDecision[];

    const safeSorted = Array.isArray(sorted)
      ? sorted
      : prepared.map((p) => p.flat);

    const regrouped = safeSorted.map((dec, idx) => {
      const arr = Array.isArray(
        (dec as any).conditionsThatEstablishesTheDecision,
      )
        ? ((dec as any).conditionsThatEstablishesTheDecision as any[])
        : [];
      const map = prepared[idx]?.map ?? new Map<string, string>();

      const byGroup: Record<string, any[]> = {};
      for (const c of arr) {
        const g = map.get(c?.conditionName) ?? "group-primary";
        (byGroup[g] ||= []).push(c);
      }

      const src = prepared[idx]?.original ?? {};
      return {
        ...src,
        ...dec,
        conditionsThatEstablishesTheDecision: byGroup as any,
      } as IRuleDecision;
    });

    return regrouped;
  }, [decisions]);

  const renderedListRef = useRef<IRuleDecision[]>([]);
  renderedListRef.current = decisionsSorted;

  const extractId = useMemo(
    () => makeIdExtractor(() => renderedListRef.current),
    [],
  );

  const deleteDecision = (...args: any[]) => {
    const id = extractId(...args);
    if (!id) return;
    setDecisions((prev) => prev.filter((d) => keyOf(d) !== id));
  };

  const responseForBackend = useMemo(() => {
    const ruleNameFromTemplate =
      (decisionTemplate as any)?.ruleName ||
      (decisionTemplate as any)?.businessRuleName ||
      (decisionTemplate as any)?.businessRuleId ||
      undefined;

    return mapDecisionsToRulePayload({
      decisions: decisionsSorted,
      ruleName: ruleNameFromTemplate,
    });
  }, [decisionsSorted, decisionTemplate]);

  const lastSigRef = useRef<string>("");
  useEffect(() => {
    const sig = stableStringify(decisionsSorted);
    if (sig !== lastSigRef.current) {
      lastSigRef.current = sig;
      setDecisionData(decisionsSorted);
    }
  }, [decisionsSorted]);

  useEffect(() => {
    setDecisionData(decisionsSorted);
  }, [decisionsSorted]);

  return {
    isModalOpen,
    selectedDecision,
    decisions,
    selectedConditionsCSV,
    removedConditionNames,
    localizedTemplate,
    filteredDecisionTemplate,
    multipleChoicesOptions,
    decisionsSorted,
    responseForBackend,
    setSelectedDecision,
    openModal,
    closeModal,
    deleteDecision,
    submitForm,
    onMultipleChoicesChange,
    removeCondition,
    restoreConditions,
  };
};

export { useBusinessRulesNew };
