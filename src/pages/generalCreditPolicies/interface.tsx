import { Breadcrumbs, Stack, Tabs } from "@inubekit/inubekit";
import { Title } from "@design/data/title";
import { DecisionModal } from "@design/modals/decisionModal";
import { tokens } from "@design/tokens";
import { LoadingPage } from "@design/feedback/loadingPage";
import { crumbsGeneralpolicies } from "@config/generalCreditPolicies/navigation";
import { descriptionTitle } from "@config/generalCreditPolicies/descriptionTitle";
import { portalId } from "@config/portalId";
import { IGeneralCreditPoliciesUI } from "@ptypes/generalCredPolicies/IGeneralCreditPoliciesUI";
import { AddGenCreditPolicies } from "./addGeneralCreditPolicies";
import { EditGeneralPolicies } from "./tabs/editGeneralPolicies";
import { RequestsInProgressTab } from "./tabs/requestsInProgressTab";

const GeneralCreditPoliciesUI = (props: IGeneralCreditPoliciesUI) => {
  const {
    policiesTabs,
    descriptionOptions,
    isSelected,
    showPoliciesTab,
    showrequestTab,
    smallScreen,
    contributionsData,
    minimumIncomeData,
    incomeData,
    scoreModelsData,
    methodsData,
    additionalDebtorsData,
    realGuaranteesData,
    loadingPolicies,
    showAddPolicies,
    loadingRequest,
    modalData,
    showDecision,
    handleOpenModal,
    onTabChange,
  } = props;

  return (
    <>
      {loadingPolicies || loadingRequest ? (
        <LoadingPage />
      ) : (
        <>
          {showAddPolicies ? (
            <>
              <AddGenCreditPolicies />
              <DecisionModal
                portalId={portalId}
                title={modalData.title}
                moreDetails={modalData.moreDetails}
                actionText={modalData.actionText}
                description={modalData.description}
                subtitle={modalData?.subtitle ? modalData.subtitle : ""}
                onCloseModal={modalData.onCloseModal}
                onClick={modalData.onClick}
                withCancelButton={modalData.withCancelButton}
              />
            </>
          ) : (
            <Stack
              direction="column"
              width="-webkit-fill-available"
              padding={
                smallScreen
                  ? `${tokens.spacing.s200}`
                  : `${tokens.spacing.s400} ${tokens.spacing.s800}`
              }
            >
              <Stack
                gap={smallScreen ? tokens.spacing.s200 : tokens.spacing.s300}
                direction="column"
              >
                <Stack gap={tokens.spacing.s300} direction="column">
                  <Breadcrumbs crumbs={crumbsGeneralpolicies} />
                  <Title
                    title={descriptionOptions?.publicCode ?? ""}
                    description={descriptionTitle}
                    sizeTitle="large"
                    navigatePage="/"
                    onClick={handleOpenModal}
                  />
                </Stack>
                <Stack
                  gap={tokens.spacing.s300}
                  direction="column"
                  width="100%"
                >
                  <Tabs
                    tabs={policiesTabs}
                    selectedTab={isSelected}
                    onChange={onTabChange}
                  />

                  {showPoliciesTab && (
                    <EditGeneralPolicies
                      contributionsData={contributionsData}
                      incomeData={incomeData}
                      scoreModelsData={scoreModelsData}
                      methodsData={methodsData}
                      additionalDebtorsData={additionalDebtorsData}
                      realGuaranteesData={realGuaranteesData}
                      minimumIncomeData={minimumIncomeData}
                    />
                  )}
                  {showrequestTab && <RequestsInProgressTab />}
                </Stack>
              </Stack>

              {showDecision && (
                <DecisionModal
                  portalId={portalId}
                  title={modalData.title}
                  actionText={modalData.actionText}
                  description={modalData.description}
                  subtitle={modalData?.subtitle ? modalData.subtitle : ""}
                  onCloseModal={modalData.onCloseModal}
                  moreDetails={modalData.moreDetails}
                  onClick={modalData.onClick}
                  icon={modalData.icon}
                  withIcon={modalData.withIcon}
                  withCancelButton={modalData.withCancelButton}
                  appearance={modalData.appearance}
                  appearanceButton={modalData.appearanceButton}
                />
              )}
            </Stack>
          )}
        </>
      )}
    </>
  );
};

export { GeneralCreditPoliciesUI };
