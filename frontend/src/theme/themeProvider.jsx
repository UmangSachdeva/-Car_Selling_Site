import { ThemeOptions, createTheme } from "@mui/material/styles";

const themeOptions = {
  palette: {
    type: "light",
    primary: {
      main: "#222831",
    },
    secondary: {
      main: "#FFD369",
      contrastText: "#eeeeee",
    },
    background: {
      default: "#eeeeee",
      paper: "#393e46",
    },
    text: {
      secondary: "#393e46",
      disabled: "rgba(96,96,96,0.38)",
      hint: "rgba(65,65,65,0.38)",
      primary: "#222831",
    },
    info: {
      main: "#FFD369",
    },
  },
};

export const theme = createTheme(themeOptions);
