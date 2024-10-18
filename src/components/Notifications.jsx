import {
  Grid,
  FormControl,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Button
} from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import InputFileUpload from './InputFileUpload'
  
  const Notifications = ({formik}) => {
    
    return (
     
   <div className="contentbody">
    <Grid container sx={{marginLeft:'2%',width:'95%',marginRight:'2%',gridGap:'10px'}}>
    <Grid
          item
          xs={12} sx={{marginTop:'20px',textAlign:'left'}}
        >
        <h3>Email Notification</h3>
      <FormControl variant="outlined standard" fullWidth >
      <FormLabel sx={{marginTop:'10px',textAlign:'left'}}>Send to(required)</FormLabel>
        <Textarea size="sm" name="sendto"    
        error={Boolean(formik.touched.sendto && formik.errors.sendto)}
            onChange={formik.handleChange}
            value={formik.values.sendto}/>
            <FormHelperText >
         Use commas to separate email addresses
        </FormHelperText>
        <FormHelperText sx={{color:"red"}}>{formik.touched.sendto && formik.errors.sendto ? formik.errors.sendto : ''}</FormHelperText>
      </FormControl>
</Grid>
<Grid
          item
          xs={12}
        >
       <FormControl variant="outlined standard" fullWidth >
      <FormLabel sx={{marginTop:'10px',textAlign:'left'}}>Subject(required)</FormLabel>
        <Textarea size="sm" name="subject"
        error={Boolean(formik.touched.subject && formik.errors.subject)}
        onChange={formik.handleChange}
        value={formik.values.subject}/>
    <FormHelperText sx={{color:"red"}}>{formik.touched.subject && formik.errors.subject ? formik.errors.subject : ''}</FormHelperText>
      </FormControl>
</Grid>
<Grid
          item
          xs={12}
        >
      <FormControl variant="standard" fullWidth>
        <FormLabel sx={{marginTop:'10px',textAlign:'left'}}>Message</FormLabel>
        <Textarea size="lg" minRows={3} name="message"   
         error={Boolean(formik.touched.message && formik.errors.message)}
            onChange={formik.handleChange}
            value={formik.values.message}
        />
         <FormHelperText sx={{color:"red"}}>{formik.touched.message && formik.errors.message ? formik.errors.message : ''}</FormHelperText>
      </FormControl>
</Grid>
      <Grid
          item
          xs={12} md={5} 
        >
        <FormControl>
      <FormLabel sx={{marginTop:'10px',textAlign:'left'}} id="buttons-group">Report/dashboard access(required)</FormLabel>
      <RadioGroup
      sx={{marginTop:'10px',justifyContent:'left'}}
                aria-label="options"
                name="reportaccess"
                value={formik.values.reportaccess}
                onChange={e => {
                  formik.setFieldValue('reportaccess', e.target.value);
                }}
                onBlur={formik.handleBlur}
              >
                <FormControlLabel value="link" control={<Radio />} label="Include report/dashboard as repository link" />
                
                <FormControlLabel value="attachment" control={<Radio />} label="Include report/dashboard file as attachment" />
               
              </RadioGroup>
      <FormHelperText sx={{color:"red"}}>{formik.touched.reportaccess && formik.errors.reportaccess ? formik.errors.reportaccess : ''}</FormHelperText>
    </FormControl>
        </Grid>
        <Grid container sx={{display:'flex',textAlign:'left'}} >
          <Grid item
          xs={6} md={9} sx={{float:'left',marginLeft:'20px'}} fullWidth
        > 
        <FormLabel sx={{textAlign:'left'}}>Repository URI</FormLabel>
            
      {formik.values.reportaccess==="link" ? <Textarea name="url"
         error={Boolean(formik.touched.url && formik.errors.url)}
            onChange={formik.handleChange}
            value={formik.values.url}/>
             :<Textarea name="attachment"
            error={Boolean(formik.touched.attachment && formik.errors.attachment)}
               onChange={formik.handleChange}
               value={formik.values.attachment}/>}
                 {formik.values.reportaccess==="link" ? 
        <FormHelperText sx={{color:"red"}}>{formik.touched.url && formik.errors.url ? formik.errors.url : ''}</FormHelperText>:
        <FormHelperText sx={{color:"red"}}>{formik.touched.attachment && formik.errors.attachment ? formik.errors.attachment : ''}</FormHelperText>}
       </Grid>
         <Grid item
          xs={6} md={2} sx={{float:'left',marginTop:'22px',marginLeft:'5px',marginBottom:'50px'}} >
               {/* <Button variant='contained' color='primary' > Browse</Button> */}
               <InputFileUpload formik={formik}/>
               </Grid></Grid>
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
  
  export default Notifications
  