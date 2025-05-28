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
        <Stack gap={tokens.spacing.s200} direction="column" width="100%">
          <Stack
            justifyContent={smallScreen ? "center" : "space-between"}
            direction={smallScreen ? "column-reverse" : "row"}
            gap={
              smallScreen ? `${tokens.spacing.s150}` : `${tokens.spacing.s0}`
            }
          >
            <Stack justifyContent="center">
              <Searchfield
                name="searchPayrollAgreement"
                label={tabLabels.search}
                id="searchPayrollAgreement"
                placeholder={tabLabels.placeholderSearch}
                size="compact"
                value={searchPayrollAgreement}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onSearchPayrollAgreement(e)
                }
              />
            </Stack>
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
          </Stack>

          <Stack>
            <Text type="title" size="medium" appearance="dark">
              {payrollTabLabels.description}
            </Text>
          </Stack>

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
            emptyDataMessage={payrollTabLabels.emptyDataMessage}
          />
        </Stack>
      </Stack>
    </BoxContainer>
  );
};

export { PayrollAgreementTabUI };
