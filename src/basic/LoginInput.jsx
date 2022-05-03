import { TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const LoginInput = withStyles({
    root: {
      
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'black',
        },
        '&:hover fieldset': {
          borderColor: 'black',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'black',
        },
      },
    },
  })(TextField);

  export default LoginInput