import { MdAdd } from "react-icons/md";
import { Stack, Button, Text, inube, Searchfield } from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { ComponentAppearance } from "@enum/appearances";
import { Table } from "@design/data/table";
import {
  actionsConfig,
  breakPoints,
  titles,
} from "@config/payrollAgreement/payrollAgreementTab/table";
import { payrollTabLabels } from "@config/payrollAgreement/payrollAgreementTab/generic/payrollTabLabels";
import { IpayrollAgreementTabUI } from "@ptypes/payrollAgreement/payrollAgreementTab/IpayrollAgreementTabUI";
import { BoxContainer } from "@design/layout/boxContainer";
import { useThemeData } from "@utils/theme";
import { tabLabels } from "@config/payrollAgreement/payrollAgreementTab/tabLabels";

const PayrollAgreementTabUI = (props: IpayrollAgreementTabUI) => {
  const {
    searchPayrollAgreement,
    entries,
    loading,
    smallScreen,
    columnWidths,
    pageLength,
    emptyDataMessage,
    setEntryDeleted,
    onSearchPayrollAgreement,
  } = props;

  const theme = useThemeData();

  return (
    <BoxContainer
      borderColor={
        theme ? theme?.palette?.neutral?.N40 : inube.palette.neutral.N40
      }
      borderRadius={tokens.spacing.s100}
      padding={smallScreen ? `${tokens.spacing.s150}` : `${tokens.spacing.s0}`}
      backgroundColor={
        theme ? theme?.palette?.neutral?.N0 : inube.palette.neutral.N0
      }
      boxSizing="initial"
      overflowY="auto"
    >
      <Stack
        width="-webkit-fill-available"
        direction="column"
        gap={tokens.spacing.s250}
        padding={
          smallScreen ? `${tokens.spacing.s150}` : `${tokens.spacing.s300}`
        }
        justifyContent={smallScreen ? "center" : "normal"}
      >
        <Stack
          gap={smallScreen ? tokens.spacing.s150 : tokens.spacing.s200}
          direction="column"
        >
          {smallScreen && (
            <Stack>
              <Text
                type="title"
                size="medium"
                appearance={ComponentAppearance.DARK}
                ellipsis
              >
                {payrollTabLabels.description}
              </Text>
            </Stack>
          )}
          <Stack
            justifyContent={smallScreen ? "center" : "space-between"}
            direction={smallScreen ? "column" : "row"}
            gap={
              smallScreen ? `${tokens.spacing.s150}` : `${tokens.spacing.s0}`
            }
            width="100%"
          >
            <Stack
              justifyContent="center"
              width={smallScreen ? "100%" : "auto"}
            >
              <Searchfield
                name="searchPayrollAgreement"
                label={smallScreen ? "" : tabLabels.search}
                id="searchPayrollAgreement"
                placeholder={tabLabels.placeholderSearch}
                size="compact"
                value={searchPayrollAgreement}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onSearchPayrollAgreement(e)
                }
                fullwidth={smallScreen}
              />
            </Stack>
            {!smallScreen && (
              <Button
                spacing="wide"
                appearance={ComponentAppearance.PRIMARY}
                variant="filled"
                iconBefore={<MdAdd />}
                type="link"
                path="/payroll-agreement/add-payroll-agreement"
                fullwidth={smallScreen}
              >
                {payrollTabLabels.buttonLabel}
              </Button>
            )}
          </Stack>

          {!smallScreen && (
            <Stack>
              <Text
                type="title"
                size={smallScreen ? "small" : "medium"}
                appearance={ComponentAppearance.DARK}
                ellipsis
              >
                {payrollTabLabels.description}
              </Text>
            </Stack>
          )}

          <Table
            id="portal"
            titles={titles}
            entries={entries}
            actions={actionsConfig(setEntryDeleted)}
            breakpoints={breakPoints}
            filter={searchPayrollAgreement}
            loading={loading}
            columnWidths={columnWidths}
            pageLength={pageLength}
            emptyDataMessage={emptyDataMessage}
          />
        </Stack>
      </Stack>
    </BoxContainer>
  );
};

export { PayrollAgreementTabUI };
