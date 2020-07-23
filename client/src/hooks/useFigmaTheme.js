import { useState, useEffect } from "react";

import tinycolor from "tinycolor2";

import useFigmaButtons from "./useFigmaButtons";
import useFigmaColors from "./useFigmaColors";
import useFigmaTypographies from "./useFigmaTypographies";
import useFigmaBadges from "./useFigmaBadges";
import useFigmaAlerts from "./useFigmaAlerts";

const MUI_TYPOGRAPHY = "MuiTypography";
const MUI_BUTTON = "MuiButton";
const MUI_BADGE = "MuiBadge";
const MUI_ALERT = "MuiAlert";

const useFigmaTheme = () => {
  const figmaButtons = useFigmaButtons();
  const figmaColors = useFigmaColors();
  const figmaTypographies = useFigmaTypographies();
  const figmaBadges = useFigmaBadges();
  const figmaAlerts = useFigmaAlerts();

  const [figmaTheme, setFigmaTheme] = useState(null);

  const updateFigmaTheme = () => {
    let theme = {
      palette: {},
      overrides: {
        [MUI_TYPOGRAPHY]: { root: {} },
        [MUI_BUTTON]: { root: {} },
        [MUI_BADGE]: { badge: {} },
        [MUI_ALERT]: { root: {} },
      },
    };

    if (figmaButtons) {
      figmaButtons.forEach(({ name, style: { ...props } }) => {
        theme.overrides[MUI_BUTTON]["root"][`&.figma-${name}`] = props;
      });
    }

    if (figmaColors) {
      figmaColors.forEach(({ name, color: value }) => {
        const main = tinycolor(value).toHexString();
        theme.palette[name] = { main };
      });
    }

    if (figmaTypographies) {
      figmaTypographies.forEach(({ name, style: { ...props } }) => {
        theme.overrides[MUI_TYPOGRAPHY]["root"][
          `&.figma-typography-${name}`
        ] = props;
      });
    }

    if (figmaBadges) {
      figmaBadges.forEach(({ name, style: { ...props } }) => {
        theme.overrides[MUI_BADGE]["badge"][`&.figma-badge-${name}`] = props;
      });
    }

    if (figmaAlerts) {
      figmaAlerts.forEach(({ name, style: { ...props } }) => {
        theme.overrides[MUI_ALERT]["root"][`&.figma-${name}`] = props;
      });
    }

    setFigmaTheme(theme);
  };

  useEffect(() => {
    if (
      figmaButtons &&
      figmaColors &&
      figmaTypographies &&
      figmaBadges &&
      figmaAlerts
    ) {
      console.info("Updating figma theme ...");
      updateFigmaTheme();
    }
  }, [figmaButtons, figmaColors, figmaTypographies, figmaBadges, figmaAlerts]);

  return figmaTheme;
};

export default useFigmaTheme;
