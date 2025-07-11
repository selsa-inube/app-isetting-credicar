import { MdOutlineAdd } from "react-icons/md";
import { Button, Stack } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";
import { Table } from "@design/data/table";
import { EComponentAppearance } from "@enum/appearances";
import {
  breakPoints,
  titles,
  actionsConfig,
} from "@config/payrollAgreement/payrollAgreementTab/assisted/ordinaryCyclesTable";
import { DecisionModal } from "@design/modals/decisionModal";
import { IRegularPaymentCyclesFormUI } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IRegularPaymentCyclesFormUI";
import { cyclespaymentLabels } from "@config/payrollAgreement/payrollAgreementTab/forms/cyclespaymentLabels";
import { BoxContainer } from "@design/layout/boxContainer";
import { FloatingAddButton } from "@design/feedback/floatingAddButton";
import { StyledFormContent } from "./styles";
import { AddCycleModal } from "../../addCycleModal";

const RegularPaymentCyclesFormUI = (props: IRegularPaymentCyclesFormUI) => {
  const {
    entries,
    formik,
    infoModal,
    disabledButtonNext,
    loading,
    numberDaysUntilCutOptions,
    paydayOptions,
    periodicityOptions,
    showAddModal,
    showInfoModal,
    valuesEqual,
    isMobile,
    columnWidths,
    labelButtonPrevious,
    labelButtonNext,
    setEntryDeleted,
    onChange,
    onAddCycle,
    onToggleInfoModal,
    onButtonClick,
    onToggleModal,
    onPreviousStep,
  } = props;

  return (
    <BoxContainer
      direction="column"
      gap={tokens.spacing.s300}
      minHeight="60vh"
      backgroundColor={EComponentAppearance.LIGHT}
      boxSizing="initial"
    >
      <StyledFormContent>
        <Stack direction="column" gap={tokens.spacing.s300}>
          <BoxContainer
            backgroundColor={EComponentAppearance.LIGHT}
            direction="column"
            boxSizing="initial"
            borderColor={EComponentAppearance.DARK}
            borderRadius={tokens.spacing.s100}
            gap={tokens.spacing.s300}
            width="auto"
            padding={
              isMobile ? `${tokens.spacing.s150}` : `${tokens.spacing.s300}`
            }
          >
            <Stack
              direction="column"
              width="100%"
              gap={tokens.spacing.s250}
              alignItems="end"
            >
              {!isMobile && (
                <Button
                  iconBefore={<MdOutlineAdd />}
                  onClick={onToggleModal}
                  appearance={EComponentAppearance.PRIMARY}
                >
                  {cyclespaymentLabels.titlePaymentCycle}
                </Button>
              )}

              <Table
                id="portal"
                titles={titles}
                entries={entries}
                actions={actionsConfig(setEntryDeleted, isMobile)}
                breakpoints={breakPoints}
                loading={loading}
                columnWidths={columnWidths}
                withActionsTitles
                emptyDataMessage={cyclespaymentLabels.emptyDataMessage}
                withActionMobile={false}
                withGeneralizedTitle={true}
              />
            </Stack>
            {isMobile && (
              <FloatingAddButton
                bottom="130px"
                right="32px"
                onToggleModal={onToggleModal}
              />
            )}
          </BoxContainer>
        </Stack>
      </StyledFormContent>
      <Stack justifyContent="flex-end" gap={tokens.spacing.s250}>
        <Button
          onClick={onPreviousStep}
          appearance={EComponentAppearance.GRAY}
          variant="outlined"
        >
          {labelButtonPrevious}
        </Button>

        <Button
          onClick={onButtonClick}
          disabled={disabledButtonNext}
          loading={loading}
          appearance={EComponentAppearance.PRIMARY}
        >
          {labelButtonNext}
        </Button>
      </Stack>
      {showAddModal && (
        <AddCycleModal
          actionText={cyclespaymentLabels.actionText}
          comparisonData={valuesEqual}
          formik={formik}
          loading={loading}
          portalId="portal"
          title={cyclespaymentLabels.addPaymentCycle}
          isOrdinary={true}
          periodicityOptions={periodicityOptions}
          paydayOptions={paydayOptions}
          numberDaysUntilCutOptions={numberDaysUntilCutOptions}
          onCloseModal={onToggleModal}
          onClick={onAddCycle}
          onChange={onChange}
          onToggleInfoModal={onToggleInfoModal}
        />
      )}

      {showInfoModal && (
        <DecisionModal
          portalId="portal"
          title={infoModal.title}
          description={infoModal.description}
          actionText={infoModal.actionText}
          withCancelButton={false}
          appearance={EComponentAppearance.PRIMARY}
          onCloseModal={onToggleInfoModal}
          onClick={onToggleInfoModal}
          moreDetails={infoModal.moreDetails}
        />
      )}
    </BoxContainer>
  );
};

export { RegularPaymentCyclesFormUI };
