import { FormikValues } from "formik";

const getFieldState = (formik: FormikValues, fieldName: string) => {
  if (formik.touched[fieldName]) {
    return formik.errors[fieldName] ? "invalid" : undefined;
  }
  return formik.errors[fieldName] ? "pending" : undefined;
};
export { getFieldState };
