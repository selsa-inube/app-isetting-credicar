import {
  Assisted,
  Breadcrumbs,
  IAssistedStep,
  Stack,
  useMediaQuery,
} from "@inubekit/inubekit";
import { IRuleDecision } from "@isettingkit/input";

import { Title } from "@design/data/title";
import { tokens } from "@design/tokens";
import { IOptionsProspect } from "@design/forms/creditProspect/types";
import { DecisionsForm } from "@design/forms/decisions";
import { revertModalDisplayData } from "@utils/revertModalDisplayData";
import { CreditProspectForm } from "@design/forms/creditProspect";
import { GeneralInformationForm } from "@pages/creditLines/forms/generalInformation";
import { crumbsAddCreditLines } from "@config/creditLines/addCreditLine/navigation";
import { textValuesBusinessRules } from "@config/moneyDestination/moneyDestinationTab/businessRules";
import { IFormsCreditlinesRefs } from "@ptypes/creditLines/addCreditLine/IFormsCreditlinesRefs";
import { IFormsCreditlines } from "@ptypes/creditLines/addCreditLine/IFormsCreditlines";
import { attentionModal, deleteModal } from "@config/decisions/messages";
import { decisionTemplateConfig } from "@config/decisions/decisionTemplateCreditLine";

interface IAddCreditLinesUI {
  decisions: IRuleDecision[];
  currentStep: number;
  formReferences: IFormsCreditlinesRefs;
  initialValues: IFormsCreditlines;
  isCurrentFormValid: boolean;
  optionsProspect: IOptionsProspect[];
  steps: IAssistedStep[];
  onNextStep: () => void;
  onPreviousStep: () => void;
  setDecisions: (decisions: IRuleDecision[]) => void;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  setOptionsProspect: React.Dispatch<React.SetStateAction<IOptionsProspect[]>>;
}

function AddCreditLinesUI(props: IAddCreditLinesUI) {
  const {
    decisions,
    currentStep,
    formReferences,
    initialValues,
    isCurrentFormValid,
    optionsProspect,
    steps,
    onNextStep,
    onPreviousStep,
    setDecisions,
    setIsCurrentFormValid,
    setOptionsProspect,
  } = props;

  const smallScreen = useMediaQuery("(max-width: 990px)");

  return (
    <Stack
      direction="column"
      width="-webkit-fill-available"
      padding={
        smallScreen
          ? `${tokens.spacing.s200}`
          : `${tokens.spacing.s300} ${tokens.spacing.s800}`
      }
    >
      <Stack gap={tokens.spacing.s300} direction="column">
        <Stack gap={tokens.spacing.s300} direction="column">
          <Breadcrumbs crumbs={crumbsAddCreditLines} />
          <Title
            title="Líneas de crédito"
            description="Registra los medios de pago"
            sizeTitle="large"
          />
        </Stack>
        <Stack gap={tokens.spacing.s300} direction="column">
          <Assisted
            step={steps[currentStep - 1]}
            totalSteps={steps.length}
            onBackClick={onPreviousStep}
            onNextClick={onNextStep}
            onSubmitClick={() => {
              console.log("");
            }}
            disableNext={!isCurrentFormValid}
            controls={{
              goBackText: "Anterior",
              goNextText: "Siguiente",
              submitText: "Finalizar",
            }}
            size={smallScreen ? "small" : "large"}
          />
          <Stack direction="column">
            {currentStep === 1 && (
              <GeneralInformationForm
                ref={formReferences.generalInformation}
                initialValues={initialValues.generalInformation.values}
                onFormValid={setIsCurrentFormValid}
                handleNextStep={onNextStep}
              />
            )}
            {currentStep === 2 && (
              <CreditProspectForm
                ref={formReferences.creditProspect}
                initialValues={initialValues.creditProspect.values}
                onFormValid={setIsCurrentFormValid}
                handleNextStep={onNextStep}
                onPreviousStep={onPreviousStep}
                optionsProspect={optionsProspect}
                setOptionsProspect={setOptionsProspect}
                isFormValid={isCurrentFormValid}
              />
            )}
            {currentStep === 3 && (
              <DecisionsForm
                attentionModal={attentionModal}
                deleteModal={deleteModal}
                textValuesBusinessRules={textValuesBusinessRules}
                decisionTemplateConfig={decisionTemplateConfig}
                onButtonClick={onNextStep}
                onPreviousStep={onPreviousStep}
                initialValues={decisions}
                setDecisions={setDecisions}
                revertModalDisplayData={revertModalDisplayData}
                labelBusinessRules="MaximunFRCquota"
                nameRule={
                  initialValues.generalInformation.values.nameCreditLine
                }
                showAttentionModal={false}
                setShowAttentionModal={() => console.log()}
                normalizeEvaluateRuleData={[]}
              />
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export { AddCreditLinesUI };
