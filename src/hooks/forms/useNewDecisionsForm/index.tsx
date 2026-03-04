/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMediaQuery } from "@inubekit/inubekit";
import { useContext, useEffect, useMemo, useState } from "react";
import {
  getConditionsByGroupNew,
  groupsRecordToArrayNew,
} from "@isettingkit/business-rules";
import { MdInfoOutline, MdOutlineReportProblem } from "react-icons/md";
import { IRuleDecision, ValueDataType } from "@isettingkit/input";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useEnumRules } from "@hooks/moneyDestination/useEnumRules";
import { capitalizeText } from "@utils/capitalizeText";
import { normalizeConditionTraduction } from "@utils/normalizeConditionTraduction";
import { EEditionMode } from "@enum/editionMode";
import { asArray } from "@utils/asArray";
import { localizeLabel } from "@utils/localizeLabel";
import { buildSelectedDecisionForEdit } from "@utils/buildSelectedDecisionForEdit";
import { transformDecision } from "@utils/transformDecision";
import { nextDecisionLabel } from "@utils/decisions/nextDecisionLabel";
import { compareValueDecision } from "@utils/compareValueDecision";
import { localizeDecision } from "@utils/localizeDecision";
import { ensureArrayGroupsDeep } from "@utils/ensureArrayGroupsDeep";
import { transformDecisions } from "@utils/transforDecisionPolicies";
import { getConditionsTraduction } from "@utils/getConditionsTraduction";
import { formatDateDecision } from "@utils/date/formatDateDecision";
import { getAfterDay } from "@utils/getAfterDay";
import { normalizeCondition } from "@utils/decisions/normalizeCondition";
import { keyOf } from "@utils/keyOf";
import { getEditionModeForDecision } from "@utils/getEditionModeForDecision";
import { safeSortDisplayDataSampleSwitchPlaces } from "@utils/safeSortDisplayDataSampleSwitchPlaces";
import { EComponentAppearance } from "@enum/appearances";
import { EUseCase } from "@enum/useCase";
import { decisionsLabels } from "@config/decisions/decisionsLabels";
import { conditionsHidden } from "@config/creditLines/configuration/conditionsHidden";
import { rulesLabels } from "@config/generalCreditPolicies/assisted/RulesLabels";
import { IUseNewDecisionsForm } from "@ptypes/generalCredPolicies/IUseNewDecisionsForm";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { ILanguageDecision } from "@ptypes/ILanguageDecision";

