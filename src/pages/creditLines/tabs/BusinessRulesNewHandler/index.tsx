/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Fieldset, Icon, Stack, Text } from "@inubekit/inubekit";
import { MdAdd, MdOutlineReportProblem } from "react-icons/md";
import type { IOption } from "@inubekit/inubekit";
import { BusinessRulesNew, Checkpicker } from "@isettingkit/business-rules";
import { StyledMultipleChoiceContainer } from "./styles";
import { IBusinessRulesNew } from "@ptypes/creditLines/IBusinessRulesNew";
import { useBusinessRulesNew } from "@hooks/creditLine/useBusinessRulesNew";
import { IRulesFormTextValues } from "@ptypes/decisions/IRulesFormTextValues";

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
  } = props;

  const {
    decisionsSorted,
    filteredDecisionTemplate,
    isModalOpen,
    localizedTemplate,
    multipleChoicesOptions,
    selectedConditionsCSV,
    selectedDecision,
    closeModal,
    deleteDecision,
    onMultipleChoicesChange,
    openModal,
    removeCondition,
    restoreConditions,
    submitForm,
  } = useBusinessRulesNew({
    controls,
    customMessageEmptyDecisions,
    customTitleContentAddCard,
    decisionTemplate,
    initialDecisions,
    language,
    loading,
    textValues,
  });

  return (
    <Stack direction="column" gap="24px">
      <Fieldset legend="Condiciones que determinan las decisiones">
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
          Agregar plazo
        </Button>
      </Stack>

      {selectedConditionsCSV.length > 0 ? (
        <BusinessRulesNew
          baseDecisionTemplate={localizedTemplate}
          controls={controls}
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
        <Fieldset legend="Decisiones">
          <Stack
            alignItems="center"
            direction="column"
            gap="16px"
            justifyContent="center"
            width="100%"
          >
            <Icon
              appearance="warning"
              icon={<MdOutlineReportProblem />}
              size="40px"
            />
            <Text appearance="dark" size="medium" type="title" weight="bold">
              Sin condiciones
            </Text>
            <Text as="span" appearance="gray" size="medium">
              {customMessageEmptyDecisions ? (
                customMessageEmptyDecisions
              ) : (
                <>
                  Antes de agregar tus decisiones, selecciona las condiciones
                  que la determinan.
                </>
              )}
            </Text>
          </Stack>
        </Fieldset>
      )}
    </Stack>
  );
};

export { BusinessRulesNewHandler };
