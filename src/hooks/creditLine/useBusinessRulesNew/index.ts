/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getConditionsByGroup,
  sortDisplayDataSwitchPlaces,
} from "@isettingkit/business-rules";
import { useEffect, useMemo, useRef, useState } from "react";
import { IRuleDecision } from "@isettingkit/input";
import { mapDecisionsToRulePayload } from "@utils/mapDecisionsToRulePayload";
import { IUseBusinessRulesNewGeneral } from "@ptypes/creditLines/IUseBusinessRulesNewGeneral";
import { asArray } from "@utils/decisions/asArray";
import { normalizeCondition } from "@utils/decisions/normalizeCondition";
import { ensureArrayGroupsDeep } from "@utils/decisions/ensureArrayGroupsDeep";
import { localizeDecision } from "@utils/decisions/localizeDecision";
import { transformDecision } from "@utils/decisions/transformDecision";
import { ensureUniqueIds } from "@utils/decisions/ensureUniqueIds";
import { localizeLabel } from "@utils/decisions/localizeLabel";
import { nextDecisionLabel } from "@utils/decisions/nextDecisionLabel";
import { keyOf } from "@utils/decisions/keyOf";
import { nameToGroupMapOf } from "@utils/decisions/nameToGroupMapOf";
import { safeSortDisplayDataSampleSwitchPlaces } from "@utils/decisions/sortDisplayDataSampleSwitchPlaces";
import { toArrayConditionsDecision } from "@utils/decisions/toArrayConditionsDecision";
import { withConditionSentences } from "@utils/decisions/withConditionSentences";
import { makeIdExtractor } from "@utils/decisions/makeIdExtractor";
import { stableStringify } from "@utils/decisions/stableStringify";

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
        ensureUniqueIds(
          (initialDecisions ?? []).map((d) => transformDecision(d, language)),
        ),
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

    setDecisions((prev) =>
      isEditing
        ? prev.map((d) =>
            keyOf(d) === keyOf(selectedDecision) ? decisionWithSentences : d,
          )
        : [...prev, decisionWithSentences],
    );

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
