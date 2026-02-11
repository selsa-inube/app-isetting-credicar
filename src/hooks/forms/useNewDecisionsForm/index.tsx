/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMediaQuery } from "@inubekit/inubekit";
import { useContext, useEffect, useMemo, useState } from "react";
import {
  getConditionsByGroupNew,
  groupsRecordToArrayNew,
} from "@isettingkit/business-rules";
import { MdInfoOutline, MdOutlineReportProblem } from "react-icons/md";
import { IRuleDecision } from "@isettingkit/input";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useEnumRules } from "@hooks/moneyDestination/useEnumRules";
import { capitalizeText } from "@utils/capitalizeText";
import { asArray } from "@utils/asArray";
import { localizeLabel } from "@utils/localizeLabel";
import { buildSelectedDecisionForEdit } from "@utils/buildSelectedDecisionForEdit";
import { transformDecision } from "@utils/transformDecision";
import { nextDecisionLabel } from "@utils/decisions/nextDecisionLabel";
import { compareValueDecision } from "@utils/compareValueDecision";
import { normalizeCondition } from "@utils/decisions/normalizeCondition";
import { EComponentAppearance } from "@enum/appearances";
import { EUseCase } from "@enum/useCase";
import { decisionsLabels } from "@config/decisions/decisionsLabels";
import { conditionsHidden } from "@config/creditLines/configuration/conditionsHidden";
import { rulesLabels } from "@config/generalCreditPolicies/assisted/RulesLabels";
import { IUseNewDecisionsForm } from "@ptypes/generalCredPolicies/IUseNewDecisionsForm";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { IConditionGroups } from "@ptypes/context/creditLinesConstruction/IConditionGroups";
import { IConditionsTheDecision } from "@ptypes/context/creditLinesConstruction/IConditionsTheDecision";

