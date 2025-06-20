import { Stack, Text, inube } from "@inubekit/inubekit";

import { detailsCyclesLabels } from "@config/payrollAgreement/payrollAgreementTab/generic/detailsCyclesLabels";
import { ComponentAppearance } from "@enum/appearances";
import { ModalWrapper } from "@design/modals/modalWrapper";
import { IDetailsCyclesModal } from "@ptypes/design/IDetailsCyclesModal";
import { BoxContainer } from "@design/layout/boxContainer";
import { useThemeData } from "@utils/theme";
import { tokens } from "@design/tokens";
import { ILabel } from "@ptypes/ILabel";

const DetailsCyclesModal = (props: IDetailsCyclesModal) => {
  const {
    data,
    labelsDetails,
    actionText,
    portalId,
    title,
    onCloseModal,
    onClick,
  } = props;

  const theme = useThemeData();

  const isField = (field: { id: string }) => data[field.id as keyof ILabel];

  const filteredFieldData = labelsDetails.filter((field) =>
    isField({ id: field.id }),
  );

  return (
    <ModalWrapper
      width="335px"
      minHeight="auto"
      labelActionButton={actionText}
      labelCloseModal={detailsCyclesLabels.close}
      portalId={portalId}
      title={title}
      withCancelButton={false}
      onClick={onClick}
      onCloseModal={onCloseModal}
    >
      <Stack gap={tokens.spacing.s200} direction="column" width="100%">
        {filteredFieldData.map((field, id) => (
          <BoxContainer
            key={id}
            direction="column"
            width="100%"
            minHeight="52px"
            borderRadius={tokens.spacing.s100}
            padding={`${tokens.spacing.s075} ${tokens.spacing.s200}`}
            boxSizing="border-box"
            backgroundColor={
              theme ? theme?.palette?.neutral?.N10 : inube.palette.neutral.N10
            }
          >
            <Text size="medium" type="label" weight="bold">
              {field.titleName}
            </Text>
            <Text size="medium" appearance={ComponentAppearance.GRAY} ellipsis>
              {data[field.id]}
            </Text>
          </BoxContainer>
        ))}
      </Stack>
    </ModalWrapper>
  );
};

export { DetailsCyclesModal };
