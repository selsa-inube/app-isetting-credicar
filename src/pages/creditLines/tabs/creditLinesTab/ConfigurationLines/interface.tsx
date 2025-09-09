import { IDropdownMenuGroup } from "@isettingkit/business-rules";
import { Grid, Stack } from "@inubekit/inubekit";
import { InfoConfigurationModal } from "@pages/creditLines/tabs/creditLinesTab/infoConfigurationModal";
import { tokens } from "@design/tokens";
import { DecisionModal } from "@design/modals/decisionModal";
import { BoxContainer } from "@design/layout/boxContainer";
import { EComponentAppearance } from "@enum/appearances";
import { portalId } from "@config/portalId";
import { groups } from "@config/creditLines/configuration/mainOptions";
import { IConfigurationLinesUI } from "@ptypes/creditLines/IConfigurationLinesUI";
import { LineInformation } from "./lineInformation";
import { DropdownMenuContainer } from "@src/usePathname";

const ConfigurationLinesUI = (props: IConfigurationLinesUI) => {
  const {
    loading,
    data,
    updateData,
    withDecisions,
    withoutDecisions,
    showModal,
    modalData,
    showInfoModal,
    getActiveId,
    onToggleInfoModal,
    onOpenModal,
  } = props;
  console.log(getActiveId(groups[0].links), location.pathname);
  console.log({ groups });

  return (
    <Stack
      direction="column"
      width="-webkit-fill-available"
      padding={`${tokens.spacing.s400} ${tokens.spacing.s800}`}
    >
      <Grid templateColumns={"auto 1fr"} alignContent="unset" height={"95vh"}>
        <BoxContainer
          direction="column"
          width="334px"
          backgroundColor={EComponentAppearance.DARK}
          borderColor={EComponentAppearance.GRAY}
          boxSizing="border-box"
          padding={`${tokens.spacing.s100} ${tokens.spacing.s200}`}
        >
          <Stack direction="column" gap={tokens.spacing.s100}>
            <DropdownMenuContainer
              groups={groups as unknown as IDropdownMenuGroup[]}
              defaultOpenId={null}
            />
            {/* {groups.map((group) => (
              <DropdownMenu
                key={group.id}
                activeId={getActiveId(group.links)}
                isOpen={openId === group.id}
                links={group.links}
                onClick={() =>
                  setOpenId((prev) => (prev === group.id ? null : group.id))
                }
                title={group.title}
              />
            ))} */}
          </Stack>
        </BoxContainer>
        <Stack gap={tokens.spacing.s600} direction="column">
          <LineInformation
            lineName={data.lineName}
            lineType={data.LineType}
            updateData={updateData}
            loading={loading}
            withDecisions={withDecisions}
            withoutDecisions={withoutDecisions}
            onToggleInfoModal={onToggleInfoModal}
            onOpenModal={onOpenModal}
          />
        </Stack>
      </Grid>

      {showModal && (
        <DecisionModal
          portalId={portalId}
          title={modalData.title}
          actionText={modalData.actionText}
          description={modalData.description}
          subtitle={modalData.subtitle}
          onCloseModal={modalData.onCloseModal}
          onClick={modalData.onClick}
          withCancelButton={modalData.withCancelButton}
          withIcon={modalData.withIcon}
          icon={modalData.icon}
          appearance={modalData.appearance}
          appearanceButton={modalData.appearanceButton}
        />
      )}
      {showInfoModal && (
        <InfoConfigurationModal
          title={data.LineType}
          description={data.descriptionInfo}
          onClick={onToggleInfoModal}
          onCloseModal={onToggleInfoModal}
        />
      )}
    </Stack>
  );
};

export { ConfigurationLinesUI };
