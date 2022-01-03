import { colors, typography } from "$lib/theme";
import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    colors: typeof colors;
    fontWeight: typeof typography.fontWeight,
    fontSize: typeof typography.fontSize,
    lineHeight: typeof typography.lineHeight,
  }
}
