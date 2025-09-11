import { Fieldset, Text } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";
import { BoxContainer } from "@design/layout/boxContainer";
import { EComponentAppearance } from "@enum/appearances";
import { IClientContentBox } from "@ptypes/creditLines/forms/IClientContentBox";
import { ConditionBox } from "../conditionBox";
import { StyledContainer } from "./styles";

const ClientContentBox = (props: IClientContentBox) => {
  const {
    options,
    title,
    emptyMessage,
    selectedConditionId,
    setSelectedConditionId,
  } = props;

  const hasOptions = options && options.length > 0;

  const handleConditionSelect = (id: string) => {
    setSelectedConditionId(id);
  };
  return (
    <StyledContainer>
      <Fieldset legend={title} spacing="wide" width="100%" height="100%">
        <BoxContainer
          width="100%"
          direction="column"
          height="100%"
          gap={tokens.spacing.s150}
          justifyContent={hasOptions ? "flex-start" : "center"}
          boxSizing="border-box"
          overflowY="auto"
        >
          {hasOptions ? (
            options.map((option) => (
              <ConditionBox
                key={option.id}
                id={option.id}
                description={option.value}
                isSelected={selectedConditionId === option.id}
                onclick={handleConditionSelect}
              />
            ))
          ) : (
            <BoxContainer
              width="100%"
              height="56px"
              direction="column"
              backgroundColor={EComponentAppearance.GRAY}
              borderRadius={tokens.spacing.s100}
              borderColor={EComponentAppearance.GRAY}
              padding={tokens.spacing.s150}
              boxSizing="border-box"
              justifyContent="center"
            >
              <Text
                type="label"
                size="medium"
                appearance={EComponentAppearance.GRAY}
              >
                {emptyMessage}
              </Text>
            </BoxContainer>
          )}
        </BoxContainer>
      </Fieldset>
    </StyledContainer>
  );
};

export { ClientContentBox };