const useNewDecisionsForm = (props: IUseNewDecisionsForm) => {
  const {
    initialDecisions,
    option,
    disabledButton,
    nameRule = "",
    ruleCatalog,
    labelBusinessRules,
    setDecisionData,
    decisionTemplateConfig,
  } = props;

  const { appData } = useContext(AuthAndPortalData);
  const [selectedConditions, setSelectedConditions] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const [selectedDecision, setSelectedDecision] =
    useState<IRuleDecisionExtended | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [removedConditionKeys, setRemovedConditionKeys] = useState<Set<string>>(
    new Set(),
  );

  const { ruleData, loadingList } = useEnumRules({
    enumDestination: labelBusinessRules,
    ruleCatalog,
    catalogAction: capitalizeText(ruleCatalog),
    businessUnits: appData.businessUnit.publicCode,
    token: appData.token,
  });

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

  const [decisions, setDecisions] = useState<IRuleDecision[]>(
    normalizeDecisions(initialDecisions),
  );

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
    const base = {
      ...decisionTemplate,
      ...dataDecision,
    };

    const tplGroups = (getConditionsByGroupNew(decisionTemplate) ||
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
            labelName: localizeLabel(
              tplItem,
              appData.language as "es" | "en" | undefined,
            ),
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
      labelName: localizeLabel(
        base,
        appData.language as "es" | "en" | undefined,
      ),
      /* eslint-disable @typescript-eslint/no-explicit-any */
      conditionGroups: groupsRecordToArrayNew(
        mergedGroups as Record<string, any[]>,
      ),
    };
    const decisionWithSentences = transformDecision(
      newDecision,
      appData.language as "es" | "en" | undefined,
      option === EUseCase.EDIT,
      compareValueDecision(initialDecisions, newDecision),
      base.decisionId,
    );

    setDecisions((prev) => {
      const exists = prev.some(
        (d) => d.decisionId === decisionWithSentences.decisionId,
      );
      if (exists) {
        return prev.map((d) =>
          d.decisionId === decisionWithSentences.decisionId
            ? decisionWithSentences
            : d,
        );
      } else {
        return [...prev, decisionWithSentences];
      }
    });

    closeModal();
  };

  const openModal = (decision: IRuleDecision | null = null) => {
    if (decision) {
      const selectedFromTemplate = buildSelectedDecisionForEdit(
        decision,
        decisionTemplateFiltered,
      );

      setSelectedDecision(selectedFromTemplate);
      setIsCreatingNew(false);
    } else {
      setSelectedDecision({
        ...decisionTemplate,
        ...decisionTemplateFiltered,
        conditionGroups: decisionTemplateFiltered.conditionGroups || [],
      } as IRuleDecision);
      setIsCreatingNew(true);
    }

    setIsModalOpen(true);
  };

  const makeScopedKey = (groupKey: string, conditionName: string) =>
    `${groupKey}.${originalName(conditionName)}`;

  const removeCondition = (conditionName: string) => {
    const [firstPart, ...rest] = conditionName.split(".");
    const groupKey = rest.length > 0 ? firstPart : "group-primary";
    const plainName = rest.length > 0 ? rest.join(".") : firstPart;
    const scopedKey = makeScopedKey(groupKey, plainName);

    setRemovedConditionKeys((prev) => {
      const next = new Set(prev);
      next.add(scopedKey);
      return next;
    });

    setSelectedDecision((prev) => {
      if (!prev) return prev;

      const conditionGroups = prev.conditionGroups || [];

      const groups = Array.isArray(conditionGroups)
        ? conditionGroups
        : Object.entries(conditionGroups).map(([groupId, conditions]) => ({
            ConditionGroupId: groupId,
            conditionsThatEstablishesTheDecision: Array.isArray(conditions)
              ? conditions
              : [conditions],
          }));

      const updatedGroups = groups.map((group: IConditionGroups) => {
        const currentGroupId = group.ConditionGroupId || "group-primary";

        if (currentGroupId !== groupKey) return group;

        const conditions = group.conditionsThatEstablishesTheDecision || [];
        const filteredConditions = conditions.filter(
          (c: IConditionsTheDecision) =>
            originalName(c.conditionName) !== originalName(plainName),
        );

        return {
          ...group,
          ConditionGroupId: currentGroupId,
          conditionsThatEstablishesTheDecision: filteredConditions,
        };
      });

      return {
        ...prev,
        conditionGroups: updatedGroups,
        conditionsThatEstablishesTheDecision: updatedGroups as any,
      };
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
    if (!decisionTemplate || !decisionTemplate.conditionGroups) {
      return [];
    }

    const groups = (getConditionsByGroupNew(decisionTemplate) || {}) as Record<
      string,
      unknown
    >;

    const primaryGroup = groups["group-primary"] || [];

    return asArray(primaryGroup)
      .map((option: any) => ({
        id: option.conditionName,
        label: localizeLabel(
          option,
          appData.language as "es" | "en" | undefined,
        ),
        value: option.conditionName,
      }))
      .filter((condition) => !conditionsHidden.includes(condition.id));
  }, [decisionTemplate, appData.language]);

  const filteredDecisionTemplate = useMemo(() => {
    if (!decisionTemplate) return {} as IRuleDecision;

    const template = JSON.parse(JSON.stringify(decisionTemplate));

    if (!template.conditionGroups) {
      return {
        ...template,
        conditionGroups: [],
        labelName: localizeLabel(
          template,
          appData.language as "es" | "en" | undefined,
        ),
      };
    }

    const groups = Array.isArray(template.conditionGroups)
      ? template.conditionGroups
      : Object.entries(template.conditionGroups || {}).map(
          ([groupId, conditions]) => ({
            groupId,
            conditions: Array.isArray(conditions) ? conditions : [conditions],
          }),
        );

    const filteredGroups = groups
      .map((group: IConditionGroups) => ({
        ...group,
        conditionsThatEstablishesTheDecision: (
          group.conditionsThatEstablishesTheDecision || []
        ).filter((condition) => {
          if (condition?.hidden) return false;

          const hasSelection = selectedIds.size > 0;
          if (hasSelection && !selectedIds.has(condition.conditionName))
            return false;

          const key = `${group.ConditionGroupId}::${condition.conditionName}`;
          if (removedConditionKeys.has(key)) return false;

          return true;
        }),
      }))
      .filter(
        (group: IConditionGroups) =>
          group.conditionsThatEstablishesTheDecision.length > 0,
      );

    const result = {
      ...template,
      labelName: localizeLabel(
        template,
        appData.language as "es" | "en" | undefined,
      ),
      conditionGroups: filteredGroups,
    };

    delete result.conditionsThatEstablishesTheDecision;

    return result;
  }, [decisionTemplate, appData.language, selectedIds, removedConditionKeys]);

  const emptyConditionsTemplate = useMemo(() => {
    const existingGroups = decisionTemplate?.conditionGroups || [];

    const groupsArray = Array.isArray(existingGroups)
      ? existingGroups
      : Object.entries(existingGroups).map(([groupId]) => ({
          groupId,
          conditions: [],
        }));

    const emptyGroups =
      groupsArray.length > 0
        ? groupsArray.map((group) => ({
            groupId: group.groupId || "group-primary",
            conditions: [],
          }))
        : [{ groupId: "group-primary", conditions: [] }];

    return {
      ...decisionTemplate,
      conditionGroups: emptyGroups,
    };
  }, [decisionTemplate]);

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
    isCreatingNew, /////////////////////////revisar
    disabledNext,
    decisionTemplate,
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
