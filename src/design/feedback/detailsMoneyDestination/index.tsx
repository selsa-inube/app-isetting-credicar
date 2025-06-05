import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IRuleDecision } from "@isettingkit/input";
import { Icon, Text, useMediaQuery } from "@inubekit/inubekit";

import { ComponentAppearance } from "@enum/appearances";
import {
  decisionTemplate,
  textValuesBusinessRules,
} from "@config/moneyDestination/moneyDestinationTab/businessRules";
import { DetailsDestinationModal } from "@design/modals/detailsDestinationModal";
import { IEntry } from "@ptypes/design/table/IEntry";
import { IDetailsTabsConfig } from "@ptypes/moneyDestination/tabs/IDetailsTabsConfig";
import { StyledContainerIcon } from "./styles";

interface IDetailsMoneyDestination {
  data: IEntry;
  showModal: boolean;
  evaluateRuleData: IRuleDecision[] | undefined;
  handleToggleModal: () => void;
  detailsTabsConfig: IDetailsTabsConfig;
  defaultSelectedTab: string;
  filteredTabsConfig: IDetailsTabsConfig;
  isMobile: boolean;
  isSelected: string;
  onTabChange: (id: string) => void;
}

const DetailsMoneyDestination = (props: IDetailsMoneyDestination) => {
  const {
    data,
    showModal,
    evaluateRuleData,
    defaultSelectedTab,
    filteredTabsConfig,
    isMobile,
    isSelected,
    detailsTabsConfig,
    handleToggleModal,
    onTabChange,
  } = props;

  const screenTablet = useMediaQuery("(max-width: 1200px)");

  return (
    <>
      <StyledContainerIcon onClick={handleToggleModal} $isTablet={screenTablet}>
        <Icon
          appearance={ComponentAppearance.DARK}
          icon={<MdOutlineRemoveRedEye />}
          size={screenTablet ? "20px" : "16px"}
          cursorHover
          spacing="narrow"
        />
        {screenTablet && (
          <Text type="body" size="medium">
            Detalles
          </Text>
        )}
      </StyledContainerIcon>

      {showModal && (
        <DetailsDestinationModal
          data={data}
          detailsTabsConfig={detailsTabsConfig}
          portalId="portal"
          onCloseModal={handleToggleModal}
          textValues={textValuesBusinessRules}
          decisionTemplate={decisionTemplate}
          decisions={evaluateRuleData ?? []}
          isMoreDetails={false}
          defaultSelectedTab={defaultSelectedTab}
          filteredTabsConfig={filteredTabsConfig}
          isMobile={isMobile}
          isSelected={isSelected}
          onTabChange={onTabChange}
        />
      )}
    </>
  );
};

export { DetailsMoneyDestination };
