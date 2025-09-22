import { Breadcrumbs, Spinner, Stack, Tabs, Text } from "@inubekit/inubekit";
import { Title } from "@design/data/title";
import { DecisionModal } from "@design/modals/decisionModal";
import { tokens } from "@design/tokens";
import { crumbsGeneralpolicies } from "@config/generalCreditPolicies/navigation";
import { loadingLabels } from "@config/loadingLabels";
import { descriptionTitle } from "@config/generalCreditPolicies/descriptionTitle";
import { goBackModal } from "@config/goBackModal";
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
    incomeData,
    scoreModelsData,
    methodsData,
    additionalDebtorsData,
    realGuaranteesData,
    loadingPolicies,
    showAddPolicies,
    loadingRequest,
    modalData,
    showGoBackModal,
    onCloseGoBackModal,
    onGoBack,
    handleOpenModal,
    onTabChange,
  } = props;

  return (
    <>
      {loadingPolicies || loadingRequest ? (
        <Stack
          alignItems="center"
          justifyContent="center"
          direction="column"
          width="100%"
          height="100%"
          gap={tokens.spacing.s200}
        >
          <Spinner size="large" />
          <Text type="title" size="medium" textAlign="center">
            {loadingLabels.loading}
          </Text>
        </Stack>
      ) : (
        <>
          {showAddPolicies ? (
            <>
              <AddGenCreditPolicies />
              <DecisionModal
                portalId={portalId}
                title={modalData.title}
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
                    />
                  )}
                  {showrequestTab && <RequestsInProgressTab />}
                </Stack>
              </Stack>
              {showGoBackModal && (
                <DecisionModal
                  portalId={portalId}
                  title={goBackModal.title}
                  description={goBackModal.description}
                  actionText={goBackModal.actionText}
                  onCloseModal={onCloseGoBackModal}
                  onClick={onGoBack}
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
