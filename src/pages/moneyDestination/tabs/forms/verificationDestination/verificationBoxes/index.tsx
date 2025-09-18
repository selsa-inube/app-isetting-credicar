import { IVerificationBoxes } from "@ptypes/moneyDestination/tabs/IVerificationBoxes";
import { EStepsKeysMoneyDestination } from "@enum/stepsKeysMoneyDest";
import { RenderPersonalInfoVerification } from "../personalInfoVerification";

const VerificationBoxes = (props: IVerificationBoxes) => {
  const { updatedData, stepKey } = props;

  return (
    <>
      {stepKey === EStepsKeysMoneyDestination.GENERAL_DATA && (
        <RenderPersonalInfoVerification
          values={updatedData.personalInformation.values}
        />
      )}
    </>
  );
};

export { VerificationBoxes };
