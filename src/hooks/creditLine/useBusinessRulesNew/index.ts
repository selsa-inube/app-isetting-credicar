/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { IRuleDecision, IValue } from "@isettingkit/input";
import { IUseBusinessRulesNewGeneral } from "@ptypes/creditLines/IUseBusinessRulesNewGeneral";
import {
  buildEsConditionSentence,
  EValueHowToSetUp,
  formatDecisionForBackend,
  getConditionsByGroup,
  mapByGroup,
  parseRangeFromString,
  sortDisplayDataSampleSwitchPlaces,
  sortDisplayDataSwitchPlaces,
} from "@isettingkit/business-rules";
import { interestRateTypeTemplate } from "@config/creditLines/decisionTemplates";

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
  const groups = (getConditionsByGroup(cloned) || {}) as Record<string, unknown>;
  const normalizedGroups = Object.fromEntries(
    Object.entries(groups).map(([g, list]) => [g, asArray(list).map(normalizeCondition)]),
  );
  cloned.conditionsThatEstablishesTheDecision = normalizedGroups as any;
  return cloned;
};

const safeSortDisplayDataSwitchPlaces = (input: { decisions: IRuleDecision[] }) => {
  try {
    const normalized = (input?.decisions ?? []).map(ensureArrayGroupsDeep);
    return sortDisplayDataSwitchPlaces({ decisions: normalized }) as IRuleDecision[];
  } catch (err) {
    console.warn("sortDisplayDataSwitchPlaces failed, returning input:", err);
    return input.decisions ?? [];
  }
};

const safeSortDisplayDataSampleSwitchPlaces = (input: { decisionTemplate: IRuleDecision }) => {
  try {
    const normalized = ensureArrayGroupsDeep(input.decisionTemplate);
    return sortDisplayDataSampleSwitchPlaces({ decisionTemplate: normalized }) as IRuleDecision;
  } catch (err) {
    console.warn("sortDisplayDataSampleSwitchPlaces failed, returning input:", err);
    return input.decisionTemplate;
  }
};

const localizeLabel = (
  base: { labelName?: string; i18n?: Record<string, string> } | undefined,
  lang: "es" | "en" | undefined,
) => (lang && base?.i18n?.[lang]) || base?.labelName || "";

const localizeDecision = (raw: IRuleDecision, lang: "es" | "en" | undefined): IRuleDecision => {
  const cloned: IRuleDecision = JSON.parse(JSON.stringify(raw));
  cloned.labelName = localizeLabel(raw, lang);

  const groups = (getConditionsByGroup(cloned) || {}) as Record<string, unknown>;
  const localizedGroups = Object.fromEntries(
    Object.entries(groups).map(([g, list]) => [
      g,
      asArray(list).map((c: any) => normalizeCondition({ ...c, labelName: localizeLabel(c, lang) })),
    ]),
  );

  cloned.conditionsThatEstablishesTheDecision = localizedGroups as any;
  return cloned;
};

