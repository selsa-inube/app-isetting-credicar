import { Text } from "@inubekit/inubekit";
import { EComponentAppearance } from "@enum/appearances";
import { IConditionBox } from "@ptypes/creditLines/forms/IConditionBox";
import { StyledContainer } from "./styles";

const ConditionBox = (props: IConditionBox) => {
  const { id, description, isSelected, onclick } = props;

  const conditionSelected = isSelected
    ? EComponentAppearance.PRIMARY
    : EComponentAppearance.DARK;

  return (
    <StyledContainer $isSelected={isSelected} onClick={() => onclick(id)}>
      <Text type="label" size="medium" appearance={conditionSelected}>
        {description}
      </Text>
    </StyledContainer>
  );
};

export { ConditionBox };
