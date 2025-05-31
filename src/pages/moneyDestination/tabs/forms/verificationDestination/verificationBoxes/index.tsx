import { RenderPersonalInfoVerification } from "../personalInfoVerification";
import { RenderCreditlineVerification } from "../creditlineVerification";
import { IVerificationBoxes } from "@ptypes/moneyDestination/tabs/IVerificationBoxes";

const VerificationBoxes = (props: IVerificationBoxes) => {
  const { updatedData, stepKey } = props;

  return (
    <>
      {stepKey === 1 && (
        <RenderPersonalInfoVerification
          values={updatedData.personalInformation.values}
        />
      )}
      {stepKey === 2 && (
        <RenderCreditlineVerification values={updatedData.creditline.values} />
      )}
    </>
  );
};

export { VerificationBoxes };
