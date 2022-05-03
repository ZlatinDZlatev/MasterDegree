import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core'

const WhiteButton = withStyles((theme) => ({
    root: {
      color: '#23AD3E',
      borderColor:'white',
      backgroundColor: 'white',
      height:"40%",
      '&:hover': {
        backgroundColor: '#23AD3E',
        color: "white",
        borderColor:'white',
      },
    },
  }))(Button);

  export default WhiteButton