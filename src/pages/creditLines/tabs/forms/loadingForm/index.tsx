import { MdAdd } from "react-icons/md";
import {
  Button,
  Divider,
  Fieldset,
  SkeletonLine,
  Stack,
} from "@inubekit/inubekit";
import { tokens } from "@design/tokens";
import { configurationLabels } from "@config/creditLines/configurationLabels";
import { ILoadingForm } from "@ptypes/creditLines/ILoadingForm";
import { SkeletonField } from "./SkeletonField";
import { DecisionBox } from "./DecisionBox";

const LoadingForm = (props: ILoadingForm) => {
  const { withDecisions, withoutDecisions, addUseCase } = props;

  const fields = [
    { labelWidth: "180px", fieldHeight: "32px" },
    { labelWidth: "180px", fieldHeight: "32px" },
    { labelWidth: "180px", fieldHeight: "56px" },
  ];

  return (
    <Stack direction="column" gap={tokens.spacing.s250} width="100%">
      <Fieldset
        legend={configurationLabels.lineInformation}
        height="auto"
        spacing="compact"
      >
        <Stack direction="column" width="100%" gap={tokens.spacing.s150}>
          <Stack width="100%" justifyContent="space-between">
            <SkeletonLine animated width="500px" height="24px" />
            <SkeletonLine width="24px" height="24px" animated />
          </Stack>
          <Divider dashed />
          <Stack width="100%" gap={tokens.spacing.s100}>
            <SkeletonLine animated width="250px" height="24px" />
            <SkeletonLine width="24px" height="24px" animated />
          </Stack>
        </Stack>
      </Fieldset>

      {withoutDecisions && (
        <>
          {fields.map((field, index) => (
            <SkeletonField
              key={`field-${index}`}
              labelWidth={field.labelWidth}
              fieldHeight={field.fieldHeight}
            />
          ))}
        </>
      )}

      {withDecisions && (
        <>
          {addUseCase ? (
            <>
              <Fieldset
                legend={configurationLabels.conditions}
                height="auto"
                spacing="compact"
              >
                <SkeletonLine width="100%" height="40px" animated />
              </Fieldset>

              <Stack justifyContent="flex-end">
                <Button iconBefore={<MdAdd />} spacing="compact" disabled>
                  {configurationLabels.addButton}
                </Button>
              </Stack>

              <Fieldset
                legend={configurationLabels.decisions}
                height="auto"
                spacing="compact"
              >
                <Stack
                  direction="column"
                  width="100%"
                  gap={tokens.spacing.s200}
                >
                  {Array.from({ length: 4 }, (_, index) => (
                    <DecisionBox key={index} />
                  ))}
                </Stack>
              </Fieldset>
            </>
          ) : (
            <>
              <Fieldset
                legend={configurationLabels.decisions}
                height="auto"
                spacing="compact"
              >
                <Stack
                  direction="column"
                  width="100%"
                  gap={tokens.spacing.s200}
                >
                  {Array.from({ length: 4 }, (_, index) => (
                    <DecisionBox key={index} />
                  ))}
                </Stack>
              </Fieldset>
            </>
          )}
        </>
      )}
    </Stack>
  );
};

export { LoadingForm };
