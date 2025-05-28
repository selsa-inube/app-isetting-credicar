import { stepKeyByName } from "@utils/stepKeyByName";

const stepKeysPayroll = {
  COMPANY: stepKeyByName["Seleccionar empresa con convenio"],
  GENERAL_INFO: stepKeyByName["Informacion general"],
  REGULAR_CYCLES: stepKeyByName["Ciclos de pago ordinario"],
  EXTRAORDINARY_CYCLES: stepKeyByName["Ciclos de pago extraordinario"],
  VERIFICATION: stepKeyByName["Verificación"],
};

export { stepKeysPayroll };
