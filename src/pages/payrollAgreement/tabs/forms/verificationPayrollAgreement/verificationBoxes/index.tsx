import { IVerificationBoxes } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IVerificationBoxes";
import { stepKeysPayroll } from "@enum/stepsKeysPayroll";
import { RenderCompanyVerification } from "../companyVerification";
import { RenderGeneralinfoVerification } from "../GeneralinfoVerification";
import { RenderRegularVerification } from "../RegularVerification";
import { RenderExtraordinaryVerification } from "../ExtraordinaryVerification";

const VerificationBoxes = (props: IVerificationBoxes) => {
  const { updatedData, stepKey, typeRegularPayroll, isMobile } = props;

  const showOrdinaryCycles =
    stepKey === stepKeysPayroll.REGULAR_CYCLES &&
    typeRegularPayroll &&
    updatedData.ordinaryCycles.values.length > 0;

  const showExtraordinaryCycles =
    stepKey === stepKeysPayroll.EXTRAORDINARY_CYCLES &&
    updatedData.extraordinaryCycles.values.length >= 1;

  return (
    <>
      {stepKey === stepKeysPayroll.COMPANY && (
        <RenderCompanyVerification
          values={updatedData.company.values}
          isMobile={isMobile}
        />
      )}
      {stepKey === stepKeysPayroll.GENERAL_INFO && (
        <RenderGeneralinfoVerification
          values={updatedData.generalInformation.values}
          isMobile={isMobile}
        />
      )}
      {showOrdinaryCycles && (
        <RenderRegularVerification
          values={updatedData.ordinaryCycles.values}
          isMobile={isMobile}
        />
      )}
      {showExtraordinaryCycles && (
        <RenderExtraordinaryVerification
          values={updatedData.extraordinaryCycles.values}
          isMobile={isMobile}
        />
      )}
    </>
  );
};

export { VerificationBoxes };
