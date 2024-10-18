import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useState } from 'react';



const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


const InputFileUpload=({formik})=>{

  const [isDisabled, setIsDisabled] = React.useState(true);
  React.useEffect(()=>{
  formik.values.reportaccess =="link" ? setIsDisabled(true):setIsDisabled(false)
  },[formik.values.reportaccess])
 
  return (
   
    <Button
      component="label"
      role={undefined}
      variant="contained"
      color="standard"
      tabIndex={-1}
      disabled={isDisabled}
    >
      Browse..
      <VisuallyHiddenInput
        type="file"
        onChange={(event) => {console.log(event.target.files[0].name)
          formik.setFieldValue('attachment', event.currentTarget.files[0].name)
        }}
      />
    </Button>
  );
}
export default InputFileUpload