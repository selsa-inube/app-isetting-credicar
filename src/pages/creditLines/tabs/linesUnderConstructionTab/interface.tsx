import { MdOutlineInfo } from "react-icons/md";
import { Stack, Searchfield, Text } from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { BoxContainer } from "@design/layout/boxContainer";
import { DecisionModal } from "@design/modals/decisionModal";
import { Table } from "@design/data/table";
import { EComponentAppearance } from "@enum/appearances";
import { portalId } from "@config/portalId";
import { titles } from "@config/creditLines/lineUnderConstructionTab/table/titles";
import { actionsConfig } from "@config/creditLines/lineUnderConstructionTab/table/actions";
import { tabLabels } from "@config/payrollAgreement/payrollAgreementTab/tabLabels";
import { breakPoints } from "@config/creditLines/lineUnderConstructionTab/table/breakPoints";
import { constructionLabels } from "@config/creditLines/lineUnderConstructionTab/generic/constructionLabels";
import { ILinesUnderConstructionTabUI } from "@ptypes/creditLines/ILinesUnderConstructionTabUI";
import { InformationBox } from "../creditLinesTab/InformationBox";

const LinesUnderConstructionTabUI = (props: ILinesUnderConstructionTabUI) => {
  const {
    loading,
    searchLineInConstruction,
    showModal,
    modalData,
    columnWidths,
    entries,
    emptyDataMessage,
    pageLength,
    onSearchLineInConstruction,
    setEntryDeleted,
  } = props;

  return (
    <>
      <BoxContainer
        borderColor={EComponentAppearance.DARK}
        borderRadius={tokens.spacing.s100}
        padding={tokens.spacing.s0}
        backgroundColor={EComponentAppearance.LIGHT}
        boxSizing="initial"
        overflowY="auto"
      >
        <Stack
          direction="column"
          width="-webkit-fill-available"
          padding={tokens.spacing.s300}
        >
          <Stack
            width="-webkit-fill-available"
            direction="column"
            gap={tokens.spacing.s200}
          >
            <Stack gap={tokens.spacing.s400} direction="column" width="100%">
              <Stack justifyContent="space-between" gap={tokens.spacing.s0}>
                <Stack justifyContent="center">
                  <Searchfield
                    name={tabLabels.search}
                    label={tabLabels.search}
                    id="searchLineInConstruction"
                    placeholder={tabLabels.placeholderSearch}
                    size="compact"
                    value={searchLineInConstruction}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      onSearchLineInConstruction(e)
                    }
                  />
                </Stack>
              </Stack>
              <Stack>
                <Text
                  type="title"
                  size="medium"
                  appearance={EComponentAppearance.DARK}
                  ellipsis
                >
                  {constructionLabels.description}
                </Text>
              </Stack>
              <Stack>
                {entries && entries.length > 0 ? (
                  <Table
                    id={portalId}
                    titles={titles}
                    entries={entries}
                    actions={actionsConfig(setEntryDeleted)}
                    breakpoints={breakPoints}
                    filter={searchLineInConstruction}
                    loading={loading}
                    columnWidths={columnWidths}
                    pageLength={pageLength}
                  />
                ) : (
                  <InformationBox
                    icon={<MdOutlineInfo />}
                    appearanceIcon={EComponentAppearance.PRIMARY}
                    description={emptyDataMessage}
                    boxPadding={tokens.spacing.s250}
                    boxColor={EComponentAppearance.HELP}
                    sizeIcon="20px"
                    sizeDescription="large"
                  />
                )}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        {showModal && (
          <DecisionModal
            portalId={portalId}
            title={modalData.title}
            actionText={modalData.actionText}
            description={modalData.description}
            subtitle={modalData.subtitle}
            onCloseModal={modalData.onCloseModal}
            onClick={modalData.onClick}
            moreDetails={modalData.moreDetails}
            withCancelButton={modalData.withCancelButton}
            withIcon={modalData.withIcon}
            icon={modalData.icon}
            appearance={modalData.appearance}
            appearanceButton={modalData.appearanceButton}
          />
        )}
      </BoxContainer>
    </>
  );
};

export { LinesUnderConstructionTabUI };
