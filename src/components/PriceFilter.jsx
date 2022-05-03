import { Typography } from '@material-ui/core';
import React from 'react'
import GreenSlider from '../basic/GreenSlider';

const PriceFilter = ({price, setPrice}) =>{
    function valuetext(price) {
        return `${price} lv`;
      }
return(
    <div>
<Typography component="legend">Price</Typography>
<GreenSlider
  value={price}
  getAriaValueText={valuetext}
  aria-labelledby="discrete-slider-custom"
  step={200}
  onChange={(event,newValue)=>{setPrice(newValue); console.log(price)}}
  min={200}
  max={3000}
  valueLabelDisplay="auto"
/>
</div>
)
}

export default PriceFilter