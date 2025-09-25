import { useEffect, useState } from "react";

const useLanguage = () => {
  const [languageBrowser, setLanguageBrowser] = useState<string>();

  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.language) {
      const browser = navigator.language.split("-")[0];
      setLanguageBrowser(browser);
    }
  }, [navigator]);

  return { languageBrowser };
};

export { useLanguage };
