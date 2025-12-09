import { MdAdd, MdOutlineInfo } from "react-icons/md";
import { Stack, Button, Text, Searchfield, Icon } from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { Table } from "@design/data/table";
import { DecisionModal } from "@design/modals/decisionModal";
import { EComponentAppearance } from "@enum/appearances";
import { portalId } from "@config/portalId";
import { tabLabels } from "@config/moneyDestination/moneyDestinationTab/tabLabels";
import {
  actionsConfig,
  breakPoints,
  titles,
} from "@config/moneyDestination/moneyDestinationTab/table";
import { IMoneyDestinationTabUI } from "@ptypes/moneyDestination/tabs/moneyDestinationTab/IMoneyDestinationTabUI";
import { StyledContainer } from "./styles";

const MoneyDestinationTabUI = (props: IMoneyDestinationTabUI) => {
  const {
    searchMoneyDestination,
    entries,
    loading,
    smallScreen,
    columnWidths,
    emptyDataMessage,
    showInfoModal,
    disabledButton,
    modalData,
    pageLength,
    onToggleInfoModal,
    onSearchMoneyDestination,
    setEntryDeleted,
  } = props;

  return (
    <StyledContainer $smallScreen={smallScreen}>
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
          gap={smallScreen ? tokens.spacing.s150 : tokens.spacing.s400}
          direction="column"
        >
          {smallScreen && (
            <Stack>
              <Text
                type="title"
                size="medium"
                appearance={EComponentAppearance.DARK}
                ellipsis
              >
                {tabLabels.description}
              </Text>
            </Stack>
          )}
          <Stack
            justifyContent={smallScreen ? "center" : "space-between"}
            direction={smallScreen ? "column-reverse" : "row"}
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
                name="searchMoneyDestination"
                id="searchMoneyDestination"
                placeholder={tabLabels.searchPlaceholder}
                label={smallScreen ? "" : tabLabels.searchLabel}
                size="compact"
                value={searchMoneyDestination}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onSearchMoneyDestination(e)
                }
                fullwidth={smallScreen}
              />
            </Stack>
            {!smallScreen && (
              <Stack gap={tokens.spacing.s025} alignItems="center">
                <Button
                  spacing="wide"
                  appearance={EComponentAppearance.PRIMARY}
                  variant="filled"
                  iconBefore={<MdAdd />}
                  type="link"
                  path="/money-destination/add-destination"
                  fullwidth={smallScreen}
                  disabled={disabledButton}
                >
                  {tabLabels.addButton}
                </Button>
                {disabledButton && (
                  <Icon
                    appearance={EComponentAppearance.PRIMARY}
                    icon={<MdOutlineInfo />}
                    onClick={onToggleInfoModal}
                    cursorHover
                    size="14px"
                  />
                )}
              </Stack>
            )}
          </Stack>

          {!smallScreen && (
            <Stack>
              <Text
                type="title"
                size="medium"
                appearance={EComponentAppearance.DARK}
              >
                {tabLabels.description}
              </Text>
            </Stack>
          )}

          <Table
            id={portalId}
            titles={titles}
            entries={entries}
            actions={actionsConfig(setEntryDeleted)}
            breakpoints={breakPoints}
            filter={searchMoneyDestination}
            loading={loading}
            columnWidths={columnWidths}
            pageLength={pageLength}
            emptyDataMessage={emptyDataMessage}
          />
        </Stack>
      </Stack>
      {showInfoModal && (
        <DecisionModal
          portalId={portalId}
          title={modalData.title}
          actionText={modalData.actionText}
          description={modalData.description}
          subtitle={modalData.subtitle}
          onCloseModal={modalData.onCloseModal}
          moreDetails={modalData.moreDetails}
          onClick={modalData.onClick}
          withCancelButton={modalData.withCancelButton}
          withIcon={modalData.withIcon}
          icon={modalData.icon}
          appearance={modalData.appearance}
          appearanceButton={modalData.appearanceButton}
        />
      )}
    </StyledContainer>
  );
};

export { MoneyDestinationTabUI };
