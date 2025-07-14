import { Stack, Text, Toggle } from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { EComponentAppearance } from "@enum/appearances";
import { IOptionsPropectCredit } from "@ptypes/design/IOptionsPropectCredit";

const OptionsPropectCredit = (props: IOptionsPropectCredit) => {
  const { entry, onChange } = props;
  return (
    <Stack direction="column" gap={tokens.spacing.s200} width="100%">
      <Text size="medium">{entry.label}</Text>
      <Stack direction="row" justifyContent="left">
        <Toggle
          checked={entry.isActive}
          id={entry.id}
          margin="0px"
          name={entry.id}
          onChange={() => onChange(entry.id)}
          padding="0px"
          size="large"
        />
        <Text
          size="large"
          type="label"
          appearance={
            entry.isActive
              ? EComponentAppearance.SUCCESS
              : EComponentAppearance.DANGER
          }
          weight="bold"
        >
          {entry.isActive ? "SI" : "NO"}
        </Text>
      </Stack>
    </Stack>
  );
};

export { OptionsPropectCredit };
