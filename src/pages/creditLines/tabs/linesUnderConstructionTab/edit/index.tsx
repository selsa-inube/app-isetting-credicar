import { useConfigurationConsultation } from "@hooks/creditLine/configurationLines/useConfigurationConsultation";
import { EditRecord } from "@design/feedback/editRecord";
import { IEditConstruction } from "@ptypes/creditLines/IEditConstruction";

const EditConstruction = (props: IEditConstruction) => {
  const { data, useCaseConfiguration } = props;
  const { handleConfiguration, showInfoModal, handleToggleInfoModal } =
    useConfigurationConsultation({
      configurationData: data,
      useCaseConfiguration,
    });
  return (
    <>
      <EditRecord
        onEdit={handleConfiguration}
        showInfoModal={showInfoModal}
        onToggleInfoModal={handleToggleInfoModal}
      />
    </>
  );
};

export { EditConstruction };
