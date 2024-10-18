import {
  Grid,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
    Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import Textarea from '@mui/joy/Textarea';
  
  const Output = ({ formik,formats ,timeZones}) => {
   
    return (
     
   <div className="contentbody">
    <Grid container sx={{marginLeft:'2%',width:'95%',marginRight:'2%',gridGap:'10px'}}>
    <Grid
          item
          xs={12} sx={{marginTop:'10px',textAlign:'left'}}
        >
        <h3>Output File Options</h3>
      <FormControl variant="outlined standard" fullWidth >
      <FormLabel sx={{textAlign:'left',marginTop:'20px'}}>File Name(required)</FormLabel>
        <Textarea size="sm" name="filename"    placeholder='BrandSalesReport'
        error={Boolean(formik.touched.filename && formik.errors.filename)}
            onChange={formik.handleChange}
            value={formik.values.filename}/>
      <FormHelperText sx={{color:"red"}}>{formik.touched.filename && formik.errors.filename ? formik.errors.filename : ''}</FormHelperText>
      </FormControl>
</Grid><Grid
          item
          xs={12}
        >
      <FormControl variant="standard" fullWidth>
        <FormLabel sx={{textAlign:'left'}}>Description</FormLabel>
        <Textarea size="lg" minRows={3} name="notidesc"   
         error={Boolean(formik.touched.notidesc && formik.errors.notidesc)}
            onChange={formik.handleChange}
            value={formik.values.notidesc}
        />
      </FormControl>
</Grid>
      <Grid
          item
          xs={12} md={12} sx={{marginTop:'10px'}}
        >
<FormControl sx={{ m: 1, display:'flex' }} >
      <FormLabel sx={{textAlign:'left'}}>Timezone(required)</FormLabel>
      <Select
              labelId="timezone-label"
              name="timezone"
              value={formik.values.timezone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
             
            >
              {timeZones.map(zone => (
                <MenuItem key={zone.value} value={zone.value}>
                  {zone.label}
                </MenuItem>
              ))}
            </Select>
    <FormHelperText sx={{color:"red"}}>{formik.touched.timeZone && formik.errors.timeZone ? formik.errors.timeZone : ''}</FormHelperText>
    </FormControl>
    <FormControl sx={{ m: 1, display:'flex' }} >
      <FormLabel sx={{textAlign:'left',marginTop:'10px'}}>Formats(required)</FormLabel>
      <FormGroup>
              {formats.map(option => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={formik.values.formats.includes(option.value)}
                      onChange={e => {
                        const { checked } = e.target;
                        if (checked) {
                          formik.setFieldValue('formats', [...formik.values.formats, option.value]);
                        } else {
                          formik.setFieldValue('formats', formik.values.formats.filter(value => value !== option.value));
                        }
                      }}
                    />
                  }
                  label={option.label}
                />
              ))}
            </FormGroup>
      <FormHelperText sx={{color:"red"}}>{formik.touched.formats && formik.errors.formats ? formik.errors.formats : ''}</FormHelperText>
     </FormControl>
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
  
  export default Output
  