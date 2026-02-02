import {
  getConditionsByGroupNew,
  groupsRecordToArrayNew,
} from "@isettingkit/business-rules";
import { MdInfoOutline, MdOutlineReportProblem } from "react-icons/md";
import { useEffect, useMemo, useRef, useState } from "react";
import { IRuleDecision } from "@isettingkit/input";
import { EComponentAppearance } from "@enum/appearances";
import { EUseCase } from "@enum/useCase";
import { mapDecisionsToRulePayload } from "@utils/mapDecisionsToRulePayload";
import { ensureUniqueIds } from "@utils/decisions/ensureUniqueIds";
import { getAfterDay } from "@utils/getAfterDay";
import { isDateBeforeSimple } from "@utils/isDateBeforeSimpleDecision";
import { compareValueDecision } from "@utils/compareValueDecision";
import { nextDecisionLabel } from "@utils/decisions/nextDecisionLabel";
import { conditionsHidden } from "@config/creditLines/configuration/conditionsHidden";
import { newBusinessRulesLabels } from "@config/creditLines/configuration/newBusinessRulesLabels";
import { IUseBusinessRulesNewGeneral } from "@ptypes/creditLines/IUseBusinessRulesNewGeneral";
import { asArray } from "@utils/asArray";
import { ensureArrayGroupsDeep } from "@utils/ensureArrayGroupsDeep";
import { localizeLabel } from "@utils/localizeLabel";
import { localizeDecision } from "@utils/localizeDecision";
import { transformDecision } from "@utils/transformDecision";
import { keyOf } from "@utils/keyOf";
import { safeSortDisplayDataSampleSwitchPlaces } from "@utils/safeSortDisplayDataSampleSwitchPlaces";
import { stableStringify } from "@utils/stableStringify";
import { buildSelectedDecisionForEdit } from "@utils/buildSelectedDecisionForEdit";
import { mapDecisionIdsFromConfigured } from "@utils/mapDecisionIdsFromConfigured";
import { configurationLinesEventBus } from "@events/configurationLinesEventBus";
import { getEditionModeForDecision } from "@utils/getEditionModeForDecision";

/* eslint-disable @typescript-eslint/no-explicit-any */
const normalizeCondition = (c: any) => ({
  ...c,
});

const originalName = (name: string) => name?.split(".").pop() || name;

