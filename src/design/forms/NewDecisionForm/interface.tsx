import { MdAdd } from "react-icons/md";
import { BusinessRulesNew } from "@isettingkit/business-rules";
import {
  Button,
  Checkpicker,
  Fieldset,
  IOption,
  SkeletonLine,
  Stack,
} from "@inubekit/inubekit";
import { AlertMessage } from "@pages/creditLines/tabs/forms/alertMessage";
import { StyledRulesScroll } from "@pages/creditLines/tabs/BusinessRulesNewHandler/styles";
import { DecisionBox } from "@pages/creditLines/tabs/forms/loadingForm/DecisionBox";
import { tokens } from "@design/tokens";
import { EComponentAppearance } from "@enum/appearances";
import { rulesLabels } from "@config/generalCreditPolicies/assisted/RulesLabels";
import { newBusinessRulesLabels } from "@config/creditLines/configuration/newBusinessRulesLabels";
import { configurationLabels } from "@config/creditLines/configurationLabels";
import { IRulesFormTextValues } from "@ptypes/decisions/IRulesFormTextValues";
import { INewDecisionsUI } from "@ptypes/decisions/INewDecisionsUI";
import { StyledMultipleChoiceContainer } from "./styles";

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
    loadingList,
    maxHeight,
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
      {loadingList ? (
        <>
          <Fieldset
            legend={configurationLabels.conditions}
            height="auto"
            spacing="compact"
          >
            <SkeletonLine width="100%" height="40px" animated />
          </Fieldset>

          <Stack justifyContent="flex-end">
            <Button iconBefore={<MdAdd />} spacing="compact" disabled>
              {configurationLabels.addButton}
            </Button>
          </Stack>

          <Fieldset
            legend={configurationLabels.decisions}
            height="auto"
            spacing="compact"
          >
            <Stack direction="column" width="100%" gap={tokens.spacing.s200}>
              {Array.from({ length: 2 }, (_, index) => (
                <DecisionBox key={index} />
              ))}
            </Stack>
          </Fieldset>
        </>
      ) : (
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

          {!dataEmpty ? (
            <Fieldset legend={newBusinessRulesLabels.decisionsTitle}>
              <StyledRulesScroll $maxHeight={maxHeight}>
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
                  loading={loadingList}
                  editionMode={editionMode}
                  onRemoveCondition={removeCondition}
                  onRestoreConditions={restoreConditions}
                  selectedDecision={selectedDecision}
                  textValues={textValues as IRulesFormTextValues}
                  shouldRenderEmptyMessage={dataEmpty || decisions.length > 0}
                />

                {conditionEmpty && (
                  <AlertMessage
                    mesaggeEmpty={mesaggeEmpty}
                    icon={iconMessage}
                    iconAppearance={iconAppearance}
                    message={customMessageEmptyDecisions ?? message}
                  />
                )}
              </StyledRulesScroll>
            </Fieldset>
          ) : (
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
              loading={loadingList}
              editionMode={editionMode}
              onRemoveCondition={removeCondition}
              onRestoreConditions={restoreConditions}
              selectedDecision={selectedDecision}
              textValues={textValues as IRulesFormTextValues}
              shouldRenderEmptyMessage={dataEmpty || decisions.length > 0}
            />
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
              disabled={!disabledNext}
            >
              {saveButtonLabel}
            </Button>
          </Stack>
        </>
      )}
    </Stack>
  );
};

export { NewDecisionFormUI };
