import { MdOutlineWarningAmber } from "react-icons/md";
import { BusinessRulesWithGroup } from "@isettingkit/business-rules";
import { Stack, Button } from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { EComponentAppearance } from "@enum/appearances";
import { DecisionModal } from "@design/modals/decisionModal";
import { IDecisionsFormUI } from "@ptypes/design/IDecisionsFormUI";
import { FloatingAddButton } from "@design/feedback/floatingAddButton";
import { portalId } from "@config/portalId";
import { StyledContainer, StyledFormContent } from "./styles";
import { IRuleDecision } from "@isettingkit/input";

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
    editDataOption,
    heightContent,
    bottomAddButton,
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
  console.log('decisionTemplate', decisionTemplate);
  return (
    <form>
      <Stack
        direction="column"
        gap={tokens.spacing.s300}
        height={heightContent}
      >
        <StyledFormContent>
          <StyledContainer $isMobile={isMobile}>
            <BusinessRulesWithGroup
              decisions={decisions[0].decisionsByRule}
              textValues={textValuesBusinessRules}
              loading={loading}
              decisionTemplate={decisionTemplate as IRuleDecision}
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
              bottom={editDataOption ? bottomAddButton : "45px"}
              right="36px"
            />
          )}
        </StyledFormContent>
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
        {showDecisionModal && (
          <DecisionModal
            portalId={portalId}
            title={attentionModal!.title}
            description={attentionModal!.description}
            actionText={attentionModal!.actionText}
            withIcon
            icon={<MdOutlineWarningAmber />}
            appearance={EComponentAppearance.WARNING}
            onCloseModal={onToggleAttentionModal}
            onClick={onButtonClick}
          />
        )}
        {showDeleteModal && (
          <DecisionModal
            portalId={portalId}
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
