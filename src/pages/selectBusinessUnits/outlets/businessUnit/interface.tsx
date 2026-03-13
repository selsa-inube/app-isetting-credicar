import { MdSearch } from "react-icons/md";
import { Button, Searchfield, Stack, Text } from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { RadioBusinessUnit } from "@design/feedback/radioBusinessUnit";
import { NoResultsMessage } from "@design/feedback/noResultsMessage";
import { businessUnitsLabel } from "@config/businessUnits/businessUnitsLabel";
import { IBusinessUnitsUI } from "@ptypes/IBusinessUnitsUI";
import {
  StyledBusinessUnits,
  StyledBusinessUnitsItem,
  StyledBusinessUnitsList,
} from "./styles";

function BusinessUnitsUI(props: IBusinessUnitsUI) {
  const {
    businessUnits,
    search,
    businessUnit,
    screenMobile,
    screenTablet,
    handleSearchChange,
    filterBusinessUnits,
    handleBussinessUnitChange,
    handleSubmit,
  } = props;

  const filteredBusinessUnits = filterBusinessUnits(businessUnits, search);

  return (
    <StyledBusinessUnits $isMobile={screenMobile}>
      <Stack direction="column" gap={tokens.spacing.s200}>
        <Text type="title" size="large" textAlign="center">
          {businessUnitsLabel.title}
        </Text>
        <Text size="medium" textAlign="center">
          {businessUnitsLabel.selectUnit}
        </Text>
      </Stack>

      <form>
        <Stack direction="column" alignItems="center" gap={tokens.spacing.s300}>
          {businessUnits.length > 5 && (
            <Searchfield
              placeholder={businessUnitsLabel.placeholderSearch}
              name="searchBusinessUnits"
              id="searchBusinessUnits"
              value={search}
              fullwidth
              onChange={handleSearchChange}
              iconBefore={<MdSearch size={22} />}
            />
          )}
          {filteredBusinessUnits.length === 0 && (
            <NoResultsMessage search={search} />
          )}
          <StyledBusinessUnitsList
            $scroll={businessUnits.length > 5}
            $isMobile={screenMobile}
            $isTablet={screenTablet}
          >
            <Stack
              direction="column"
              padding={`${tokens.spacing.s0} ${tokens.spacing.s100}`}
              alignItems="center"
              gap={tokens.spacing.s100}
            >
              {filteredBusinessUnits.map((businessUnit) => (
                <StyledBusinessUnitsItem key={businessUnit.publicCode}>
                  <RadioBusinessUnit
                    name="businessUnit"
                    label={businessUnit.abbreviatedName}
                    id={businessUnit.publicCode}
                    value={businessUnit.abbreviatedName}
                    logo={businessUnit.urlLogo}
                    handleChange={handleBussinessUnitChange}
                  />
                </StyledBusinessUnitsItem>
              ))}
            </Stack>
          </StyledBusinessUnitsList>
          <Button
            type="button"
            disabled={businessUnit.value}
            onClick={handleSubmit}
          >
            {businessUnitsLabel.labelButton}
          </Button>
        </Stack>
      </form>
    </StyledBusinessUnits>
  );
}

export { BusinessUnitsUI };
