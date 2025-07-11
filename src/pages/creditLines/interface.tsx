import { MdAdd } from "react-icons/md";
import {
  Stack,
  useMediaQuery,
  Breadcrumbs,
  Button,
  Searchfield,
} from "@inubekit/inubekit";

import { Table } from "@design/data/table";
import { tokens } from "@design/tokens";
import { Title } from "@design/data/title";
import { EComponentAppearance } from "@enum/appearances";
import { dataCreditLines } from "@mocks/creditLines/creditLines.mock";
import { crumbsCreditLines } from "@config/creditLines/navigation";
import { actions, breakPoints, titles } from "@config/creditLines/table";
import { ICreditLinesUI } from "@ptypes/creditLines/ICreditLinesUI";
import { creditPageLabels } from "@config/creditLines/creditPageLabels";
import { tabLabels } from "@config/payrollAgreement/payrollAgreementTab/tabLabels";
import { portalId } from "@config/portalId";
import { StyledContent } from "./styles";
import { mediaQueryTablet } from "@config/environment";

const CreditLinesUI = (props: ICreditLinesUI) => {
  const {
    loading,
    searchCreditLines,
    descriptionOptions,
    onSearchCreditLines,
  } = props;

  const smallScreen = useMediaQuery(mediaQueryTablet);
  const widthFirstColumn = smallScreen ? 64 : 25;

  return (
    <Stack
      direction="column"
      width="-webkit-fill-available"
      padding={
        smallScreen
          ? `${tokens.spacing.s200}`
          : `${tokens.spacing.s400} ${tokens.spacing.s800}`
      }
    >
      <Stack gap={tokens.spacing.s600} direction="column">
        <Stack gap={tokens.spacing.s300} direction="column">
          <Breadcrumbs crumbs={crumbsCreditLines} />
          <Title
            title={descriptionOptions?.publicCode ?? ""}
            description={descriptionOptions?.description ?? ""}
            sizeTitle="large"
          />
        </Stack>

        <StyledContent $smallScreen={smallScreen}>
          <Stack
            width="-webkit-fill-available"
            direction="column"
            gap={tokens.spacing.s250}
            padding={
              smallScreen ? `${tokens.spacing.s150}` : `${tokens.spacing.s300}`
            }
            justifyContent={smallScreen ? "center" : "normal"}
          >
            <Stack gap={tokens.spacing.s400} direction="column">
              <Stack
                justifyContent={smallScreen ? "center" : "space-between"}
                direction={smallScreen ? "column" : "row"}
                gap={
                  smallScreen
                    ? `${tokens.spacing.s150}`
                    : `${tokens.spacing.s0}`
                }
              >
                <Stack justifyContent="center">
                  <Searchfield
                    name={tabLabels.search}
                    id="searchCreditLines"
                    placeholder={tabLabels.placeholderSearch}
                    size="compact"
                    value={searchCreditLines}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      onSearchCreditLines(e)
                    }
                  />
                </Stack>
                <Button
                  spacing="wide"
                  appearance={EComponentAppearance.PRIMARY}
                  variant="filled"
                  iconBefore={<MdAdd />}
                  type="link"
                  path="/credit-lines/add-credit-line"
                >
                  {creditPageLabels.description}
                </Button>
              </Stack>

              <Table
                id={portalId}
                titles={titles}
                entries={dataCreditLines}
                actions={actions}
                breakpoints={breakPoints}
                filter={searchCreditLines}
                loading={loading}
                columnWidths={[widthFirstColumn, 55]}
              />
            </Stack>
          </Stack>
        </StyledContent>
      </Stack>
    </Stack>
  );
};

export { CreditLinesUI };
