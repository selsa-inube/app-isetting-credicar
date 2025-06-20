import { FormikValues } from "formik";

const isInvalid = (formik: FormikValues, fieldName: string): boolean => {
  return formik.errors[fieldName] && formik.touched[fieldName];
};

export { isInvalid };