const normalizeHowToSet = (raw: unknown): EValueHowToSetUp => {
  if (typeof raw === "string") {
    const k = raw.toLowerCase();
    if (k.includes("equal")) return EValueHowToSetUp.EQUAL;
    if (k.includes("greater")) return EValueHowToSetUp.GREATER_THAN;
    if (k.includes("less")) return EValueHowToSetUp.LESS_THAN;
    if (k.includes("range") || k.includes("between")) return EValueHowToSetUp.RANGE;
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

  d.conditionsThatEstablishesTheDecision = decorated as any;
  return d;
};

const useBusinessRulesNew = (props: IUseBusinessRulesNewGeneral) => {
  const { decisionTemplate, initialDecisions, language, onDecisionsChange } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDecision, setSelectedDecision] = useState<IRuleDecision | null>(null);

  const localizedTemplate = useMemo(
    () => ensureArrayGroupsDeep(localizeDecision(interestRateTypeTemplate as any, language)),
    [decisionTemplate, language],
  );

  const [decisions, setDecisions] = useState<IRuleDecision[]>(
    initialDecisions.map((d) => {
      const loc = ensureArrayGroupsDeep(localizeDecision(d, language));
      const withSentences = withConditionSentences(loc);
      return {
        ...withSentences,
        value: parseRangeFromString(withSentences.value),
        conditionsThatEstablishesTheDecision: mapByGroup(
          getConditionsByGroup(withSentences),
          (condition: { value: string | number | IValue | string[] | undefined }) => ({
            ...normalizeCondition(condition),
            labelName: localizeLabel(
              condition as { labelName?: string; i18n?: Record<string, string> },
              language,
            ),
            value: parseRangeFromString(condition.value),
          }),
        ),
      } as any;
    }),
  );

  const [selectedConditionsCSV, setSelectedConditionsCSV] = useState<string>("");
  const selectedIds = useMemo(
    () => new Set(selectedConditionsCSV.split(",").filter(Boolean)),
    [selectedConditionsCSV],
  );

  const [removedConditionNames, setRemovedConditionNames] = useState<Set<string>>(new Set());

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
    const groups = (getConditionsByGroup(localizedTemplate) || {}) as Record<string, unknown>;
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
          decisionId: `Decisión ${decisions.length + 1}`,
        };

    const tplGroups = (getConditionsByGroup(localizedTemplate) || {}) as Record<string, unknown>;
    const dataGroups = (getConditionsByGroup(dataDecision) || {}) as Record<string, unknown>;

    const mergedGroups = Object.fromEntries(
      Object.entries(tplGroups).map(([group, tplList]) => {
        const dataList = asArray(dataGroups[group]);

        const merged = asArray(tplList).map((tplItem: any) => {
          const match = (dataList as any[]).find(
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

    const newDecision: IRuleDecision = {
      ...(base),
      labelName: localizeLabel(base, language),
      conditionsThatEstablishesTheDecision: mergedGroups as any,
    };

    const decisionWithSentences = withConditionSentences(
      ensureArrayGroupsDeep(newDecision),
    );
    
    console.log(
      "Formatted for backend:",
      formatDecisionForBackend({
        decision: decisionWithSentences,
        template: localizedTemplate,
        fallbackId: decisionWithSentences.decisionId!,
      }),
    );

    setDecisions((prev) =>
      isEditing
        ? prev.map((d) => {
            const sameByBusinessRule =
              selectedDecision?.businessRuleId &&
              d.businessRuleId === selectedDecision.businessRuleId;
            const sameByDecisionId =
              selectedDecision?.decisionId && d.decisionId === selectedDecision.decisionId;
            return sameByBusinessRule || sameByDecisionId ? decisionWithSentences : d;
          })
        : [...prev, decisionWithSentences],
    );

    closeModal();
  };

  const deleteDecision = (id: string) => {
    setDecisions((prev) => prev.filter((d) => d.decisionId !== id));
  };

  useEffect(() => {
    onDecisionsChange?.(decisions);
  }, [decisions, onDecisionsChange]);

  const filteredDecisionTemplate = useMemo(() => {
    const normalizedTemplate = ensureArrayGroupsDeep(localizedTemplate);
    const tpl = safeSortDisplayDataSampleSwitchPlaces({
      decisionTemplate: normalizedTemplate,
    });

    const groups = (tpl.conditionsThatEstablishesTheDecision || {}) as Record<string, unknown>;
    const filtered = Object.fromEntries(
      Object.entries(groups).map(([group, list]) => [
        group,
        asArray(list).filter(
          (c: any) =>
            (selectedIds.size === 0 || selectedIds.has(c.conditionName)) &&
            !removedConditionNames.has(c.conditionName),
        ),
      ]),
    );

    const withFiltered = {
      ...tpl,
      labelName: localizeLabel(tpl as any, language),
      conditionsThatEstablishesTheDecision: filtered,
    };

    return withConditionSentences(ensureArrayGroupsDeep(withFiltered as any));
  }, [localizedTemplate, language, selectedIds, removedConditionNames]);

  const decisionsSorted = useMemo(
    () => safeSortDisplayDataSwitchPlaces({ decisions }),
    [decisions],
  );

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