const useNewDecisionsForm = (props: IUseNewDecisionsForm) => {
  const {
    initialDecisions,
    option,
    disabledButton,
    nameRule = "",
    ruleCatalog,
    labelBusinessRules,
    setEditDecision,
    setDecisionData,
    decisionTemplateConfig,
  } = props;

  const { appData } = useContext(AuthAndPortalData);

  const { ruleData, loadingList } = useEnumRules({
    enumDestination: labelBusinessRules,
    ruleCatalog,
    catalogAction: capitalizeText(ruleCatalog),
    businessUnits: appData.businessUnit.publicCode,
    token: appData.token,
  });

  const {
    conditionTraduction,
    ruleNameTraduction,
    listValuesDecision,
    dataType,
  } = getConditionsTraduction(ruleData, appData.language);

  const [selectedConditions, setSelectedConditions] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const [selectedDecision, setSelectedDecision] =
    useState<IRuleDecisionExtended | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [removedConditionKeys, setRemovedConditionKeys] = useState<Set<string>>(
    new Set(),
  );

  useEffect(() => {
    setEditDecision(false);
  }, []);

  const normalizeDecisions = (
    decisions: IRuleDecisionExtended[] | undefined,
  ) => {
    if (!Array.isArray(decisions)) return [];

    return decisions.map((decision) => ({
      ...decision,
      conditionGroups: decision.conditionGroups || [],
      decisionsByRule: Array.isArray(decision.decisionsByRule)
        ? decision.decisionsByRule
        : [],
    }));
  };

  const [decisions, setDecisions] = useState<IRuleDecisionExtended[]>(
    normalizeDecisions(initialDecisions),
  );

  useEffect(() => {
    if (!conditionTraduction || conditionTraduction.length === 0) return;

    setDecisions(
      (prev) =>
        transformDecisions(
          prev,
          ruleNameTraduction as string,
          dataType,
          listValuesDecision,
          conditionTraduction,
        ) as IRuleDecisionExtended[],
    );
  }, [ruleData]);

  const getDecisionTemplate = () => {
    const template = decisionTemplateConfig(
      ruleData,
      appData.language,
      nameRule,
      appData.businessUnit.publicCode,
    ) as unknown as IRuleDecisionExtended;

    return {
      ...template,
    };
  };

  const decisionTemplate = getDecisionTemplate();

  const localizedTemplate = useMemo(
    () =>
      ensureArrayGroupsDeep(
        localizeDecision(
          decisionTemplate,
          appData.language as ILanguageDecision,
        ),
      ),
    [decisionTemplate, appData.language],
  );

  const originalName = (name: string) => name?.split(".").pop() || name;

  const selectedIds = useMemo(
    () => new Set(selectedConditions.split(",").filter(Boolean)),
    [selectedConditions],
  );

  const conditionEmpty = useMemo(() => {
    return selectedConditions.length === 0 && decisions.length === 0;
  }, [decisions, selectedConditions]);

  const dataEmpty = useMemo(() => {
    return selectedConditions.length > 0 && decisions.length === 0;
  }, [decisions, selectedConditions]);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDecision(null);
    setIsCreatingNew(false);
  };

  const onMultipleChoicesChange = (_name: string, valueCSV: string) => {
    setSelectedConditions(valueCSV);
  };

  const deleteDecision = (id: string) => {
    setDecisions((prev) => prev.filter((d) => d.decisionId !== id));
  };

  const submitForm = (dataDecision: any) => {
    const isEditing = selectedDecision !== null;

    if (!isEditing) {
      setEditDecision(false);
    } else {
      setEditDecision(true);
    }
    const base = {
      ...localizedTemplate,
      ...dataDecision,
      effectiveFrom: formatDateDecision(dataDecision.effectiveFrom) ?? "",
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

          const normalized = normalizeConditionTraduction(
            conditionTraduction,
            tplItem.conditionName,
          );
          return normalizeCondition({
            ...tplItem,
            labelName: localizeLabel(
              tplItem,
              appData.language as ILanguageDecision,
            ),
            conditionDataType:
              tplItem.conditionDataType?.toLocaleLowerCase() ??
              normalized?.conditionDataType?.toLowerCase() ??
              ValueDataType.ALPHABETICAL,
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
      effectiveFrom: formatDateDecision(base.effectiveFrom) ?? "",
      labelName: localizeLabel(base, appData.language as ILanguageDecision),
      /* eslint-disable @typescript-eslint/no-explicit-any */
      conditionGroups: groupsRecordToArrayNew(
        mergedGroups as Record<string, any[]>,
      ),
    };
    const decisionWithSentences = transformDecision(
      newDecision,
      appData.language as ILanguageDecision,
      isEditing,
      compareValueDecision(initialDecisions, newDecision),
      base.decisionId,
      true,
    );

    setDecisions((prev) => {
      if (isEditing && selectedDecision) {
        const editionMode = getEditionModeForDecision(option, selectedDecision);
        if (editionMode === EEditionMode.VERSIONED) {
          const updatedPrev = prev.map((decision) => {
            if (keyOf(decision) !== keyOf(selectedDecision)) {
              return decision;
            }

            return {
              ...decision,
              validUntil: getAfterDay(
                decisionWithSentences.effectiveFrom as string,
              ),
            };
          });

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

    closeModal();
  };

  const openModal = (decision: IRuleDecision | null = null) => {
    if (decision) {
      const selectedFromTemplate = buildSelectedDecisionForEdit(
        decision,
        decisionTemplateFiltered as any,
      );

      setSelectedDecision(selectedFromTemplate);
      setIsCreatingNew(false);
    } else {
      setSelectedDecision(null);
      setIsCreatingNew(true);
    }

    setIsModalOpen(true);
  };

  const makeScopedKey = (groupKey: string, conditionName: string) =>
    `${groupKey}.${originalName(conditionName)}`;

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
    if (!localizedTemplate || !localizedTemplate.conditionGroups) {
      return [];
    }

    const groups = (getConditionsByGroupNew(localizedTemplate) || {}) as Record<
      string,
      unknown
    >;

    const primaryGroup = groups["group-primary"] || [];

    return asArray(primaryGroup)
      .map((option: any) => ({
        id: option.conditionName,
        label: localizeLabel(option, appData.language as ILanguageDecision),
        value: option.conditionName,
      }))
      .filter((condition) => !conditionsHidden.includes(condition.id));
  }, [localizedTemplate, appData.language]);

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
      labelName: localizeLabel(
        tpl as any,
        appData.language as ILanguageDecision,
      ),
      /* eslint-disable @typescript-eslint/no-explicit-any */
      conditionGroups: groupsRecordToArrayNew(
        filtered as Record<string, any[]>,
      ) as any,
    };
    /* eslint-disable @typescript-eslint/no-explicit-any */
    delete (withFiltered as any).conditionsThatEstablishesTheDecision;

    return ensureArrayGroupsDeep(withFiltered);
  }, [localizedTemplate, appData.language, selectedIds, removedConditionKeys]);

  const emptyConditionsTemplate = useMemo(() => {
    const normalizedTemplate = ensureArrayGroupsDeep(localizedTemplate);
    const tpl = safeSortDisplayDataSampleSwitchPlaces({
      decisionTemplate: normalizedTemplate,
    });
    const groups = (getConditionsByGroupNew(tpl) || {}) as Record<
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

  const decisionTemplateFiltered =
    !selectedDecision && selectedConditions.length === 0
      ? emptyConditionsTemplate
      : filteredDecisionTemplate;

  const optionDetails = option === EUseCase.DETAILS;

  const editDataOption = option === EUseCase.EDIT;

  const saveButtonLabel = editDataOption
    ? decisionsLabels.labelSaveButton
    : decisionsLabels.labelNextButton;

  const iconAppearance = optionDetails
    ? EComponentAppearance.HELP
    : EComponentAppearance.WARNING;

  const iconMessage = optionDetails ? (
    <MdInfoOutline />
  ) : (
    <MdOutlineReportProblem />
  );

  const cancelButtonLabel = editDataOption
    ? decisionsLabels.labelCancelButton
    : decisionsLabels.labelpreviousButton;

  const mesaggeEmpty = optionDetails
    ? rulesLabels.NoDecision
    : rulesLabels.NoStringAttached;

  const message = optionDetails ? "" : rulesLabels.before;

  const disabledNext = disabledButton;
  const disabledPrevius = editDataOption ? !hasChanges : false;

  const smallScreen = useMediaQuery("(min-width: 768px)");
  const mediumScreen = useMediaQuery("(min-width: 1024px)");
  const largeScreen = useMediaQuery("(min-width: 1440px)");
  const extraLargeScreen = useMediaQuery("(min-width: 1680px)");

  const visibleRows =
    (extraLargeScreen && 12) ||
    (largeScreen && 10) ||
    (mediumScreen && 8) ||
    (smallScreen && 6) ||
    6;

  const rowHeight = 96;

  const maxHeight = visibleRows * rowHeight;

  useEffect(() => {
    setDecisionData(decisions);
  }, [decisions]);

  useEffect(() => {
    if (JSON.stringify(decisions) !== JSON.stringify(initialDecisions)) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }
  }, [decisions, initialDecisions]);

  return {
    conditionEmpty,
    dataEmpty,
    decisions,
    iconAppearance,
    iconMessage,
    isModalOpen,
    mesaggeEmpty,
    message,
    multipleChoicesOptions,
    optionDetails,
    selectedConditions,
    selectedDecision,
    disabledPrevius,
    cancelButtonLabel,
    isCreatingNew,
    disabledNext,
    localizedTemplate,
    decisionTemplateFiltered,
    loadingList,
    maxHeight,
    saveButtonLabel,
    closeModal,
    deleteDecision,
    onMultipleChoicesChange,
    openModal,
    removeCondition,
    restoreConditions,
    submitForm,
  };
};

export { useNewDecisionsForm };
