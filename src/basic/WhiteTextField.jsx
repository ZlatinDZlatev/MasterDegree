import { TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const WhiteTextField = withStyles({
    root: {
    
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'white',
        },
        '&:hover fieldset': {
          borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'white',
        },
      },
    },
  })(TextField);

  export default WhiteTextField