import { MdAdd, MdOutlineInfo } from "react-icons/md";
import { Stack, Button, Searchfield, Icon } from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { BoxContainer } from "@design/layout/boxContainer";
import { DecisionModal } from "@design/modals/decisionModal";
import { Table } from "@design/data/table";
import { EComponentAppearance } from "@enum/appearances";
import { tabLabels } from "@config/payrollAgreement/payrollAgreementTab/tabLabels";
import { portalId } from "@config/portalId";
import { titles } from "@config/creditLines/creditLinesTab/table/titles";
import { breakPoints } from "@config/creditLines/creditLinesTab/table/breakPoints";
import { actions } from "@config/creditLines/creditLinesTab/table/actions";
import { creditTabLabels } from "@config/creditLines/creditLinesTab/generic/creditTabLabels";
import { ICreditLinesTabUI } from "@ptypes/creditLines/CreditLinesTabUI";
import { EvaluateRules } from "./evaluateRules";
import { DataTable } from "./dataTable";
import { AddCreditLine } from "./addCreditLine";

const CreditLinesTabUI = (props: ICreditLinesTabUI) => {
  const {
    loadingCreditLines,
    searchCreditLines,
    showModal,
    modalData,
    disabledButton,
    smallScreen,
    columnWidths,
    entries,
    emptyDataMessage,
    businessRules,
    errorRules,
    loadingRules,
    showIcon,
    validateMissingRules,
    hasBusinessRules,
    pageLength,
    showAddModal,
    setEntryDeleted,
    setShowUnderConstruction,
    setShowAddModal,
    onToggleAddModal,
    onToggleInfoModal,
    onSearchCreditLines,
  } = props;

  return (
    <>
      <BoxContainer
        borderColor={EComponentAppearance.DARK}
        borderRadius={tokens.spacing.s100}
        padding={
          smallScreen ? `${tokens.spacing.s150}` : `${tokens.spacing.s0}`
        }
        backgroundColor={EComponentAppearance.LIGHT}
        boxSizing="initial"
        overflowY="auto"
      >
        <Stack
          direction="column"
          width="-webkit-fill-available"
          padding={
            smallScreen ? `${tokens.spacing.s150}` : `${tokens.spacing.s300}`
          }
        >
          <Stack
            width="-webkit-fill-available"
            direction="column"
            gap={tokens.spacing.s200}
          >
            <Stack gap={tokens.spacing.s400} direction="column">
              <Stack
                justifyContent={
                  validateMissingRules ? "space-between" : "flex-end"
                }
                direction={smallScreen ? "column" : "row"}
                gap={
                  smallScreen
                    ? `${tokens.spacing.s150}`
                    : `${tokens.spacing.s0}`
                }
              >
                {validateMissingRules && (
                  <Stack justifyContent="center">
                    <Searchfield
                      name={tabLabels.search}
                      label={tabLabels.search}
                      id="searchCreditLines"
                      placeholder={tabLabels.placeholderSearch}
                      size="compact"
                      value={searchCreditLines}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        onSearchCreditLines(event)
                      }
                    />
                  </Stack>
                )}

                <Stack gap={tokens.spacing.s025} alignItems="center">
                  <Button
                    spacing="wide"
                    appearance={EComponentAppearance.PRIMARY}
                    variant="filled"
                    iconBefore={<MdAdd />}
                    type="link"
                    onClick={onToggleAddModal}
                    fullwidth={smallScreen}
                    disabled={disabledButton}
                  >
                    {creditTabLabels.buttonLabel}
                  </Button>

                  {showIcon && (
                    <Icon
                      appearance={EComponentAppearance.PRIMARY}
                      icon={<MdOutlineInfo />}
                      onClick={onToggleInfoModal}
                      cursorHover
                      size="14px"
                    />
                  )}
                </Stack>
              </Stack>

              {loadingRules ? (
                <>
                  <Table
                    id={portalId}
                    titles={titles}
                    entries={[]}
                    actions={actions(setEntryDeleted)}
                    breakpoints={breakPoints}
                    filter={searchCreditLines}
                    loading={loadingRules}
                    columnWidths={columnWidths}
                  />
                </>
              ) : (
                <>
                  {hasBusinessRules && !errorRules ? (
                    <EvaluateRules
                      title={creditTabLabels.titleEvaluateRules}
                      subtitle={creditTabLabels.subtitleEvaluateRules}
                      missingRules={businessRules}
                    />
                  ) : (
                    <DataTable
                      columnWidths={columnWidths}
                      emptyDataMessage={emptyDataMessage}
                      entries={entries}
                      loadingCreditLines={loadingCreditLines}
                      searchCreditLines={searchCreditLines}
                      pageLength={pageLength}
                      setEntryDeleted={setEntryDeleted}
                    />
                  )}
                </>
              )}
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
            moreDetails={modalData.moreDetails}
            onClick={modalData.onClick}
            withCancelButton={modalData.withCancelButton}
            withIcon={modalData.withIcon}
            icon={modalData.icon}
            appearance={modalData.appearance}
            appearanceButton={modalData.appearanceButton}
          />
        )}
        {showAddModal && (
          <AddCreditLine
            setShowAddModal={setShowAddModal}
            setShowUnderConstruction={setShowUnderConstruction}
          />
        )}
      </BoxContainer>
    </>
  );
};

export { CreditLinesTabUI };
