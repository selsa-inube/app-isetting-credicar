import { MdCurrencyExchange } from "react-icons/md";
import {
  Divider,
  Icon,
  inube,
  Stack,
  Text,
  useMediaQuery,
} from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { mediaQueryMobile } from "@config/environment";
import { EComponentAppearance } from "@enum/appearances";
import { IPaymentCycleCard } from "@ptypes/design/IPaymentCycleCard";
import { BoxContainer } from "@design/layout/boxContainer";
import { useThemeData } from "@utils/theme";

const PaymentCycleCard = (props: IPaymentCycleCard) => {
  const { data, numberCard, labels } = props;
  const isMobile = useMediaQuery(mediaQueryMobile);
  const theme = useThemeData();
  const isField = (field: { id: string }) => data[field.id];

  return (
    <BoxContainer
      direction="column"
      backgroundColor={EComponentAppearance.LIGHT}
      width="290px"
      height="282px"
      borderRadius={tokens.spacing.s100}
      padding={tokens.spacing.s200}
      gap={isMobile ? `${tokens.spacing.s050}` : `${tokens.spacing.s150}`}
      boxSizing="border-box"
      boxShadow={`1px 1px 4px 2px ${theme ? theme?.palette?.neutral?.N40 : inube.palette.neutral.N40}`}
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
          {`Ciclo de pago -${numberCard}`}
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
