import { inube, Stack, Tag, Text } from "@inubekit/inubekit";
import { BoxContainer } from "@design/layout/boxContainer";

import { ComponentAppearance } from "@enum/appearances";
import { IEntry } from "@ptypes/design/table/IEntry";
import { useThemeData } from "@utils/theme";
interface IDetailBox {
  field: { id: string; titleName: string };
  data: IEntry;
  id: number;
  width: string;
  borderRadius?: string;
  padding?: string;
  borderColor?: string;
  withTag?: boolean;
  ellipsis?: boolean;
}

const DetailBox = (props: IDetailBox) => {
  const {
    id,
    field,
    data,
    width,
    borderRadius,
    borderColor,
    padding,
    withTag,
    ellipsis = false,
  } = props;

  const theme = useThemeData();

  return (
    <BoxContainer
      key={id}
      direction="column"
      width={width}
      backgroundColor={
        theme ? theme?.palette?.neutral?.N10 : inube.palette.neutral.N10
      }
      borderRadius={borderRadius}
      borderColor={borderColor}
      boxSizing="border-box"
      padding={padding}
    >
      <Text size="medium" type="label" weight="bold">
        {field.titleName}
      </Text>

      {withTag ? (
        <Stack width="auto">
          <Tag
            appearance={ComponentAppearance.GRAY}
            label={data[field.id]}
            displayIcon={false}
          />
        </Stack>
      ) : (
        <Text
          size="small"
          appearance={ComponentAppearance.GRAY}
          ellipsis={ellipsis}
        >
          {data[field.id]}
        </Text>
      )}
    </BoxContainer>
  );
};

export { DetailBox };
