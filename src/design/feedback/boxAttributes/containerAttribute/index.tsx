import { Text } from "@inubekit/inubekit";
import { ComponentAppearance } from "@enum/appearances";
import { IContainerAttribute } from "@ptypes/design/IContainerAttribute";

const ContainerAttribute = (props: IContainerAttribute) => {
  const { withTag, children, isMobile, direction, value } = props;

  const validationTransformation =
    typeof value === "object" ? JSON.stringify(value) : String(value);
  const hasMobile = isMobile ? "small" : "medium";
  const hasDirection = direction === "column" ? "start" : "end";

  return (
    <>
      {withTag ? (
        children
      ) : (
        <Text
          size={hasMobile}
          appearance={ComponentAppearance.GRAY}
          textAlign={hasDirection}
        >
          {validationTransformation}
        </Text>
      )}
    </>
  );
};

export { ContainerAttribute };
