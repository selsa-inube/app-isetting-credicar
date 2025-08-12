import { IVerificationBoxes } from "@ptypes/moneyDestination/tabs/IVerificationBoxes";
import { EStepsKeysMoneyDestination } from "@enum/stepsKeysMoneyDest";
import { RenderPersonalInfoVerification } from "../personalInfoVerification";
import { RenderCreditlineVerification } from "../creditlineVerification";

const VerificationBoxes = (props: IVerificationBoxes) => {
  const { updatedData, stepKey } = props;

  return (
    <>
      {stepKey === EStepsKeysMoneyDestination.GENERAL_DATA && (
        <RenderPersonalInfoVerification
          values={updatedData.personalInformation.values}
        />
      )}
      {stepKey === EStepsKeysMoneyDestination.LINE_CREDIT && (
        <RenderCreditlineVerification values={updatedData.creditline.values} />
      )}
    </>
  );
};

export { VerificationBoxes };
