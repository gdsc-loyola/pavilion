import { styled, TextField } from '@mui/material';

const BorderedTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.colors.gray[400],
    },
  },
}));
export default BorderedTextField;
