import { colors } from "$lib/theme";
import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    colors: typeof colors;
  }
}
