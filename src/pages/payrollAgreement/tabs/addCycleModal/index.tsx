import { MdInfoOutline } from "react-icons/md";
import {
  Stack,
  Icon,
  useMediaQuery,
  Select,
  Label,
  Grid,
  Textfield,
} from "@inubekit/inubekit";

import { tokens } from "@design/tokens";
import { mediaQueryMobile } from "@config/environment";
import { ComponentAppearance } from "@enum/appearances";
import { getFieldState } from "@utils/getFieldState";
import { IAddCycleModal } from "@ptypes/design/IAddCycleModal";
import { addCycleLabels } from "@config/payrollAgreement/payrollAgreementTab/generic/addCycleLabels";
import { ModalWrapper } from "@design/modals/modalWrapper";
import { isInvalid } from "@utils/isInvalid";
import { StyledSelectConatiner } from "./styles";

const AddCycleModal = (props: IAddCycleModal) => {
  const {
    actionText,
    comparisonData,
    formik,
    loading,
    portalId,
    title,
    isOrdinary,
    isExtraordinary,
    periodicityOptions,
    paydayOptions,
    typePaymentOptions,
    monthOptions,
    dayOptions,
    numberDaysUntilCutOptions,
    onCloseModal,
    onClick,
    onChange,
    onToggleInfoModal,
  } = props;

  const isMobile = useMediaQuery(mediaQueryMobile);

  return (
    <ModalWrapper
      width={isMobile ? "335px" : "450px"}
      minHeight={isMobile ? "auto" : "480px"}
      isMobile={isMobile}
      labelActionButton={actionText}
      labelCloseModal="Cerrar"
      portalId={portalId}
      title={title}
      onClick={onClick}
      onCloseModal={onCloseModal}
      loading={loading}
      disabledActionButton={comparisonData || !formik.isValid}
    >
      <Stack gap={tokens.spacing.s200} direction="column" width="100%">
        <Textfield
          name="nameCycle"
          id="nameCycle"
          label={addCycleLabels.nameCycle}
          placeholder={addCycleLabels.placeholderNameCycle}
          size="compact"
          value={formik.values.nameCycle}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          status={getFieldState(formik, "nameCycle")}
          message={formik.errors.nameCycle}
          counter
          maxLength={addCycleLabels.maxLengthNameCycle}
          fullwidth
          required
        />
        {isOrdinary && (
          <>
            <Select
              id="periodicity"
              name="periodicity"
              label={addCycleLabels.periodicity}
              placeholder={addCycleLabels.placeholderPeriodicity}
              onChange={onChange}
              options={periodicityOptions ?? []}
              size="compact"
              value={formik.values.periodicity ?? ""}
              fullwidth
              onBlur={formik.handleBlur}
              message={formik.errors.periodicity}
              invalid={isInvalid(formik, "periodicity")}
            />
            <Stack direction="column">
              <Stack
                alignItems="center"
                gap={tokens.spacing.s050}
                margin={`${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s075} ${tokens.spacing.s200}`}
              >
                <Label htmlFor="payday" size="small">
                  {addCycleLabels.payday}
                </Label>
                <Icon
                  icon={<MdInfoOutline />}
                  appearance={ComponentAppearance.PRIMARY}
                  onClick={onToggleInfoModal}
                  size="12px"
                  cursorHover
                />
              </Stack>
              <Select
                id="payday"
                name="payday"
                placeholder={addCycleLabels.placeholderPayday}
                onChange={onChange}
                options={paydayOptions ?? []}
                disabled={!formik.values.periodicity}
                size="compact"
                value={formik.values.payday ?? ""}
                fullwidth
                message={formik.errors.payday}
                invalid={isInvalid(formik, "payday")}
                onBlur={formik.handleBlur}
              />
            </Stack>
          </>
        )}

        {isExtraordinary && (
          <>
            <Select
              id="typePayment"
              name="typePayment"
              label={addCycleLabels.typePayment}
              placeholder={addCycleLabels.placeholderTypePayment}
              onChange={onChange}
              options={typePaymentOptions ?? []}
              size="compact"
              value={formik.values.typePayment ?? ""}
              fullwidth
              message={formik.errors.typePayment}
              onBlur={formik.handleBlur}
              invalid={isInvalid(formik, "typePayment")}
            />
            <Stack direction="column" width="100%">
              <Stack
                margin={`${tokens.spacing.s0} ${tokens.spacing.s0} ${tokens.spacing.s075} ${tokens.spacing.s200}`}
              >
                <Label htmlFor="month" size="small">
                  {addCycleLabels.payday}
                </Label>
              </Stack>
              <Grid
                gap={tokens.spacing.s075}
                templateColumns={`repeat(${isMobile ? 1 : 2}, 1fr)`}
                autoRows="auto"
                width="100%"
              >
                <StyledSelectConatiner>
                  <Select
                    id="month"
                    name="month"
                    placeholder={addCycleLabels.placeholderMonth}
                    onChange={onChange}
                    options={monthOptions ?? []}
                    size="compact"
                    fullwidth
                    value={formik.values.month ?? ""}
                    message={formik.errors.month}
                    invalid={isInvalid(formik, "month")}
                    onBlur={formik.handleBlur}
                  />
                </StyledSelectConatiner>
                <StyledSelectConatiner>
                  <Select
                    id="day"
                    name="day"
                    placeholder={addCycleLabels.placeholderDay}
                    onChange={onChange}
                    options={dayOptions ?? []}
                    size="compact"
                    fullwidth
                    disabled={!formik.values.month}
                    value={formik.values.day ?? ""}
                    message={formik.errors.day}
                    invalid={isInvalid(formik, "day")}
                    onBlur={formik.handleBlur}
                  />
                </StyledSelectConatiner>
              </Grid>
            </Stack>
          </>
        )}

        <Select
          id="numberDaysUntilCut"
          name="numberDaysUntilCut"
          label={addCycleLabels.numberDaysUntilCut}
          placeholder={addCycleLabels.placeholderNumberDaysUntilCut}
          onChange={onChange}
          options={numberDaysUntilCutOptions}
          size="compact"
          value={formik.values.numberDaysUntilCut ?? ""}
          fullwidth
          message={formik.errors.numberDaysUntilCut}
          disabled={formik.values.periodicity && !formik.values.periodicity}
          invalid={isInvalid(formik, "numberDaysUntilCut")}
          onBlur={formik.handleBlur}
        />
      </Stack>
    </ModalWrapper>
  );
};

export { AddCycleModal };
