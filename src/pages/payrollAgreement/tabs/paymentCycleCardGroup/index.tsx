import { useMediaQuery, Stack } from "@inubekit/inubekit";
import { IEntry } from "@ptypes/design/table/IEntry";
import { mediaQueryMobile } from "@config/environment";
import { IPaymentCycleCardGroup } from "@ptypes/design/IPaymentCycleCardGroup";
import { BoxContainer } from "@design/layout/boxContainer";
import { tokens } from "@design/tokens";
import { PaymentCycleCard } from "./paymentCycleCard";
import { EComponentAppearance } from "@enum/appearances";

const PaymentCycleCardGroup = (props: IPaymentCycleCardGroup) => {
  const { data, labelsPaymentCard } = props;
  const smallScreen = useMediaQuery(mediaQueryMobile);

  return (
    <BoxContainer
      width="100%"
      height="100%"
      direction={smallScreen ? "column" : "row"}
      wrap={smallScreen ? "nowrap" : "wrap"}
      gap={smallScreen ? `${tokens.spacing.s075}` : `${tokens.spacing.s150}`}
      padding={tokens.spacing.s075}
      boxSizing="border-box"
      overflowY="auto"
      backgroundColor={EComponentAppearance.LIGHT}
    >
      {data.map((entry: IEntry, index) => (
        <Stack key={index}>
          <PaymentCycleCard
            data={entry}
            numberCard={index + 1}
            labels={labelsPaymentCard}
          />
        </Stack>
      ))}
    </BoxContainer>
  );
};

export { PaymentCycleCardGroup };
