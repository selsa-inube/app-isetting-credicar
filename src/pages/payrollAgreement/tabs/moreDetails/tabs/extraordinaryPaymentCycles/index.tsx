import { Stack } from "@inubekit/inubekit";
import { PaymentCycleCardGroup } from "@pages/payrollAgreement/tabs/paymentCycleCardGroup";
import { IExtraordinaryPaymentCycles } from "@ptypes/payrollAgreement/payrollAgreementTab/IExtraordinaryPaymentCycles";
import { StyledContainer } from "../styles";

const ExtraordinaryPaymentCycles = (props: IExtraordinaryPaymentCycles) => {
  const { data, labelsPaymentCard } = props;

  return (
    <Stack height="310px" width="620px">
      <StyledContainer>
        <PaymentCycleCardGroup
          data={data}
          labelsPaymentCard={labelsPaymentCard}
        />
      </StyledContainer>
    </Stack>
  );
};

export { ExtraordinaryPaymentCycles };
