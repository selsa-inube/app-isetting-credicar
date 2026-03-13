import { useConfigurationConsultation } from "@hooks/creditLine/configurationLines/useConfigurationConsultation";
import { EditRecord } from "@design/feedback/editRecord";
import { IEditConstruction } from "@ptypes/creditLines/IEditConstruction";

const EditConstruction = (props: IEditConstruction) => {
  const { data, useCaseConfiguration } = props;
  const { handleConfiguration, showInfoModal, modalData } =
    useConfigurationConsultation({
      configurationData: data,
      useCaseConfiguration: useCaseConfiguration ?? "",
    });
  return (
    <>
      <EditRecord
        onEdit={handleConfiguration}
        showInfoModal={showInfoModal}
        modalData={modalData}
      />
    </>
  );
};

export { EditConstruction };
