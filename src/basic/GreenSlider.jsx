import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Slider } from '@material-ui/core'

const GreenSlider = withStyles(() => ({

    root:{
        width: "20%",
        color:"#23ad3e"
    }
  }))(Slider);

  export default GreenSlider