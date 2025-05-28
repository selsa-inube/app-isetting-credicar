import { inube, Stack } from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { BoxContainer } from "@design/layout/boxContainer";
import { ILabel } from "@ptypes/ILabel";
import { IEntry } from "@ptypes/design/table/IEntry";
import { RenderDetailBox } from "./renderDetailBox";

interface ITraceabilityCard {
  data: IEntry;
  labels: ILabel[];
  isMobile: boolean;
}

const TraceabilityCard = (props: ITraceabilityCard) => {
  const { data, labels, isMobile } = props;

  const partLabels = labels.length;

  const firstDetail = labels.slice(0, 1).filter((field) => data[field.id]);
  const secondDetail = labels.slice(1, 2).filter((field) => data[field.id]);
  const remainingDetails = labels
    .slice(2, partLabels)
    .filter((field) => data[field.id]);

  return (
    <BoxContainer
      direction="column"
      backgroundColor={inube.palette.neutral.N0}
      width={isMobile ? "244px" : "400px"}
      height="auto"
      borderRadius={tokens.spacing.s100}
      padding={isMobile ? tokens.spacing.s150 : tokens.spacing.s200}
      gap={isMobile ? tokens.spacing.s050 : tokens.spacing.s150}
      boxSizing="border-box"
      boxShadow="1px 0px 3px 1px rgba(0, 0, 0, 0.15)"
    >
      <Stack
        gap={tokens.spacing.s100}
        justifyContent="center"
        direction={isMobile ? "column" : "row"}
      >
        {firstDetail.map((field, id) => (
          <RenderDetailBox
            key={id}
            data={data}
            field={field}
            id={id}
            isMobile={isMobile}
          />
        ))}
        {secondDetail.map((field, id) => (
          <RenderDetailBox
            key={id}
            data={data}
            field={field}
            id={id}
            isMobile={isMobile}
            withTag
          />
        ))}
      </Stack>

      <Stack
        gap={tokens.spacing.s200}
        direction="column"
        justifyContent="center"
      >
        {remainingDetails.map((field, id) => (
          <RenderDetailBox
            key={id}
            data={data}
            field={field}
            id={id}
            isMobile={isMobile}
          />
        ))}
      </Stack>
    </BoxContainer>
  );
};

export { TraceabilityCard };
export type { ITraceabilityCard };
