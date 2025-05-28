import { Stack } from "@inubekit/inubekit";

import { IOrdinaryPaymentCycles } from "@ptypes/payrollAgreement/IOrdinaryPaymentCycles";
import { PaymentCycleCardGroup } from "@pages/payrollAgreement/tabs/paymentCycleCardGroup";

const OrdinaryPaymentCycles = (props: IOrdinaryPaymentCycles) => {
  const { data, labelsPaymentCard } = props;

  return (
    <Stack height="310px" width="620px">
      <PaymentCycleCardGroup
        data={data}
        labelsPaymentCard={labelsPaymentCard}
      />
    </Stack>
  );
};

export { OrdinaryPaymentCycles };
