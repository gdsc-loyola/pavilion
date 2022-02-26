import { background, colors, typography, boxShadows } from '$lib/theme';
import '@mui/material/styles';

import '@mui/material/TextField';
import '@mui/material/Button';

declare module '@mui/material/styles' {
  interface Theme {
    colors: typeof colors;
    fontWeight: typeof typography.fontWeight;
    fontSize: typeof typography.fontSize;
    lineHeight: typeof typography.lineHeight;
    background: typeof background;
    boxShadows: typeof boxShadows;
  }
}

declare module '@mui/material/TextField' {
  interface TextFieldPropsVariantOverrides {
    bordered: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    blank: true;
  }
}
