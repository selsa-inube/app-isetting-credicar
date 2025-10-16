/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Fieldset, Icon, Stack, Text } from "@inubekit/inubekit";
import { MdAdd, MdOutlineReportProblem } from "react-icons/md";
import type { IOption } from "@inubekit/inubekit";
import { BusinessRulesNew, Checkpicker } from "@isettingkit/business-rules";
import { EComponentAppearance } from "@enum/appearances";
import { tokens } from "@design/tokens";
import { newBusinessRulesLabels } from "@config/creditLines/configuration/newBusinessRulesLabels";
import { IBusinessRulesNew } from "@ptypes/creditLines/IBusinessRulesNew";
import { useBusinessRulesNew } from "@hooks/creditLine/useBusinessRulesNew";
import { IRulesFormTextValues } from "@ptypes/decisions/IRulesFormTextValues";
import { StyledMultipleChoiceContainer } from "./styles";

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
    setShowLineModal,
    setDecisionData,
    formId,
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
    closeModal,
    deleteDecision,
    onMultipleChoicesChange,
    openModal,
    removeCondition,
    restoreConditions,
    submitForm,
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
  });

  return (
    <Stack direction="column" gap={tokens.spacing.s300}>
      {!loading && (
        <>
          {!optionDetailsCreditline && (
            <>
              <Fieldset legend={newBusinessRulesLabels.conditionsTitle}>
                <StyledMultipleChoiceContainer>
                  <Checkpicker
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
                  disabled={selectedConditionsCSV.length === 0}
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

      {selectedConditionsCSV.length > 0 || decisionsSorted.length > 0 ? (
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
        />
      ) : (
        <Fieldset legend={newBusinessRulesLabels.decisionsTitle}>
          <Stack
            alignItems="center"
            direction="column"
            gap={tokens.spacing.s200}
            justifyContent="center"
            width="100%"
          >
            <Icon
              appearance="warning"
              icon={<MdOutlineReportProblem />}
              size="40px"
            />
            <Text
              appearance={EComponentAppearance.DARK}
              size="medium"
              type="title"
              weight="bold"
            >
              {newBusinessRulesLabels.NoStringAttached}
            </Text>
            <Text
              as="span"
              appearance={EComponentAppearance.GRAY}
              size="medium"
            >
              {customMessageEmptyDecisions ? (
                customMessageEmptyDecisions
              ) : (
                <>{message}</>
              )}
            </Text>
          </Stack>
        </Fieldset>
      )}
    </Stack>
  );
};

export { BusinessRulesNewHandler };
