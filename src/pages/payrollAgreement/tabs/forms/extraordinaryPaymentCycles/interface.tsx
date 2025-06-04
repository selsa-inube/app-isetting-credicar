import { MdOutlineAdd } from "react-icons/md";
import { Button, inube, Stack } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";
import { Table } from "@design/data/table";
import { ComponentAppearance } from "@enum/appearances";
import {
  breakPoints,
  titles,
  actionsConfig,
} from "@config/payrollAgreement/payrollAgreementTab/assisted/extraordinaryCyclesTable";
import { cyclespaymentLabels } from "@config/payrollAgreement/payrollAgreementTab/forms/cyclespaymentLabels";
import { IExtraordinaryPaymentCyclesFormUI } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IExtraordinaryPaymentCyclesFormUI";
import { BoxContainer } from "@design/layout/boxContainer";
import { useThemeData } from "@utils/theme";
import { FloatingAddButton } from "@design/feedback/floatingAddButton";
import { StyledFormContent } from "../styles";
import { AddCycleModal } from "../../addCycleModal";

const ExtraordinaryPaymentCyclesFormUI = (
  props: IExtraordinaryPaymentCyclesFormUI,
) => {
  const theme = useThemeData();
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
      minHeight="55vh"
      backgroundColor={
        theme ? theme?.palette?.neutral?.N0 : inube.palette.neutral.N0
      }
      boxSizing="initial"
    >
      <StyledFormContent>
        <Stack direction="column" gap={tokens.spacing.s300}>
          <BoxContainer
            borderColor={
              theme ? theme?.palette?.neutral?.N40 : inube.palette.neutral.N40
            }
            borderRadius={tokens.spacing.s100}
            gap={tokens.spacing.s300}
            width="auto"
            padding={
              isMobile ? `${tokens.spacing.s150}` : `${tokens.spacing.s300}`
            }
            backgroundColor={
              theme ? theme?.palette?.neutral?.N0 : inube.palette.neutral.N0
            }
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
                  appearance={ComponentAppearance.PRIMARY}
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
            {isMobile && <FloatingAddButton onToggleModal={onToggleModal} />}
          </BoxContainer>
        </Stack>
      </StyledFormContent>
      <Stack justifyContent="flex-end" gap={tokens.spacing.s250}>
        <Button
          onClick={onPreviousStep}
          appearance={ComponentAppearance.GRAY}
          variant="outlined"
        >
          {labelButtonPrevious}
        </Button>

        <Button
          onClick={onButtonClick}
          disabled={isDisabledButton}
          loading={loading}
          appearance={ComponentAppearance.PRIMARY}
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
