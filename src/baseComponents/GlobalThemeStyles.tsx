import { css, Global } from "@emotion/react";
import useTheme from "services/theme/useTheme";
import { themes } from "services/theme/theme";

export const GlobalThemeStyles = () => {
  const { themeName } = useTheme();
  const theme = themes[themeName];

  return (
    <Global
      styles={css`
        html {
          font-family: sans-serif;
          scrollbar-color: ${theme.palette.scroll}
            ${theme.palette.scrollBackground};
          scrollbar-width: thin;
        }

        /* Chromium / Safari / Edge */
        ::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
        ::-webkit-scrollbar-track {
          background: ${theme.palette.scrollBackground};
        }
        ::-webkit-scrollbar-thumb {
          background: ${theme.palette.scroll};
          border-radius: 5px;
          border: 2px solid ${theme.palette.scrollBackground}; /* визуально тоньше */
        }
        ::-webkit-scrollbar-thumb:hover {
          background: ${theme.palette.scrollHover};
        }
        ::-webkit-scrollbar-corner {
          background: transparent;
        }

        html,
        body {
          overscroll-behavior-y: contain;
          background-color: ${theme.palette.background};
          color: ${theme.palette.text};
          width: 100%;
          height: 100%;
          overflow: auto;
          padding: 0;
          margin: 0;
        }
      `}
    />
  );
};
