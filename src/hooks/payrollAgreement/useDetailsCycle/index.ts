import { useContext, useState } from "react";
import { AuthAndPortalData } from "@context/authAndPortalDataProvider";
import { useEnumeratorsICardes } from "@hooks/useEnumeratorsIcardes";
import { ECyclesPayroll } from "@enum/cyclesPayroll";
import { optionsEnumCodeI18n } from "@utils/optionsEnumCodeI18n";
import { normalizeLaborRegulatorFramework } from "@utils/normalizeLaborRegulatorFramework";
import { IUseDetailsCycle } from "@ptypes/hooks/payrollAgreement/IUseDetailsCycle";
import { ILanguage } from "@ptypes/i18n";
import { IServerDomain } from "@ptypes/IServerDomain";

const useDetailsCycle = (props: IUseDetailsCycle) => {
  const { data } = props;
  const [showModal, setShowModal] = useState(false);
  const { appData } = useContext(AuthAndPortalData);

  const { enumData: laborRegulator } = useEnumeratorsICardes({
    enumCredicar: ECyclesPayroll.COLOMBIAN_LABOR_LEGAL,
    businessUnits: appData.businessUnit.publicCode,
    token: appData.token,
  });

  const laborRegulatorOptions = optionsEnumCodeI18n(
    appData.language as ILanguage,
    laborRegulator,
    true,
  );

  const normalizeData = {
    ...data,
    laborRegulatorFramework: normalizeLaborRegulatorFramework(
      laborRegulatorOptions as IServerDomain[],
      data.laborRegulatorFramework,
    ),
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleCloseModal = () => setShowModal(!showModal);

  return { showModal, normalizeData, handleToggleModal, handleCloseModal };
};

export { useDetailsCycle };
