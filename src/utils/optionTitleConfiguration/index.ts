import { EUseCase } from "@enum/useCase";
import { configurationLabels } from "@config/creditLines/configurationLabels";

const optionTitleConfiguration = (option: string, optionRequest?: boolean) => {
  let title = "";
  let description = "";
  let optionCrumb = "";

  if (optionRequest && option === EUseCase.ADD) {
    title = configurationLabels.titleRequest;
    description = configurationLabels.descriptionRequest;
    optionCrumb = configurationLabels.optionCrumbRequest;
  } else if (option === EUseCase.ADD) {
    title = configurationLabels.titleAdd;
    description = configurationLabels.descriptionAdd;
    optionCrumb = configurationLabels.optionCrumbAdd;
  } else if (option === EUseCase.EDIT) {
    title = configurationLabels.descriptionEdit;
    description = configurationLabels.descriptionEdit;
    optionCrumb = configurationLabels.optionCrumbEdit;
  } else if (
    option === EUseCase.DETAILS ||
    option === EUseCase.DETAILS_CONDITIONAL
  ) {
    title = configurationLabels.titleDetails;
    description = configurationLabels.descriptionDetails;
    optionCrumb = configurationLabels.optionCrumbDetails;
  }

  return { title, description, optionCrumb };
};

export { optionTitleConfiguration };
