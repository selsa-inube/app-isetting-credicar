import { IDateVerification } from "../IDateVerification";
interface IDateVerificationForm {
  initialValues: IDateVerification;
  onCloseModal: () => void;
  onFinishForm: () => void;
  setDateVerification: React.Dispatch<
    React.SetStateAction<IDateVerification | undefined>
  >;
  loading?: boolean;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IDateVerification) => void;
}

export type { IDateVerificationForm };
