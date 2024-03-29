import { createTheme } from '@mui/material/styles';

export const colors = {
  blue: {
    50: '#F8F9FF',
    100: '#e8f0fe',
    200: '#d2e3fc',
    300: '#498af4',
    400: '#1a73e8',
    500: '#1967d2',
    600: '#2160bf',
    700: '#174ea6',
    bg10: '#A9B8FF0A',
    main: '#1a73e8',
  },
  gray: {
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
  },
  red: {
    100: '#fce8e6',
    200: '#fad2cf',
    300: '#eb4a3d',
    400: '#d93025',
    500: '#c5221f',
    600: '#b61d1b',
    700: '#a50e0e',
  },
  yellow: {
    100: '#fef7e0',
    200: '#feefc3',
    300: '#fbbf0e',
    400: '#f9ab00',
    500: '#f29900',
    600: '#eb8b0a',
    700: '#e37400',
  },
  green: {
    100: '#E6F4EA',
    200: '#CEEAD6',
    300: '#4FB36A',
    400: '#1E8E3E',
    500: '#188038',
    600: '#1C783B',
    700: '#0D652D',
  },
  background: {
    blue: '#F8F9FF',
  },
};

export const typography = {
  fontSize: {
    '2xl': '40px',
    xl: '32px',
    lg: '24px',
    md: '20px',
    base: '16px',
    sm: '14px',
    xs: '12px',
  },
  lineHeight: {
    '2xl': '1.4',
    xl: '1.5',
    lg: '2',
    md: '1.6',
    base: '1.5',
    sm: '24px',
    xs: '16px',
  },
  fontWeight: {
    bold: 700,
    med: 500,
    reg: 400,
  },
};

export const background = {
  blue: {
    upDown: 'linear-gradient(180deg, #498AF4 0%, #1A73E8 100%)',
  },
  red: {
    upDown: 'linear-gradient(180deg, #EB4A3D 0%, #C5221F 100%)',
  },
};

export const boxShadows = {
  black1: '0px 4px 10px rgba(0, 0, 0, 0.08);',
  blue: '0px 4px 10px rgba(73, 138, 244, 0.2);',
};

export const theme = createTheme({
  typography: {
    fontFamily: [
      'Rubik',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },

  ...typography,
  background,
  colors,
  boxShadows,
  breakpoints: {
    values: {
      xs: 0,
      sm: 700,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

  palette: {
    primary: colors.blue,
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
        margin: 'dense',
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        size: 'medium',
      },
      styleOverrides: {
        containedPrimary: {
          background: `linear-gradient(90deg, ${colors.blue['300']} 0%, ${colors.blue['400']} 100%)`,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.08)',
        },
        containedSizeMedium: {
          padding: '1rem 2rem',
        },
        sizeSmall: {
          padding: '0.5rem 1.5rem',
        },
        root: {
          textTransform: 'none',
          '&:disabled': {
            background: colors.gray['300'],
            color: colors.gray['400'],
          },
        },
      },
      variants: [
        {
          props: { variant: 'blank' },
          style: {
            boxShadow: 'none',
            background: 'none',

            color: colors.gray['700'],
          },
        },
      ],
    },
    MuiSelect: {
      defaultProps: {
        variant: 'outlined',
        margin: 'dense',
      },
    },

    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: typography.fontSize.xl,
          fontWeight: typography.fontWeight.bold,
        },
      },
    },
  },
});
