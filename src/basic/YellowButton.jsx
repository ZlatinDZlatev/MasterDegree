import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core'

const YellowButton = withStyles((theme) => ({
    root: {
      color: 'white',
      borderColor:'white',
      backgroundColor: '#edca68',
      width:"20%",
      '&:hover': {
        backgroundColor: 'white',
        color: "#edca68",
        borderColor:'#edca68',
      },
    },
  }))(Button);

  export default YellowButton