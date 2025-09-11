import { MdCloudUpload, MdInfo } from "react-icons/md";
import {
  Breadcrumbs,
  Divider,
  Fieldset,
  Icon,
  Spinner,
  Stack,
  Text,
} from "@inubekit/inubekit";
import { LoadingForm } from "@pages/creditLines/tabs/forms/loadingForm";
import { tokens } from "@design/tokens";
import { Title } from "@design/data/title";
import { EComponentAppearance } from "@enum/appearances";
import { configurationLabels } from "@config/creditLines/configurationLabels";
import { crumbsConfiguration } from "@config/creditLines/configuration/navigation";
import { ILineInformation } from "@ptypes/creditLines/ILineInformation";

const LineInformation = (props: ILineInformation) => {
  const {
    lineName,
    lineType,
    updateData,
    loading,
    withDecisions,
    withoutDecisions,
    onToggleInfoModal,
    onOpenModal,
  } = props;

  return (
    <>
      <Stack gap={tokens.spacing.s300} direction="column">
        <Breadcrumbs crumbs={crumbsConfiguration} />
        <Title
          title={configurationLabels.title}
          description={configurationLabels.description}
          sizeTitle="large"
          onClick={onOpenModal}
        />
      </Stack>

      <Stack gap={tokens.spacing.s300} direction="column" width="100%">
        {loading ? (
          <LoadingForm
            withDecisions={withDecisions}
            withoutDecisions={withoutDecisions}
          />
        ) : (
          <>
            <Fieldset
              legend={configurationLabels.lineInformation}
              height="auto"
              spacing="compact"
            >
              <Stack direction="column" width="100%" gap={tokens.spacing.s150}>
                <Stack width="100%" justifyContent="space-between">
                  <Text
                    type="title"
                    size="medium"
                    appearance={EComponentAppearance.GRAY}
                    weight="bold"
                  >
                    {lineName}
                  </Text>
                  {updateData ? (
                    <Spinner size="small" />
                  ) : (
                    <Icon
                      icon={<MdCloudUpload />}
                      appearance={EComponentAppearance.SUCCESS}
                      size="24px"
                    />
                  )}
                </Stack>

                <Divider dashed />
                <Stack
                  width="100%"
                  gap={tokens.spacing.s100}
                  alignItems="center"
                >
                  <Text type="title" size="small" weight="bold">
                    {lineType}
                  </Text>
                  <Icon
                    icon={<MdInfo />}
                    appearance={EComponentAppearance.HELP}
                    onClick={onToggleInfoModal}
                    size="24px"
                    cursorHover
                  />
                </Stack>
              </Stack>
            </Fieldset>
          </>
        )}
      </Stack>
    </>
  );
};

export { LineInformation };
