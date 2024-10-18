import {
    Grid,
    TextField,
    FormHelperText
  } from "@mui/material";
import MultiSelectDropdown from "./MultiSelectDropdown";
  
  const Parameters = ({formik,brands}) => {
    
    // const brands=[
    //   {value:'1',label:'ADJ'},
    //   {value:'2',label:'app'},
    //   {value:'3',label:'dd'},
    //   {value:'4',label:'cc'},
    //   {value:'5',label:'tt'},
    //   {value:'6',label:'mm'},
    //  ]
      
    return (
     
   <div className="contentbody">
    <Grid container sx={{marginLeft:'2%',width:'95%',marginRight:'2%',gridGap:'10px'}}>
    <Grid
          item
          xs={12} sx={{marginTop:'10px'}}
        >
          <MultiSelectDropdown brands={brands} formik={formik}/>
       </Grid>
        {formik.errors.submit && (
          <Grid
            item
            xs={12}
          >
            <FormHelperText error>
              {formik.errors.submit}
            </FormHelperText>
          </Grid>
        )}
      </Grid>
      </div>
    )
  }
  
  export default Parameters
  