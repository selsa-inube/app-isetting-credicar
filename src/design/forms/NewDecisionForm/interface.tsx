import { MdAdd } from "react-icons/md";
import { BusinessRulesNew } from "@isettingkit/business-rules";
import {
  Button,
  Checkpicker,
  Fieldset,
  IOption,
  Stack,
} from "@inubekit/inubekit";
import { AlertMessage } from "@pages/creditLines/tabs/forms/alertMessage";
import { tokens } from "@design/tokens";
import { EComponentAppearance } from "@enum/appearances";
import { rulesLabels } from "@config/generalCreditPolicies/assisted/RulesLabels";
import { IRulesFormTextValues } from "@ptypes/decisions/IRulesFormTextValues";
import { INewDecisionsUI } from "@ptypes/decisions/INewDecisionsUI";
import {
  StyledFixedContainerMessage,
  StyledMultipleChoiceContainer,
} from "./styles";

const NewDecisionFormUI = (props: INewDecisionsUI) => {
  const {
    conditionEmpty,
    controls,
    customMessageEmptyDecisions,
    dataEmpty,
    decisions,
    decisionTemplate,
    editionMode,
    iconAppearance,
    iconMessage,
    isModalOpen,
    loading,
    mesaggeEmpty,
    message,
    multipleChoicesOptions,
    optionDetails,
    selectedConditions,
    selectedDecision,
    textValues,
    cancelButton,
    disabledPrevius,
    cancelButtonLabel,
    disabledNext,
    onSave,
    saveButtonLabel,
    closeModal,
    deleteDecision,
    onMultipleChoicesChange,
    openModal,
    removeCondition,
    restoreConditions,
    submitForm,
  } = props;

  return (
    <Stack direction="column" gap={tokens.spacing.s300}>
      {!loading && (
        <>
          {!optionDetails && (
            <>
              <Fieldset legend={rulesLabels.conditionsTitle}>
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
                    values={selectedConditions}
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
                  {rulesLabels.add}
                </Button>
              </Stack>
            </>
          )}
        </>
      )}
      {!loading && (
        <>
          <BusinessRulesNew
            baseDecisionTemplate={decisionTemplate}
            controls={controls}
            customMessageEmptyDecisions={customMessageEmptyDecisions}
            customTitleContentAddCard={undefined}
            decisionTemplate={decisionTemplate}
            decisions={decisions}
            handleCloseModal={closeModal}
            handleDelete={deleteDecision}
            handleOpenModal={openModal}
            handleSubmitForm={submitForm}
            isModalOpen={isModalOpen}
            loading={!!loading}
            editionMode={editionMode}
            onRemoveCondition={removeCondition}
            onRestoreConditions={restoreConditions}
            selectedDecision={selectedDecision}
            textValues={textValues as IRulesFormTextValues}
            shouldRenderEmptyMessage={dataEmpty || decisions.length > 0}
          />
          {conditionEmpty && (
            <StyledFixedContainerMessage>
              <AlertMessage
                mesaggeEmpty={mesaggeEmpty}
                icon={iconMessage}
                iconAppearance={iconAppearance}
                message={customMessageEmptyDecisions ?? message}
              />
            </StyledFixedContainerMessage>
          )}
        </>
      )}
      <Stack justifyContent="flex-end" gap={tokens.spacing.s250}>
        <Button
          onClick={cancelButton}
          appearance={EComponentAppearance.GRAY}
          disabled={disabledPrevius}
        >
          {cancelButtonLabel}
        </Button>

        <Button
          onClick={onSave}
          appearance={EComponentAppearance.PRIMARY}
          disabled={disabledNext}
        >
          {saveButtonLabel}
        </Button>
      </Stack>
    </Stack>
  );
};

export { NewDecisionFormUI };
