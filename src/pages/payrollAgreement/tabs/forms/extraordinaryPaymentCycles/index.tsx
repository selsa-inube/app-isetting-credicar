import { forwardRef } from "react";
import { FormikProps } from "formik";

import { IExtraordinaryCyclesEntry } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IExtraordinaryCyclesEntry";
import { useExtraordinaryCyclesForm } from "@hooks/payrollAgreement/useExtraordinaryCyclesForm";
import { IExtraordinaryPaymentCyclesForm } from "@ptypes/payrollAgreement/payrollAgreementTab/forms/IExtraordinaryPaymentCyclesForm";
import { IServerDomain } from "@ptypes/IServerDomain";
import { ExtraordinaryPaymentCyclesFormUI } from "./interface";

const ExtraordinaryPaymentCyclesForm = forwardRef<
  FormikProps<IExtraordinaryCyclesEntry>,
  IExtraordinaryPaymentCyclesForm
>(
  (
    {
      extraordinaryPayment,
      typeRegularPayroll,
      regularPaymentCycles,
      setExtraordinaryPayment,
      onFormValid,
      onSubmit,
      onButtonClick,
      onPreviousStep,
      loading = false,
      editDataOption = false,
      initialData,
    },
    ref,
  ) => {
    const {
      formik,
      isDisabledButton,
      valuesEqual,
      entries,
      showModal,
      isMobile,
      typePaymentOptions,
      numberDaysUntilCutOptions,
      monthOptions,
      dayOptions,
      labelButtonPrevious,
      labelButtonNext,
      columnWidths,
      handleToggleModal,
      handleChange,
      handleAddCycle,
      setEntryDeleted,
    } = useExtraordinaryCyclesForm({
      ref,
      editDataOption,
      typeRegularPayroll,
      loading,
      onSubmit,
      onFormValid,
      extraordinaryPayment,
      setExtraordinaryPayment,
      regularPaymentCycles,
      initialData,
    });

    return (
      <ExtraordinaryPaymentCyclesFormUI
        loading={loading}
        formik={formik}
        onButtonClick={onButtonClick}
        onChange={handleChange}
        editDataOption={editDataOption}
        isDisabledButton={isDisabledButton}
        valuesEqual={valuesEqual}
        showModal={showModal}
        onToggleModal={handleToggleModal}
        entries={entries}
        onAddCycle={handleAddCycle}
        onPreviousStep={onPreviousStep}
        isMobile={isMobile}
        typePaymentOptions={typePaymentOptions}
        numberDaysUntilCutOptions={
          numberDaysUntilCutOptions as unknown as IServerDomain[]
        }
        monthOptions={monthOptions}
        dayOptions={dayOptions ?? []}
        setEntryDeleted={setEntryDeleted}
        labelButtonPrevious={labelButtonPrevious}
        labelButtonNext={labelButtonNext}
        columnWidths={columnWidths}
      />
    );
  },
);

ExtraordinaryPaymentCyclesForm.displayName = "ExtraordinaryPaymentCyclesForm";

export { ExtraordinaryPaymentCyclesForm };
