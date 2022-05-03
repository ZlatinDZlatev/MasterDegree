import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core'

const RedButton = withStyles((theme) => ({
    root: {
      color: 'white',
      borderColor:'white',
      backgroundColor: 'red',
      width:"20%",
      '&:hover': {
        backgroundColor: 'white',
        color: "red",
        borderColor:'red',
      },
    },
  }))(Button);

  export default RedButton