const makeScopedKey = (groupKey: string, conditionName: string) =>
  `${groupKey}.${originalName(conditionName)}`;

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
  const [showAlertDateModal, setShowAlertDateModal] = useState<boolean>(false);
  const [selectedDecision, setSelectedDecision] =
    useState<IRuleDecision | null>(null);
  const [hydratedFromProps, setHydratedFromProps] = useState(false);
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
  const configuredRef: any = useRef<any[] | null>(null);
  useEffect(() => {
    const handler = (configured: IRuleDecision[]) => {
      if (!configured || configured.length === 0) return;

      configuredRef.current = configured;

      setDecisions((prev) => {
        if (!prev || prev.length === 0) {
          return prev;
        }

        const next = mapDecisionIdsFromConfigured(configuredRef.current, prev);

        return next;
      });
    };

    configurationLinesEventBus.on("configuredDecisionsUpdated", handler);
    return () => {
      configurationLinesEventBus.off("configuredDecisionsUpdated", handler);
    };
  }, []);

  useEffect(() => {
    if (!hydratedFromProps && (initialDecisions?.length ?? 0) > 0) {
      let next = ensureUniqueIds(
        (initialDecisions ?? []).map((d) => transformDecision(d, language)),
      );

      if (configuredRef.current && configuredRef.current.length > 0) {
        next = mapDecisionIdsFromConfigured(configuredRef.current, next);
      }

      setDecisions(next);
      setHydratedFromProps(true);
    }
  }, [initialDecisions, language, hydratedFromProps]);

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

  const [removedConditionKeys, setRemovedConditionKeys] = useState<Set<string>>(
    new Set(),
  );
  const removeCondition = (conditionName: string) => {
    const parts = conditionName.split(".");
    const groupKey = parts.length > 1 ? parts[0] : undefined;
    const plainName = parts.length > 1 ? parts.slice(1).join(".") : parts[0];
    const effectiveGroupKey = groupKey ?? "group-primary";
    const scopedKey = makeScopedKey(effectiveGroupKey, plainName);

    setRemovedConditionKeys((prev) => {
      const next = new Set(prev);
      next.add(scopedKey);
      return next;
    });

    setSelectedDecision((prev) => {
      if (!prev) return prev;

      const groups = getConditionsByGroupNew(prev) || {};

      const updatedGroupsRecord = Object.fromEntries(
        Object.entries(groups).map(([g, list]) => {
          if (effectiveGroupKey && g !== effectiveGroupKey) return [g, list];

          return [
            g,
            list.filter(
              (c) => originalName(c.conditionName) !== originalName(plainName),
            ),
          ];
        }),
      );

      const nextDecision: IRuleDecision = {
        ...prev,
        conditionGroups: groupsRecordToArrayNew(updatedGroupsRecord) as any,
        conditionsThatEstablishesTheDecision: updatedGroupsRecord as any,
      };

      return nextDecision;
    });
  };

  const restoreConditions = (scopedNames: string[]) => {
    if (!scopedNames?.length) return;

    setRemovedConditionKeys((prev) => {
      if (prev.size === 0) return prev;

      const next = new Set(prev);

      scopedNames.forEach((scoped) => {
        const [groupKey, ...rest] = scoped.split(".");
        const plainName = rest.join(".");
        next.delete(makeScopedKey(groupKey, plainName));
      });

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
    if (decision) {
      const selectedFromTemplate = buildSelectedDecisionForEdit(
        decision,
        decisionTemplateForBusinessRules as any,
      );
      setSelectedDecision(selectedFromTemplate);
    } else {
      setSelectedDecision({
        ...localizedTemplate,
        ...(decisionTemplateForBusinessRules as any),
      } as IRuleDecision);
    }

    setIsModalOpen(true);
  };

  const handleToggleModal = () => {
    setShowAlertModal(!showAlertModal);
  };

  const handleToggleDateModal = () => {
    setShowAlertDateModal(!showAlertDateModal);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDecision(null);
  };

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const submitForm = (dataDecision: any) => {
    let hasDateError = false;

    const validateValue = decisionsSorted.filter(
      (decision) => decision.value === dataDecision.value,
    );

    const isDuplicateNewDecision =
      validateValue.length > 0 && selectedDecision === null;

    if (isDuplicateNewDecision) {
      setShowAlertModal(true);
      setAddDecision(false);
      setEditDecision(false);
      return;
    }

    const isEditing = selectedDecision !== null;

    if (!isEditing) {
      setAddDecision(true);
      setEditDecision(false);
    } else {
      setAddDecision(false);
      setEditDecision(true);
    }

    if (remunerativerateRule) {
      setShowLineModal(true);
    }

    const base = {
      ...localizedTemplate,
      ...dataDecision,
    };

    const tplGroups = (getConditionsByGroupNew(localizedTemplate) ||
      {}) as Record<string, unknown>;
    const dataGroups = (getConditionsByGroupNew(dataDecision) || {}) as Record<
      string,
      unknown
    >;

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

          const scopedKey = makeScopedKey(group, m.conditionName);
          const notRemoved = !removedConditionKeys.has(scopedKey);

          return passesSelected && notRemoved;
        });

        return [group, finalList];
      }),
    );

    const usedIds = new Set(decisions.map((d) => String(d.decisionId ?? "")));
    const decisionIdForNew =
      base.decisionId && !usedIds.has(base.decisionId)
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

    const decisionWithSentences = transformDecision(
      newDecision,
      language,
      isEditing,
      compareValueDecision(initialDecisions, newDecision),
      base.decisionId,
    );

    setDecisions((prev) => {
      if (isEditing && selectedDecision) {
        const editionMode = getEditionModeForDecision(option, selectedDecision);
        if (editionMode === "versioned") {
          let localHasDateError = false;

          const updatedPrev = prev.map((decision) => {
            if (keyOf(decision) !== keyOf(selectedDecision)) {
              return decision;
            }

            if (
              isDateBeforeSimple(
                decisionWithSentences.effectiveFrom as string,
                decision.effectiveFrom as string,
              )
            ) {
              localHasDateError = true;
              setShowAlertDateModal(true);
              return decision;
            }

            return {
              ...decision,
              validUntil: getAfterDay(
                decisionWithSentences.effectiveFrom as string,
              ),
            };
          });

          if (localHasDateError) {
            hasDateError = true;
            return prev;
          }

          return [...updatedPrev, decisionWithSentences];
        }
        return prev.map((decision) =>
          keyOf(decision) === keyOf(selectedDecision)
            ? decisionWithSentences
            : decision,
        );
      }

      return [...prev, decisionWithSentences];
    });

    if (!hasDateError) {
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
        const kept = asArray(list).filter((c: any) => {
          if (c?.hidden) return false;

          const passesSelected =
            selectedIds.size > 0 && selectedIds.has(c.conditionName);

          const scopedKey = makeScopedKey(group, c.conditionName);
          const notRemoved = !removedConditionKeys.has(scopedKey);

          return passesSelected && notRemoved;
        });

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
  }, [localizedTemplate, language, selectedIds, removedConditionKeys]);

  const decisionsSorted = useMemo(() => {
    return [...decisions];
  }, [decisions]);

  const renderedListRef = useRef<IRuleDecision[]>([]);
  renderedListRef.current = decisionsSorted;

  const deleteDecision = (id: string) => {
    setDeleteDecision(true);
    setDecisions((prev) => prev.filter((d) => d.decisionId !== id));
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

  const conditionEmpty = useMemo(() => {
    return selectedConditionsCSV.length === 0 && decisionsSorted.length === 0;
  }, [decisionsSorted, selectedConditionsCSV]);

  const dataEmpty = useMemo(() => {
    return selectedConditionsCSV.length > 0 && decisionsSorted.length === 0;
  }, [decisionsSorted, selectedConditionsCSV]);

  const optionDetailsCreditline =
    option === EUseCase.DETAILS || option === EUseCase.DETAILS_CONDITIONAL;

  const message = optionDetailsCreditline ? "" : newBusinessRulesLabels.before;

  const mesaggeEmpty =
    option === EUseCase.DETAILS || option === EUseCase.DETAILS_CONDITIONAL
      ? newBusinessRulesLabels.NoDecision
      : newBusinessRulesLabels.NoStringAttached;

  const iconMessage =
    option === EUseCase.DETAILS || option === EUseCase.DETAILS_CONDITIONAL ? (
      <MdInfoOutline />
    ) : (
      <MdOutlineReportProblem />
    );

  const iconAppearance =
    option === EUseCase.DETAILS || option === EUseCase.DETAILS_CONDITIONAL
      ? EComponentAppearance.HELP
      : EComponentAppearance.WARNING;

  const emptyConditionsTemplate = useMemo(() => {
    const groups = (getConditionsByGroupNew(localizedTemplate) || {}) as Record<
      string,
      unknown
    >;

    const groupKeys = Object.keys(groups);
    const emptyRecord =
      groupKeys.length > 0
        ? Object.fromEntries(groupKeys.map((k) => [k, []]))
        : { "group-primary": [] };

    return {
      ...localizedTemplate,
      conditionGroups: groupsRecordToArrayNew(emptyRecord),
    };
  }, [localizedTemplate]);

  const decisionTemplateForBusinessRules =
    !selectedDecision && selectedConditionsCSV.length === 0
      ? emptyConditionsTemplate
      : filteredDecisionTemplate;

  return {
    isModalOpen,
    selectedDecision,
    decisions,
    selectedConditionsCSV,
    removedConditionNames: removedConditionKeys,
    localizedTemplate,
    filteredDecisionTemplate,
    multipleChoicesOptions,
    decisionsSorted,
    responseForBackend,
    message,
    mesaggeEmpty,
    optionDetailsCreditline,
    showAlertModal,
    dataEmpty,
    iconMessage,
    iconAppearance,
    conditionEmpty,
    showAlertDateModal,
    handleToggleDateModal,
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
    decisionTemplateForBusinessRules,
  };
};

export { useBusinessRulesNew };
