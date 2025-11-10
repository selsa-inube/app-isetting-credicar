import { MdCurrencyExchange } from "react-icons/md";
import { Divider, Icon, Stack, Text, useMediaQuery } from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { BoxContainer } from "@design/layout/boxContainer";
import { EComponentAppearance } from "@enum/appearances";
import { mediaQueryMobile } from "@config/environment";
import { addCycleLabels } from "@config/payrollAgreement/payrollAgreementTab/generic/addCycleLabels";
import { IPaymentCycleCard } from "@ptypes/design/IPaymentCycleCard";

const PaymentCycleCard = (props: IPaymentCycleCard) => {
  const { data, numberCard, labels } = props;
  const isMobile = useMediaQuery(mediaQueryMobile);

  const isField = (field: { id: string }) => data[field.id];

  return (
    <BoxContainer
      direction="column"
      backgroundColor={EComponentAppearance.LIGHT}
      width={isMobile ? "250px" : "290px"}
      height={isMobile ? "auto" : "284px"}
      borderRadius={tokens.spacing.s100}
      padding={tokens.spacing.s200}
      gap={isMobile ? `${tokens.spacing.s050}` : `${tokens.spacing.s150}`}
      boxSizing="border-box"
      boxShadow={EComponentAppearance.DARK}
      overflowY="auto"
    >
      <Stack gap={isMobile ? tokens.spacing.s050 : tokens.spacing.s150}>
        <Icon
          icon={<MdCurrencyExchange />}
          appearance={EComponentAppearance.GRAY}
          size="24px"
        />
        <Text
          type="title"
          size="medium"
          appearance={EComponentAppearance.GRAY}
          weight="bold"
        >
          {`${addCycleLabels.cycleDescription} -${numberCard}`}
        </Text>
      </Stack>
      <Divider dashed />

      <Stack
        gap={tokens.spacing.s100}
        direction="column"
        justifyContent="center"
      >
        {labels.map(
          (field, id) =>
            isField({ id: field.id }) && (
              <Stack key={id} direction="column" gap={tokens.spacing.s050}>
                <Text size="medium" type="label" weight="bold">
                  {field.titleName}
                </Text>
                <Text
                  size="large"
                  appearance={EComponentAppearance.GRAY}
                  ellipsis
                >
                  {data[field.id]}
                </Text>
              </Stack>
            ),
        )}
      </Stack>
    </BoxContainer>
  );
};

export { PaymentCycleCard };
