import { IVerificationBoxes } from "@ptypes/moneyDestination/tabs/IVerificationBoxes";
import { stepsKeysMoneyDest } from "@enum/stepsKeysMoneyDest";
import { RenderPersonalInfoVerification } from "../personalInfoVerification";
import { RenderCreditlineVerification } from "../creditlineVerification";

const VerificationBoxes = (props: IVerificationBoxes) => {
  const { updatedData, stepKey } = props;

  return (
    <>
      {stepKey === stepsKeysMoneyDest.GENERAL_DATA && (
        <RenderPersonalInfoVerification
          values={updatedData.personalInformation.values}
        />
      )}
      {stepKey === stepsKeysMoneyDest.LINE_CREDIT && (
        <RenderCreditlineVerification values={updatedData.creditline.values} />
      )}
    </>
  );
};

export { VerificationBoxes };
