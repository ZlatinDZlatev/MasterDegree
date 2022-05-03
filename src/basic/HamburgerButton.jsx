import { withStyles } from '@material-ui/styles';
import MenuIcon from '@mui/icons-material/Menu';

const HamburgerButton = withStyles((theme) => ({
    root: {
        color: 'white',
        minWidth:'50px',
        maxWidth:'50px',
        minHeight:'50px',
        maxHeight:'50px',
        marginTop:"1%",
        '&:hover': {
            cursor:"pointer"
        },
    },
}))(MenuIcon);

export default HamburgerButton