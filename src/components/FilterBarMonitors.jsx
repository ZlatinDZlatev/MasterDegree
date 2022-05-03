import {  FormControl, FormControlLabel, FormGroup, Typography } from '@material-ui/core'
import React from 'react'
import { Monitors } from './MonitorFilters.js'
import { makeStyles } from '@material-ui/core/styles';
import GreenCheckbox from '../basic/GreenCheckbox.jsx';



const useStyles = makeStyles((theme) => ({
  checkBoxes:{
      display:"flex",
      flexDirection:"column"
  }
       
}));

const FilterBarMonitors = ({checkBoxesBrand, setCheckBoxesBrand}) =>{
    const classes=useStyles()      
    const handleCheckBoxBrand = (event) => {
        setCheckBoxesBrand({ ...checkBoxesBrand, [event.target.name]: event.target.checked });
      };
      return(
          <div className={classes.checkBoxes}>
                <FormControl>
                <Typography component="legend">Brands</Typography>
                    <FormGroup>

                        {  Monitors.map((item, index)=>{
                            return(
                                <div className={classes.checkBoxes}>
                      {item.filterType==="brand"?item.filterOptions.map((item, index)=>{
                            return(
                                <FormControlLabel
                    control={<GreenCheckbox defaultChecked={true} color="success"  onChange={handleCheckBoxBrand} name={item.name}/>}
                    label={item.label}
                  />
                            )
                      }):null}     
                                </div>              
                            )
                        })}
                    </FormGroup>
                </FormControl>
                </div>

      )
}
export default FilterBarMonitors