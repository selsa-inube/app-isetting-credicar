import { MdOutlineAdd } from "react-icons/md";
import { Button, Stack } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";
import { Table } from "@design/data/table";
import { EComponentAppearance } from "@enum/appearances";
import {
  breakPoints,
  titles,
  actionsConfig,
} from "@config/payrollAgreement/payrollAgreementTab/assisted/extraordinaryCyclesTable";
import { cyclespaymentLabels } from "@config/payrollAgreement/payrollAgreementTab/forms/cyclespaymentLabels";
import { IExtraordinaryPaymentCyclesFormUI } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IExtraordinaryPaymentCyclesFormUI";
import { BoxContainer } from "@design/layout/boxContainer";
import { FloatingAddButton } from "@design/feedback/floatingAddButton";
import { portalId } from "@config/portalId";
import { StyledFormContent } from "../styles";
import { AddCycleModal } from "../../addCycleModal";

const ExtraordinaryPaymentCyclesFormUI = (
  props: IExtraordinaryPaymentCyclesFormUI,
) => {
  const {
    formik,
    loading,
    entries,
    showModal,
    valuesEqual,
    isDisabledButton,
    isMobile,
    typePaymentOptions,
    monthOptions,
    dayOptions,
    numberDaysUntilCutOptions,
    labelButtonNext,
    labelButtonPrevious,
    columnWidths,
    onChange,
    onAddCycle,
    onButtonClick,
    onToggleModal,
    onPreviousStep,
    setEntryDeleted,
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
            borderColor={EComponentAppearance.DARK}
            borderRadius={tokens.spacing.s100}
            gap={tokens.spacing.s300}
            width="auto"
            padding={
              isMobile ? `${tokens.spacing.s150}` : `${tokens.spacing.s300}`
            }
            backgroundColor={EComponentAppearance.LIGHT}
            boxSizing="initial"
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
                id={portalId}
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
          disabled={isDisabledButton}
          loading={loading}
          appearance={EComponentAppearance.PRIMARY}
        >
          {labelButtonNext}
        </Button>
      </Stack>
      {showModal && (
        <AddCycleModal
          actionText={cyclespaymentLabels.actionText}
          comparisonData={valuesEqual}
          formik={formik}
          loading={loading}
          portalId="portal"
          title={cyclespaymentLabels.addPaymentCycle}
          isExtraordinary
          typePaymentOptions={typePaymentOptions}
          monthOptions={monthOptions}
          dayOptions={dayOptions}
          numberDaysUntilCutOptions={numberDaysUntilCutOptions}
          onCloseModal={onToggleModal}
          onClick={onAddCycle}
          onChange={onChange}
        />
      )}
    </BoxContainer>
  );
};

export { ExtraordinaryPaymentCyclesFormUI };
