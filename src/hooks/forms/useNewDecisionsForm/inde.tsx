import { useContext, useMemo, useState } from "react";
import { getConditionsByGroupNew } from "@isettingkit/business-rules";
import { MdInfoOutline, MdOutlineReportProblem } from "react-icons/md";
import { IRuleDecision } from "@isettingkit/input";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useEnumRules } from "@hooks/moneyDestination/useEnumRules";
import { capitalizeText } from "@utils/capitalizeText";
import { asArray } from "@utils/asArray";
import { localizeLabel } from "@utils/localizeLabel";
import { buildSelectedDecisionForEdit } from "@utils/buildSelectedDecisionForEdit";
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
    onToggleDateModal,
    decisionTemplateConfig,
  } = props;

  const { appData } = useContext(AuthAndPortalData);
  const [selectedConditions, setSelectedConditions] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [decisions, setDecisions] = useState<IRuleDecision[]>(initialDecisions);
  const [selectedDecision, setSelectedDecision] =
    useState<IRuleDecisionExtended | null>(null);
  const [hasChanges] = useState(false);
  const [removedConditionKeys, setRemovedConditionKeys] = useState<Set<string>>(
    new Set(),
  );

  const { ruleData } = useEnumRules({
    enumDestination: labelBusinessRules,
    ruleCatalog,
    catalogAction: capitalizeText(ruleCatalog),
    businessUnits: appData.businessUnit.publicCode,
    token: appData.token,
  });

  const getDecisionTemplate = () => {
    return decisionTemplateConfig(
      ruleData,
      appData.language,
      nameRule,
      appData.businessUnit.publicCode,
    ) as unknown as IRuleDecisionExtended;
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
    // setDeleteDecision(true);
    setDecisions((prev) => prev.filter((d) => d.decisionId !== id));
  };

  const handleSave = () => {
    if (editDataOption) {
      // setHasChanges(false);
      // setSavedDecisions(decisions);
      onToggleDateModal();
      return decisions;
    } else {
      onToggleDateModal();
      if (decisions && decisions.length > 0) {
        // setSavedDecisions(decisions);
      }
    }
  };

  const submitForm = () => {
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

      const groups = Array.isArray(prev.conditionGroups)
        ? prev.conditionGroups
        : Object.entries(prev.conditionGroups || {}).map(
            ([groupId, conditions]) => ({
              ConditionGroupId: groupId,
              conditionsThatEstablishesTheDecision: Array.isArray(conditions)
                ? conditions
                : [conditions],
            }),
          );

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
    const groups = (getConditionsByGroupNew(decisionTemplate) || {}) as Record<
      string,
      unknown
    >;

    const primaryGroup = groups["group-primary"] || [];

    return (
      asArray(primaryGroup)
        /* eslint-disable @typescript-eslint/no-explicit-any */
        .map((option: any) => ({
          id: option.conditionName,
          label: localizeLabel(
            option,
            appData.language as "es" | "en" | undefined,
          ),
          value: option.conditionName,
        }))
        .filter((condition) => !conditionsHidden.includes(condition.id))
    );
  }, [decisionTemplate, appData.language]);

  const filteredDecisionTemplate = useMemo(() => {
    if (!decisionTemplate) return {} as IRuleDecision;

    const template = JSON.parse(JSON.stringify(decisionTemplate));
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

  const disabledNext = editDataOption ? !hasChanges : disabledButton;

  const disabledPrevius = editDataOption ? !hasChanges : false;

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
    handleSave,
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
