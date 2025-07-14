import { forwardRef } from "react";
import { MdOutlineChevronRight } from "react-icons/md";
import { Text, Icon, Label, Stack } from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { EComponentAppearance } from "@enum/appearances";
import { ISelectCheckUI } from "@ptypes/design/ISelectCheckUI";
import { getTypo } from "@utils/getTypo";
import { OptionList } from "./optionList";
import {
  StyledChevron,
  StyledContainer,
  StyledInput,
  StyledInputContainer,
} from "./styles";
import { OptionItem } from "./optionItem";
import { Message } from "./message";

const SelectCheckUI = forwardRef<HTMLDivElement, ISelectCheckUI>(
  (props: ISelectCheckUI, ref) => {
    const {
      disabled,
      id,
      name,
      options,
      value,
      displayList,
      focused,
      fullwidth,
      label,
      message,
      invalid,
      optionListVisible,
      onBlur,
      onChange,
      onChangeCheck,
      onClick,
      onFocus,
      placeholder,
      readonly,
      required,
      size = "compact",
      status = "pending",
    } = props;

    return (
      <StyledContainer $fullwidth={fullwidth} disabled={disabled} ref={ref}>
        {(label ?? required) && (
          <Stack
            alignItems="center"
            padding={`${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s050} ${tokens.spacing.s200}`}
            gap={tokens.spacing.s050}
          >
            {label && (
              <Label
                htmlFor={id}
                disabled={disabled}
                focused={!readonly && focused}
                invalid={status === "invalid" && !readonly}
                size={getTypo(size)}
              >
                {label}
              </Label>
            )}

            {required && !disabled && (
              <Text
                type="body"
                size="small"
                appearance={EComponentAppearance.DARK}
              >
                (Requerido)
              </Text>
            )}
          </Stack>
        )}
        <StyledInputContainer
          $disabled={disabled}
          $focused={focused}
          $invalid={invalid}
          $onClick={onClick}
          $size={size}
        >
          <StyledInput
            readOnly
            value={value}
            name={name}
            id={id}
            placeholder={placeholder}
            $disabled={disabled}
            required={required}
            $size={size}
            $status={status}
            $fullwidth={fullwidth}
            $focused={focused}
            onBlur={onBlur}
            onFocus={onFocus}
            onChange={onChange}
            onClick={onClick}
          />
          <Stack direction="row" gap={tokens.spacing.s100} alignItems="center">
            <StyledChevron $displayList={displayList}>
              <Icon
                appearance={EComponentAppearance.DARK}
                icon={<MdOutlineChevronRight />}
                spacing="narrow"
                disabled={disabled}
              />
            </StyledChevron>
          </Stack>
        </StyledInputContainer>

        {status && (
          <Message disabled={disabled} status={status} message={message} />
        )}

        {optionListVisible && (
          <OptionList onClick={onChangeCheck}>
            {options?.map((optionItem) => (
              <OptionItem
                key={optionItem.id}
                id={optionItem.id}
                label={optionItem.label}
                checked={optionItem.checked}
                onChange={onChangeCheck}
              />
            ))}
          </OptionList>
        )}
      </StyledContainer>
    );
  },
);

SelectCheckUI.displayName = "SelectCheckUI";

export type { ISelectCheckUI };
export { SelectCheckUI };
