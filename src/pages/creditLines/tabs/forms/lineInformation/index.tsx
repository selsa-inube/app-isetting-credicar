import { useNavigate } from "react-router-dom";
import { Breadcrumbs, Stack } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";
import { TitleOfDecisions } from "@design/data/titleOfDecisions";
import { crumbsConfiguration } from "@config/creditLines/configuration/navigation";
import { ILineInformation } from "@ptypes/creditLines/ILineInformation";
import { LoadingForm } from "../loadingForm";

const LineInformation = (props: ILineInformation) => {
  const {
    lineName,
    lineType,
    loading,
    withDecisions,
    withoutDecisions,
    title,
    description,
    optionCrumb,
    addUseCase,
    onToggleInfoModal,
    onOpenModal,
    withBackModal,
  } = props;

  const navigate = useNavigate();

  const handleClick = withBackModal
    ? onOpenModal
    : () => navigate("/credit-lines");

  return (
    <>
      <Stack gap={tokens.spacing.s300} direction="column">
        <Breadcrumbs crumbs={crumbsConfiguration(optionCrumb)} />
        <TitleOfDecisions
          title={title}
          description={description}
          lineName={lineName}
          lineType={lineType}
          sizeTitle="large"
          onClick={handleClick}
          onToggleInfoModal={onToggleInfoModal}
          loading={loading}
        />
      </Stack>

      {loading && (
        <Stack gap={tokens.spacing.s300} direction="column" width="100%">
          <LoadingForm
            withDecisions={withDecisions}
            withoutDecisions={withoutDecisions}
            addUseCase={addUseCase}
          />
        </Stack>
      )}
    </>
  );
};

export { LineInformation };
