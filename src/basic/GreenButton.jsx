import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core'

const GreenButton = withStyles((theme) => ({
    root: {
      color: 'white',
      borderColor:'white',
      backgroundColor: '#23AD3E',
      width:"20%",
      '&:hover': {
        backgroundColor: 'white',
        color: "#23AD3E",
        borderColor:'#23AD3E',
      },
    },
  }))(Button);

  export default GreenButton