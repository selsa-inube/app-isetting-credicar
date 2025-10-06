import { EUseCase } from "@enum/useCase";
import { configurationLabels } from "@config/creditLines/configurationLabels";

const optionTitleConfiguration = (option: string) => {
  let title = "";
  let description = "";
  let optionCrumb = "";

  if (option === EUseCase.ADD) {
    title = configurationLabels.titleAdd;
    description = configurationLabels.descriptionAdd;
    optionCrumb = configurationLabels.optionCrumbAdd;
  }

  if (option === EUseCase.EDIT) {
    title = configurationLabels.descriptionEdit;
    description = configurationLabels.descriptionEdit;
    optionCrumb = configurationLabels.optionCrumbEdit;
  }

  if (option === EUseCase.DETAILS) {
    title = configurationLabels.titleDetails;
    description = configurationLabels.descriptionDetails;
    optionCrumb = configurationLabels.optionCrumbDetails;
  }

  return { title, description, optionCrumb };
};

export { optionTitleConfiguration };
