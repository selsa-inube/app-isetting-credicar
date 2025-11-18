import {
  getConditionsByGroupNew,
  mapByGroupNew,
  parseRangeFromString,
  sortDisplayDataSampleSwitchPlaces,
  groupsRecordToArrayNew,
  normalizeDecisionToNewShape,
} from "@isettingkit/business-rules";
import { useEffect, useMemo, useRef, useState } from "react";
import { IRuleDecision, IValue } from "@isettingkit/input";
import { EUseCase } from "@enum/useCase";
import { mapDecisionsToRulePayload } from "@utils/mapDecisionsToRulePayload";
import { ensureUniqueIds } from "@utils/decisions/ensureUniqueIds";
import { nextDecisionLabel } from "@utils/decisions/nextDecisionLabel";
import { makeIdExtractor } from "@utils/decisions/makeIdExtractor";
import { conditionsHidden } from "@config/creditLines/configuration/conditionsHidden";
import { newBusinessRulesLabels } from "@config/creditLines/configuration/newBusinessRulesLabels";
import { IUseBusinessRulesNewGeneral } from "@ptypes/creditLines/IUseBusinessRulesNewGeneral";

/* eslint-disable @typescript-eslint/no-explicit-any */
const asArray = (v: unknown): any[] =>
  Array.isArray(v)
    ? v
    : v && typeof v === "object"
      ? Object.values(v as Record<string, unknown>)
      : [];
/* eslint-disable @typescript-eslint/no-explicit-any */
const normalizeCondition = (c: any) => ({
  ...c,
});

const ensureArrayGroupsDeep = (decision: IRuleDecision): IRuleDecision => {
  const cloned: IRuleDecision = JSON.parse(JSON.stringify(decision ?? {}));
  const groups: Record<string, unknown> = getConditionsByGroupNew(cloned) ?? {};
  const normalizedGroups = Object.fromEntries(
    Object.entries(groups).map(([g, list]) => [
      g,
      asArray(list).map(normalizeCondition),
    ]),
  );

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const out: IRuleDecision = {
    ...cloned,
    conditionGroups: groupsRecordToArrayNew(
      normalizedGroups as Record<string, any[]>,
    ) as any,
  };
  /* eslint-disable @typescript-eslint/no-explicit-any */
  delete (out as any).conditionsThatEstablishesTheDecision;
  return out;
};

const isIRuleDecision = (v: unknown): v is IRuleDecision =>
  typeof v === "object" && v !== null;

