import { Stack, Tag, Text } from "@inubekit/inubekit";
import { BoxContainer } from "@design/layout/boxContainer";
import { IDetailBox } from "@ptypes/design/IDetailBox";
import { EComponentAppearance } from "@enum/appearances";

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

  return (
    <BoxContainer
      key={id}
      direction="column"
      width={width}
      backgroundColor={EComponentAppearance.GRAY}
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
            appearance={EComponentAppearance.GRAY}
            label={data[field.id]}
            displayIcon={false}
          />
        </Stack>
      ) : (
        <Text
          size="medium"
          appearance={EComponentAppearance.GRAY}
          ellipsis={ellipsis}
        >
          {data[field.id]}
        </Text>
      )}
    </BoxContainer>
  );
};

export { DetailBox };
