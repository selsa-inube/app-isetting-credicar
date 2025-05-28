import { inube } from "@inubekit/inubekit";
import { ILabel } from "@ptypes/ILabel";
import { tokens } from "@design/tokens";
import { IEntry } from "@ptypes/design/table/IEntry";
import { DetailBox } from "../../detailBox";

interface IRenderDetailBox {
  data: IEntry;
  field: ILabel;
  id: number;
  isMobile: boolean;
  withTag?: boolean;
}

const RenderDetailBox = (props: IRenderDetailBox) => {
  const { data, field, id, withTag, isMobile } = props;

  return (
    <DetailBox
      key={id}
      field={field}
      data={data}
      id={id}
      backgroundColor={inube.palette.neutral.N10}
      borderRadius={tokens.spacing.s100}
      padding={
        isMobile
          ? `${tokens.spacing.s075}`
          : `${tokens.spacing.s075} ${tokens.spacing.s150}`
      }
      width="100%"
      {...(withTag && { withTag })}
    />
  );
};

export { RenderDetailBox };
