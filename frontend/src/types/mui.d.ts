import { background, colors, typography } from '$lib/theme';
import '@mui/material/styles';

import '@mui/material/TextField';

declare module '@mui/material/styles' {
  interface Theme {
    colors: typeof colors;
    fontWeight: typeof typography.fontWeight;
    fontSize: typeof typography.fontSize;
    lineHeight: typeof typography.lineHeight;
    background: typeof background;
  }
}

declare module '@mui/material/TextField' {
  interface TextFieldPropsVariantOverrides {
    bordered: true;
  }
}
