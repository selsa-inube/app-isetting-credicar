import { MdOutlineWarningAmber } from "react-icons/md";
import { BusinessRules } from "@isettingkit/business-rules";
import { Stack, Button } from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { ComponentAppearance } from "@enum/appearances";
import { DecisionModal } from "@design/modals/decisionModal";
import { IDecisionsFormUI } from "@ptypes/design/IDecisionsFormUI";
import { FloatingAddButton } from "@design/feedback/floatingAddButton";
import { StyledContainer, StyledFormContent } from "./styles";

const DecisionsFormUI = (props: IDecisionsFormUI) => {
  const {
    attentionModal,
    decisions,
    decisionTemplate,
    deleteModal,
    isModalOpen,
    loading,
    selectedDecision,
    showDeleteModal,
    textValuesBusinessRules,
    titleContentAddCard,
    messageEmptyDecisions,
    isMobile,
    saveButtonLabel,
    cancelButtonLabel,
    showDecisionModal,
    disabledNext,
    disabledPrevius,
    showFloatingAddButton,
    cancelButton,
    onCloseModal,
    onDelete,
    onButtonClick,
    onOpenModal,
    onSubmitForm,
    onToggleAttentionModal,
    onToggleDeleteModal,
    onSave,
  } = props;

  return (
    <form>
      <Stack direction="column" gap={tokens.spacing.s300} height="50vh">
        <StyledFormContent>
          <StyledContainer $isMobile={isMobile}>
            <BusinessRules
              decisions={decisions}
              textValues={textValuesBusinessRules}
              loading={loading}
              decisionTemplate={decisionTemplate}
              isModalOpen={isModalOpen}
              selectedDecision={selectedDecision}
              handleOpenModal={onOpenModal}
              handleCloseModal={onCloseModal}
              handleSubmitForm={onSubmitForm}
              handleDelete={onToggleDeleteModal}
              customTitleContentAddCard={titleContentAddCard}
              customMessageEmptyDecisions={messageEmptyDecisions}
            />
          </StyledContainer>
          {showFloatingAddButton && (
            <FloatingAddButton
              onToggleModal={onOpenModal}
              bottom="60px"
              right="36px"
            />
          )}
        </StyledFormContent>
        <Stack justifyContent="flex-end" gap={tokens.spacing.s250}>
          <Button
            onClick={cancelButton}
            appearance={ComponentAppearance.GRAY}
            disabled={disabledPrevius}
          >
            {cancelButtonLabel}
          </Button>

          <Button
            onClick={onSave}
            appearance={ComponentAppearance.PRIMARY}
            disabled={disabledNext}
          >
            {saveButtonLabel}
          </Button>
        </Stack>
        {showDecisionModal && (
          <DecisionModal
            portalId="portal"
            title={attentionModal!.title}
            description={attentionModal!.description}
            actionText={attentionModal!.actionText}
            withIcon
            icon={<MdOutlineWarningAmber />}
            appearance={ComponentAppearance.WARNING}
            onCloseModal={onToggleAttentionModal}
            onClick={onButtonClick}
          />
        )}
        {showDeleteModal && (
          <DecisionModal
            portalId="portal"
            title={deleteModal.title}
            description={deleteModal.description}
            actionText={deleteModal.actionText}
            onCloseModal={() => onToggleDeleteModal("")}
            onClick={onDelete}
          />
        )}
      </Stack>
    </form>
  );
};

export { DecisionsFormUI };
