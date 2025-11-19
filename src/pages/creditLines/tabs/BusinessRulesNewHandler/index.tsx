/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Fieldset, Stack } from "@inubekit/inubekit";
import { MdAdd } from "react-icons/md";
import type { IOption } from "@inubekit/inubekit";
import { BusinessRulesNew } from "@isettingkit/business-rules";
import { Checkpicker as Checkpick } from "@isettingkit/input";
import { useAlertDecisionModal } from "@hooks/creditLine/configurationLines/useAlertDecisionModal";
import { useBusinessRulesNew } from "@hooks/creditLine/useBusinessRulesNew";
import { tokens } from "@design/tokens";
import { DecisionModal } from "@design/modals/decisionModal";
import { newBusinessRulesLabels } from "@config/creditLines/configuration/newBusinessRulesLabels";
import { portalId } from "@config/portalId";
import { IBusinessRulesNew } from "@ptypes/creditLines/IBusinessRulesNew";
import { IRulesFormTextValues } from "@ptypes/decisions/IRulesFormTextValues";
import { StyledMultipleChoiceContainer } from "./styles";
import { AlertMessage } from "../forms/alertMessage";

const BusinessRulesNewHandler = (props: IBusinessRulesNew) => {
  const {
    controls,
    customMessageEmptyDecisions,
    customTitleContentAddCard,
    decisionTemplate,
    initialDecisions,
    language,
    loading,
    textValues,
    option,
    optionsConditionsCSV,
    remunerativerateRule,
    showAddDecisionModal,
    ruleLoading,
    setShowLineModal,
    setDecisionData,
    formId,
    setAddDecision,
    setEditDecision,
    setDeleteDecision,
  } = props;

  const {
    filteredDecisionTemplate,
    isModalOpen,
    localizedTemplate,
    multipleChoicesOptions,
    selectedConditionsCSV,
    selectedDecision,
    optionDetailsCreditline,
    message,
    mesaggeEmpty,
    dataEmpty,
    conditionEmpty,
    showAlertModal,
    iconMessage,
    iconAppearance,
    closeModal,
    deleteDecision,
    onMultipleChoicesChange,
    openModal,
    removeCondition,
    restoreConditions,
    submitForm,
    handleToggleModal,
    decisionsSorted,
  } = useBusinessRulesNew({
    controls,
    customMessageEmptyDecisions,
    customTitleContentAddCard,
    decisionTemplate,
    initialDecisions,
    language,
    loading,
    textValues,
    setDecisionData,
    formId,
    optionsConditionsCSV,
    option,
    remunerativerateRule,
    showAddDecisionModal,
    setShowLineModal,
    setAddDecision,
    setEditDecision,
    setDeleteDecision,
  });

  const { alertModal, showDecision } = useAlertDecisionModal({
    showAlertModal,
    handleToggleModal,
  });

  return (
    <Stack direction="column" gap={tokens.spacing.s300}>
      {!ruleLoading && (
        <>
          {!optionDetailsCreditline && (
            <>
              <Fieldset legend={newBusinessRulesLabels.conditionsTitle}>
                <StyledMultipleChoiceContainer>
                  <Checkpick
                    fullwidth
                    id="conditionsPicker"
                    label=""
                    name="conditionsPicker"
                    onChange={onMultipleChoicesChange}
                    options={multipleChoicesOptions as IOption[]}
                    placeholder="Selecciona las condiciones"
                    required={false}
                    size="wide"
                    values={selectedConditionsCSV}
                  />
                </StyledMultipleChoiceContainer>
              </Fieldset>

              <Stack justifyContent="flex-end">
                <Button
                  appearance="primary"
                  cursorHover
                  disabled={false}
                  iconBefore={<MdAdd />}
                  onClick={() => openModal()}
                >
                  {newBusinessRulesLabels.add}
                </Button>
              </Stack>
            </>
          )}
        </>
      )}
      {!ruleLoading && (
        <>
          {conditionEmpty && (
            <AlertMessage
              mesaggeEmpty={mesaggeEmpty}
              icon={iconMessage}
              iconAppearance={iconAppearance}
              message={customMessageEmptyDecisions ?? message}
            />
          )}
          <BusinessRulesNew
            baseDecisionTemplate={localizedTemplate}
            controls={!optionDetailsCreditline}
            customMessageEmptyDecisions={customMessageEmptyDecisions}
            customTitleContentAddCard={customTitleContentAddCard}
            decisionTemplate={filteredDecisionTemplate as any}
            decisions={decisionsSorted}
            handleCloseModal={closeModal}
            handleDelete={deleteDecision}
            handleOpenModal={openModal}
            handleSubmitForm={submitForm}
            isModalOpen={isModalOpen}
            loading={!!loading}
            onRemoveCondition={removeCondition}
            onRestoreConditions={restoreConditions}
            selectedDecision={selectedDecision}
            textValues={textValues as IRulesFormTextValues}
            shouldRenderEmptyMessage={dataEmpty || decisionsSorted.length > 0}
          />

          {showDecision && (
            <DecisionModal
              portalId={portalId}
              appearance={alertModal.appearance}
              appearanceButton={alertModal.appearanceButton}
              actionText={alertModal.actionText}
              description={alertModal.description}
              icon={alertModal.icon}
              onClick={alertModal.onClick}
              onCloseModal={alertModal.onCloseModal}
              title={alertModal.title}
              withCancelButton={alertModal.withCancelButton}
              withIcon={alertModal.withIcon}
              changeZIndex
            />
          )}
        </>
      )}
    </Stack>
  );
};

export { BusinessRulesNewHandler };
