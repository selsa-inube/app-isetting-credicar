import { MdInfoOutline } from "react-icons/md";
import { Icon, Stack, Text, Toggle } from "@inubekit/inubekit";
import { tokens } from "@design/tokens";
import { EComponentAppearance } from "@enum/appearances";
import { IToggleGeneralDecision } from "@ptypes/generalCredPolicies/forms/IToggleGeneralDecision";
import { toggleDecisionsLabels } from "@config/generalCreditPolicies/assisted/toggleDecisionsLabels";

const ToggleGeneralDecision = (props: IToggleGeneralDecision) => {
  const { name, label, isChecked, showIcon, onInfoModal, onToggle } = props;

  const text = isChecked ? toggleDecisionsLabels.yes : toggleDecisionsLabels.no;
  const appearance = isChecked
    ? EComponentAppearance.SUCCESS
    : EComponentAppearance.DANGER;

  return (
    <Stack direction="column" gap={tokens.spacing.s200}>
      <Stack alignItems="center" gap={tokens.spacing.s050}>
        <Text size="medium">{label}</Text>
        {showIcon && onInfoModal && (
          <Icon
            icon={<MdInfoOutline />}
            appearance={EComponentAppearance.PRIMARY}
            onClick={onInfoModal}
            size="12px"
            cursorHover
          />
        )}
      </Stack>
      <Stack
        gap={tokens.spacing.s050}
        margin={`${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s200}`}
      >
        <Toggle
          checked={isChecked}
          id={name}
          name={name}
          onChange={onToggle}
          value={name}
          size="large"
        />
        <Text size="medium" weight="bold" appearance={appearance}>
          {text}
        </Text>
      </Stack>
    </Stack>
  );
};

export { ToggleGeneralDecision };
