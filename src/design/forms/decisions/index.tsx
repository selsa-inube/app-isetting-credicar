import { useContext } from "react";

import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useEnumRules } from "@hooks/moneyDestination/useEnumRules";
import { useDecisionForm } from "@hooks/forms/useDecisionForm";
import { capitalizeText } from "@utils/capitalizeText";
import { ENameRules } from "@enum/nameRules";
import { IDecisionsForm } from "@ptypes/design/IDecisionsForm";
import { IRuleDecisionExtended } from "@ptypes/IRuleDecisionExtended";
import { DecisionsFormUI } from "./interface";

const DecisionsForm = (props: IDecisionsForm) => {
  const {
    attentionModal,
    deleteModal,
    initialValues,
    labelBusinessRules,
    textValuesBusinessRules,
    editDataOption,
    nameRule,
    showAttentionModal,
    titleContentAddCard,
    messageEmptyDecisions,
    normalizeEvaluateRuleData,
    disabledButton,
    heightContentPage = "70vh",
    bottomAddButton = "55px",
    ruleCatalog = ENameRules.RULE_CATALOG_CREDIBOARD,
    decisionTemplateConfig,
    onButtonClick,
    onPreviousStep,
    revertModalDisplayData,
    setDecisions,
    setShowAttentionModal,
  } = props;
  console.log('DecisionsForm23: ', initialValues);
  const {
    isModalOpen,
    selectedDecision,
    decisions,
    showDeleteModal,
    isMobile,
    saveButtonLabel,
    cancelButtonLabel,
    shouldShowAttentionModal,
    disabledNext,
    disabledPrevius,
    showDecisionModal,
    showFloatingAddButton,
    heightContent,
    handleOpenModal,
    handleCloseModal,
    handleSubmitForm,
    handleToggleAttentionModal,
    handleToggleDeleteModal,
    handleDelete,
    handleSave,
  } = useDecisionForm({
    initialValues,
    revertModalDisplayData,
    onButtonClick,
    setCreditLineDecisions: setDecisions,
    showAttentionModal,
    setShowAttentionModal,
    normalizeEvaluateRuleData,
    editDataOption,
    disabledButton,
    onPreviousStep,
    attentionModal,
    heightContentPage,
  });

  const { appData } = useContext(AuthAndPortalData);
  const { ruleData } = useEnumRules({
    enumDestination: labelBusinessRules,
    ruleCatalog,
    catalogAction: capitalizeText(ruleCatalog),
    businessUnits: appData.businessUnit.publicCode,
  });

  const enumeratorsRules = ruleData as unknown as IRuleDecisionExtended;

  const getDecisionTemplate = () => {
    return decisionTemplateConfig(
      enumeratorsRules,
      appData.language,
      nameRule,
      appData.businessUnit.publicCode,
    ) as unknown as IRuleDecisionExtended;
  };

  const decisionTemplate = getDecisionTemplate();
  // const decisionTemplate = {
  // ruleName: "InterestRateType",
  // labelName: "Interest Rate Type",
  // descriptionUse:
  //   "It presents the list of available rate types according to the credit line (mv ma)",
  // decisionDataType: ValueDataType.PERCENTAGE,
  // howToSetTheDecision: EValueHowToSetUp.EQUAL,
  // value: "",
  // effectiveFrom: "",
  // validUntil: "",
  // conditionGroups: [
  //   {
  //     ConditionGroupId: "group-primary",
  //     conditionsThatEstablishesTheDecision: [
  //       {
  //         labelName: "Line of credit",
  //         conditionName: "LineOfCredit",
  //         descriptionUse: "Line of credit.",
  //         conditionDataType: ValueDataType.ALPHABETICAL,
  //         howToSetTheCondition: EValueHowToSetUp.EQUAL,
  //         value: "",
  //         i18n: {
  //           es: "Línea de crédito",
  //         },
  //       },
  //       {
  //         labelName: "Money Destination",
  //         conditionName: "MoneyDestination",
  //         descriptionUse: "Money Destination.",
  //         conditionDataType: ValueDataType.ALPHABETICAL,
  //         howToSetTheCondition: EValueHowToSetUp.EQUAL,
  //         value: "",
  //         i18n: {
  //           es: "Destino de dinero",
  //         },
  //       },
  //       {
  //         labelName: "Loan amount",
  //         conditionName: "LoanAmount",
  //         descriptionUse: "Loan amount",
  //         conditionDataType: ValueDataType.MONETARY,
  //         howToSetTheCondition: EValueHowToSetUp.RANGE,
  //         value: "",
  //         i18n: {
  //           es: "Monto del préstamo",
  //         },
  //       },
  //       {
  //         labelName: "Primary Income Type.",
  //         conditionName: "PrimaryIncomeType",
  //         descriptionUse: "Primary income type.",
  //         conditionDataType: ValueDataType.ALPHABETICAL,
  //         howToSetTheCondition: EValueHowToSetUp.RANGE,
  //         value: "",
  //         i18n: {
  //           es: "Tipo de fuente de ingreso primaria",
  //         },
  //       },
  //       {
  //         labelName: "Client Type",
  //         conditionName: "ClientType",
  //         descriptionUse: "Client Type.",
  //         conditionDataType: ValueDataType.ALPHABETICAL,
  //         howToSetTheCondition: EValueHowToSetUp.EQUAL,
  //         value: "",
  //         i18n: {
  //           es: "Tipo de cliente",
  //         },
  //       },
  //       {
  //         labelName: "Loan Term",
  //         conditionName: "LoanTerm",
  //         descriptionUse: "Loan Term.",
  //         conditionDataType: ValueDataType.NUMBER,
  //         howToSetTheCondition: EValueHowToSetUp.RANGE,
  //         value: "",
  //         i18n: {
  //           es: "Plazo del préstamo",
  //         },
  //       },
  //     ],
  //   },]
  // ,

  // i18n: {
  //   en: "Interest rate type",
  //   es: "Tipo de tasa de interés",
  // },
  // };
  console.log('DecisionsFormUI decisionTemplate: ',getDecisionTemplate());
  return (
    <DecisionsFormUI
      attentionModal={attentionModal}
      decisions={decisions}
      decisionTemplate={getDecisionTemplate}
      deleteModal={deleteModal}
      isModalOpen={isModalOpen}
      loading={false}
      onCloseModal={handleCloseModal}
      onDelete={handleDelete}
      onButtonClick={onButtonClick}
      onOpenModal={handleOpenModal}
      onSubmitForm={(dataDecision: IRuleDecisionExtended) =>
        handleSubmitForm(
          dataDecision,
          decisionTemplate as unknown as IRuleDecisionExtended,
        )
      }
      onToggleAttentionModal={handleToggleAttentionModal}
      onToggleDeleteModal={handleToggleDeleteModal}
      selectedDecision={selectedDecision}
      showDeleteModal={showDeleteModal}
      textValuesBusinessRules={textValuesBusinessRules}
      onSave={handleSave}
      titleContentAddCard={titleContentAddCard}
      messageEmptyDecisions={messageEmptyDecisions}
      isMobile={isMobile}
      saveButtonLabel={saveButtonLabel}
      cancelButtonLabel={cancelButtonLabel}
      shouldShowAttentionModal={shouldShowAttentionModal}
      disabledNext={disabledNext ?? false}
      disabledPrevius={disabledPrevius}
      cancelButton={onPreviousStep}
      showDecisionModal={showDecisionModal}
      showFloatingAddButton={showFloatingAddButton}
      editDataOption={editDataOption}
      heightContent={heightContent}
      bottomAddButton={bottomAddButton}
    />
  );
};

export { DecisionsForm };
