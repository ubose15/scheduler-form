import React ,{useState} from 'react'
import { FormHelperText} from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { MultiSelect } from "react-multi-select-component";

const MultiSelectDropdown=({brands , formik})=> {
   
const optionSize=brands.length;
const handleInvert=()=>{
  brands.reverse()
}
   
  return (
    <>
   <ButtonGroup fullWidth size="large" variant="outlined" aria-label="Large button group" disableRipple>
      <Button > Available: {optionSize} </Button>
      <Button>Selected: {formik.values.brand.length}</Button>
      <Button onClick={handleInvert}>Invert</Button>
    </ButtonGroup>
  

<MultiSelect
              options={brands}
              value={formik.values.brand}
              onChange={(selected) => formik.setFieldValue('brand', selected)}
              labelledBy="Select"
            />
             <FormHelperText sx={{color:"red"}}>{formik.touched.brand && formik.errors.brand ? formik.errors.brand : ''}</FormHelperText>
           
      
     
    </>
    
  )
}

export default MultiSelectDropdown;