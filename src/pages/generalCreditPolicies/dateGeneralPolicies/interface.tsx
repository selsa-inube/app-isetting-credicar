import { finishModal } from "@config/generalCreditPolicies/assisted/finishModal";
import { DecisionModal } from "@design/modals/decisionModal";
import { IDateGeneralPolicies } from "@ptypes/generalCredPolicies/forms/IDateGeneralPolicies";
import { getFieldState } from "@utils/forms/getFieldState";

const DateGeneralPoliciesUI = (props: IDateGeneralPolicies) => {
  const { formik, loading, isDisabledButton, onCloseModal, onFinishForm } =
    props;

  return (
    <DecisionModal
      portalId="portal"
      title={finishModal.title}
      description={finishModal.description}
      actionText={finishModal.actionText}
      onCloseModal={onCloseModal}
      onClick={onFinishForm}
      loading={loading}
      withDate
      onDateChange={formik.handleChange}
      statusDate={getFieldState(formik, "date")}
      valueDate={formik.values.date}
      messageDate={formik.errors.date}
      onBlurDate={formik.handleBlur}
      isDisabledButton={isDisabledButton}
    />
  );
};

export { DateGeneralPoliciesUI };