const toArrayConditionsDecision = (d: IRuleDecision): IRuleDecision => {
  const cloned: IRuleDecision = JSON.parse(JSON.stringify(d ?? {}));
  const groups: Record<string, unknown> = getConditionsByGroupNew(cloned) ?? {};
  const flat = Object.values(groups).flatMap(asArray);
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const tmp = {
    ...cloned,
    conditionsThatEstablishesTheDecision: flat,
  } as any;
  return tmp;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const nameToGroupOccurrences = (d: IRuleDecision) => {
  const occ = new Map<string, string[]>();
  const cgArray: any[] = Array.isArray((d as any)?.conditionGroups)
    ? ((d as any).conditionGroups as any[])
    : (groupsRecordToArrayNew(
        (getConditionsByGroupNew(d) ?? {}) as any,
      ) as any[]);

  for (const groupEntry of cgArray) {
    const groupId =
      groupEntry?.ConditionGroupId ?? groupEntry?.groupId ?? "group-primary";

    const list = asArray(
      groupEntry?.conditionsThatEstablishesTheDecision ??
        groupEntry?.conditions ??
        (getConditionsByGroupNew(d) as any)?.[groupId],
    );

    for (const c of list) {
      if (!c?.conditionName) continue;
      const current = occ.get(c.conditionName) ?? [];
      current.push(groupId);
      occ.set(c.conditionName, current);
    }
  }

  return occ;
};

const safeSortDisplayDataSampleSwitchPlaces = (input: {
  decisionTemplate?: IRuleDecision | null;
}): IRuleDecision => {
  try {
    const original = ensureArrayGroupsDeep(
      input.decisionTemplate ?? ({} as IRuleDecision),
    );

    const occurrences = nameToGroupOccurrences(original);

    const flatTpl = toArrayConditionsDecision(original);

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const sorted = sortDisplayDataSampleSwitchPlaces({
      decisionTemplate: flatTpl,
    }) as any;

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const arr = Array.isArray(sorted?.conditionsThatEstablishesTheDecision)
      ? (sorted.conditionsThatEstablishesTheDecision as any[])
      : (((flatTpl as any).conditionsThatEstablishesTheDecision as
          | any[]
          | undefined) ?? []);

    const regrouped: Record<string, any[]> = {};
    const indexByName = new Map<string, number>();

    for (const c of arr) {
      const name = c?.conditionName;
      const seq = (name && occurrences.get(name)) ?? ["group-primary"];

      const i = indexByName.get(name) ?? 0;
      const gid = seq[Math.min(i, seq.length - 1)];
      indexByName.set(name, i + 1);

      (regrouped[gid] ||= []).push(c);
    }

    const base: IRuleDecision = isIRuleDecision(sorted) ? sorted : original;
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const out: IRuleDecision = {
      ...base,
      conditionGroups: groupsRecordToArrayNew(regrouped) as any,
    };
    /* eslint-disable @typescript-eslint/no-explicit-any */
    delete (out as any).conditionsThatEstablishesTheDecision;
    return out;
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

  const groups: Record<string, unknown> = getConditionsByGroupNew(cloned) ?? {};
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const localizedGroupsRecord = Object.fromEntries(
    Object.entries(groups).map(([g, list]) => [
      g,
      asArray(list).map((c: any) =>
        normalizeCondition({ ...c, labelName: localizeLabel(c, lang) }),
      ),
    ]),
  );

  const out: IRuleDecision = {
    ...cloned,
    conditionGroups: groupsRecordToArrayNew(
      localizedGroupsRecord as Record<string, any[]>,
    ) as any,
  };
  /* eslint-disable @typescript-eslint/no-explicit-any */
  delete (out as any).conditionsThatEstablishesTheDecision;
  return out;
};

const transformDecision = (
  d: IRuleDecision,
  language: "es" | "en" | undefined,
): IRuleDecision => {
  const loc = ensureArrayGroupsDeep(localizeDecision(d, language));
  const withSentences = loc;

  const mappedRecord = mapByGroupNew(
    getConditionsByGroupNew(withSentences),
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
  );
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const out: IRuleDecision = {
    ...withSentences,
    value: parseRangeFromString(withSentences.value),
    conditionGroups: groupsRecordToArrayNew(mappedRecord),
  } as any;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  delete (out as any).conditionsThatEstablishesTheDecision;
  return out;
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
    /* eslint-disable @typescript-eslint/no-explicit-any */
    (x as any).decisionId ?? (x as any).businessRuleId ?? (x as any).id ?? "",
  );

const originalName = (name: string) => name?.split(".").pop() || name;

const useBusinessRulesNew = (props: IUseBusinessRulesNewGeneral) => {
  const {
    decisionTemplate,
    initialDecisions,
    language,
    option,
    remunerativerateRule,
    showAddDecisionModal,
    setShowLineModal,
    setDecisionData,
    onDecisionsChange,
    optionsConditionsCSV,
    setAddDecision,
    setEditDecision,
    setDeleteDecision,
  } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const [selectedDecision, setSelectedDecision] =
    useState<IRuleDecision | null>(null);

  useEffect(() => {
    setAddDecision(false);
    setEditDecision(false);
    setDeleteDecision(false);
  }, []);

  useEffect(() => {
    if (showAddDecisionModal) {
      setIsModalOpen(true);
    }
  }, [showAddDecisionModal]);

  const localizedTemplate = useMemo(
    () =>
      ensureArrayGroupsDeep(
        /* eslint-disable @typescript-eslint/no-explicit-any */
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
  useEffect(() => {
    if (optionsConditionsCSV) {
      setSelectedConditionsCSV(optionsConditionsCSV);
    }
  }, [optionsConditionsCSV]);

  const [removedConditionNames, setRemovedConditionNames] = useState<
    Set<string>
  >(new Set());

  const removeCondition = (conditionName: string) => {
    const key = originalName(conditionName);
    setRemovedConditionNames((prev) => {
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  };

  const restoreConditions = (names: string[]) => {
    if (!names?.length) return;
    setRemovedConditionNames((prev) => {
      if (prev.size === 0) return prev;
      const next = new Set(prev);
      names.map(originalName).forEach((n) => next.delete(n));
      return next;
    });
  };

  const multipleChoicesOptions = useMemo(() => {
    const groups = (getConditionsByGroupNew(localizedTemplate) || {}) as Record<
      string,
      unknown
    >;

    const primaryGroup = groups["group-primary"] || [];

    return (
      asArray(primaryGroup)
        /* eslint-disable @typescript-eslint/no-explicit-any */
        .map((c: any) => ({
          id: c.conditionName,
          label: localizeLabel(c, language),
          value: c.conditionName,
        }))
        .filter((condition) => !conditionsHidden.includes(condition.id))
    );
  }, [localizedTemplate, language]);

  const onMultipleChoicesChange = (_name: string, valueCSV: string) => {
    setSelectedConditionsCSV(valueCSV);
  };

  const openModal = (decision: IRuleDecision | null = null) => {
    setSelectedDecision(
      decision ? normalizeDecisionToNewShape(decision) : null,
    );
    setIsModalOpen(true);
  };

  const handleToggleModal = () => {
    setShowAlertModal(!showAlertModal);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDecision(null);
  };
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const submitForm = (dataDecision: any) => {
    const validateValue = decisionsSorted.filter(
      (decision) => decision.value === dataDecision.value,
    );

    if (validateValue.length > 0 && selectedDecision === null) {
      setShowAlertModal(true);
    } else {
      if (selectedDecision === null) {
        setAddDecision(true);
      } else {
        setAddDecision(false);
      }
      if (remunerativerateRule) {
        setShowLineModal(true);
      }
      const isEditing = selectedDecision !== null;

      const base = isEditing
        ? { ...selectedDecision, ...dataDecision }
        : {
            ...localizedTemplate,
            ...dataDecision,
          };

      const tplGroups = (getConditionsByGroupNew(localizedTemplate) ||
        {}) as Record<string, unknown>;
      const dataGroups = (getConditionsByGroupNew(dataDecision) ||
        {}) as Record<string, unknown>;

      const mergedGroups = Object.fromEntries(
        Object.entries(tplGroups).map(([group, tplList]) => {
          const dataList = asArray(dataGroups[group]);
          /* eslint-disable @typescript-eslint/no-explicit-any */
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
          /* eslint-disable @typescript-eslint/no-explicit-any */
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
        /* eslint-disable @typescript-eslint/no-explicit-any */
        conditionGroups: groupsRecordToArrayNew(
          mergedGroups as Record<string, any[]>,
        ),
      };
      /* eslint-disable @typescript-eslint/no-explicit-any */
      delete (newDecision as any).conditionsThatEstablishesTheDecision;

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
    }
  };

  useEffect(() => {
    onDecisionsChange?.(decisions);
  }, [decisions, onDecisionsChange]);

  const filteredDecisionTemplate = useMemo(() => {
    const normalizedTemplate = ensureArrayGroupsDeep(localizedTemplate);
    const tpl = safeSortDisplayDataSampleSwitchPlaces({
      decisionTemplate: normalizedTemplate,
    });

    const tplGroups = (getConditionsByGroupNew(tpl) || {}) as Record<
      string,
      unknown
    >;
    const filteredEntries = Object.entries(tplGroups).reduce(
      (acc, [group, list]) => {
        const kept = asArray(list).filter(
          /* eslint-disable @typescript-eslint/no-explicit-any */
          (c: any) =>
            (selectedIds.size === 0 || selectedIds.has(c.conditionName)) &&
            !removedConditionNames.has(c.conditionName) &&
            !c?.hidden,
        );
        if (kept.length > 0) acc.push([group, kept]);
        return acc;
      },
      /* eslint-disable @typescript-eslint/no-explicit-any */
      [] as [string, any[]][],
    );

    const filtered = Object.fromEntries(filteredEntries);

    const withFiltered: IRuleDecision = {
      ...tpl,
      /* eslint-disable @typescript-eslint/no-explicit-any */
      labelName: localizeLabel(tpl as any, language),
      /* eslint-disable @typescript-eslint/no-explicit-any */
      conditionGroups: groupsRecordToArrayNew(
        filtered as Record<string, any[]>,
      ) as any,
    };
    /* eslint-disable @typescript-eslint/no-explicit-any */
    delete (withFiltered as any).conditionsThatEstablishesTheDecision;

    return ensureArrayGroupsDeep(withFiltered);
  }, [localizedTemplate, language, selectedIds, removedConditionNames]);

  const decisionsSorted = useMemo(() => {
    return decisions;
  }, [decisions]);

  const renderedListRef = useRef<IRuleDecision[]>([]);
  renderedListRef.current = decisionsSorted;

  const extractId = useMemo(
    () => makeIdExtractor(() => renderedListRef.current),
    [],
  );
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const deleteDecision = (...args: any[]) => {
    setDeleteDecision(true);
    const id = extractId(...args);
    if (!id) return;
    setDecisions((prev) => prev.filter((d) => keyOf(d) !== id));
  };

  const responseForBackend = useMemo(() => {
    const ruleNameFromTemplate =
      /* eslint-disable @typescript-eslint/no-explicit-any */
      (decisionTemplate as any)?.ruleName ||
      /* eslint-disable @typescript-eslint/no-explicit-any */
      (decisionTemplate as any)?.businessRuleName ||
      /* eslint-disable @typescript-eslint/no-explicit-any */
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

  const optionDetailsCreditline =
    option === EUseCase.DETAILS || option === EUseCase.DETAILS_CONDITIONAL;

  const message = optionDetailsCreditline ? "" : newBusinessRulesLabels.before;

  const mesaggeEmpty =
    option === EUseCase.DETAILS || option === EUseCase.DETAILS_CONDITIONAL
      ? newBusinessRulesLabels.NoDecision
      : newBusinessRulesLabels.NoStringAttached;

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
    message,
    mesaggeEmpty,
    optionDetailsCreditline,
    showAlertModal,
    handleToggleModal,
    setSelectedConditionsCSV,
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
