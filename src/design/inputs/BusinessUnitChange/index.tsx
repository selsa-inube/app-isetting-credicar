import { MdCheck } from "react-icons/md";
import { Stack, Icon, Divider } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";
import { EComponentAppearance } from "@enum/appearances";
import {
  StyledContainer,
  StyledUl,
  StyledLi,
  StyledImg,
  StyledContainerOption,
} from "./styles";
import { IBusinessUnitChange } from "@ptypes/design/IBusinessUnitChange";

const BusinessUnitChange = (props: IBusinessUnitChange) => {
  const { businessUnits, selectedClient, onLogoClick } = props;

  return (
    <StyledContainer>
      <Stack width="200px">
        <StyledUl>
          {businessUnits.map((businessUnit, index) => (
            <StyledContainerOption
              key={businessUnit.publicCode}
              onClick={() => onLogoClick(businessUnit)}
            >
              <StyledLi>
                <StyledImg
                  src={businessUnit.urlLogo}
                  alt={businessUnit.abbreviatedName}
                />
                {selectedClient === businessUnit.abbreviatedName && (
                  <Stack
                    margin={`${tokens.spacing.s0} ${tokens.spacing.s150} ${tokens.spacing.s0}`}
                  >
                    <Icon
                      icon={<MdCheck />}
                      appearance={EComponentAppearance.PRIMARY}
                      size="24px"
                      cursorHover
                    />
                  </Stack>
                )}
              </StyledLi>
              {index !== businessUnits.length - 1 && <Divider />}
            </StyledContainerOption>
          ))}
        </StyledUl>
      </Stack>
    </StyledContainer>
  );
};

export { BusinessUnitChange };
