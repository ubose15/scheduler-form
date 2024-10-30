import {
    Grid,
    TextField,
    FormHelperText,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Select,
    MenuItem
  } from "@mui/material";
  import DatePicker from 'react-datepicker';
  import Textarea from '@mui/joy/Textarea';
  //import Select from 'react-select';

  
  const Schedule = ({formik,timeframe}) => {
    
    
    return (
      
   <div className="ContentBody">
    <Grid container sx={{marginLeft:'2%',width:'95%',marginRight:'2%',gridGap:'10px'}}>
    <Grid
          item
          xs={12} md={12} sx={{marginTop:'10px',textAlign:'left'}}
        >
        <h3>Name and Description</h3><br/>
      <FormControl variant="standard" fullWidth >
      <FormLabel sx={{textAlign:'left',marginTop:'10px'}}>Scheduled job name(required)</FormLabel>
        <Textarea size="sm" name="jobname"    
        error={Boolean(formik.touched.jobname && formik.errors.jobname)}
            onChange={formik.handleChange}
            value={formik.values.jobname}/>
            <FormHelperText sx={{color:"red"}}>{formik.touched.jobname && formik.errors.jobname ? formik.errors.jobname : ''}</FormHelperText>
      </FormControl>
</Grid><Grid
          item
          xs={12} sx={{marginTop:'10px'}}
        >
      <FormControl variant="standard" fullWidth>
        <FormLabel sx={{textAlign:'left',marginTop:'10px'}}>Description</FormLabel>
        <Textarea size="lg" minRows={3} name="description"   
         error={Boolean(formik.touched.description && formik.errors.description)}
            onChange={formik.handleChange}
            value={formik.values.description}
        />
         <FormHelperText sx={{color:"red"}}>{formik.touched.description && formik.errors.description ? formik.errors.description : ''}</FormHelperText>
      </FormControl>
</Grid>
      <h3 >Recurrence</h3><br/>
      <Grid container sx={{display:'flex',gridGap:'10px'}}>
      <Grid
          item
          xs={6} md={6} sx={{textAlign:'left'}}
        >
<FormControl sx={{ m: 1,  }} >
      <FormLabel sx={{textAlign:'left'}}>Interval(required)</FormLabel>
      <TextField type="number" name="interval"  inputProps={{
                    step: 1,min: 1,
                  }}   
                  error={Boolean(formik.touched.interval && formik.errors.interval)}
                  onChange={formik.handleChange}
                  value={formik.values.interval}/>
                   <FormHelperText sx={{color:"red"}}>{formik.touched.interval && formik.errors.interval ? formik.errors.interval : ''}</FormHelperText>
    </FormControl>
    
    <FormControl sx={{ m: 1}} >
      <FormLabel sx={{textAlign:'right'}}>Timeframe(required)</FormLabel>
      <Select 
              labelId="timeframe-label"
              name="timeframe"
              value={formik.values.timeframe}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
             
            >
              {timeframe.map(zone => (
                <MenuItem key={zone.value} value={zone.value}>
                  {zone.label}
                </MenuItem>
              ))}
            </Select>
        <FormHelperText sx={{color:"red"}}>{formik.touched.timeframe && formik.errors.timeframe ? formik.errors.timeframe : ''}</FormHelperText>
        </FormControl>
        </Grid></Grid>
        <Grid item xs={6} md={6} sx={{marginTop:'10px',textAlign:'left'}}>
        <FormControl>
      <FormLabel id="radio-buttons-group">Start Time(required)</FormLabel>
      <RadioGroup
                aria-label="options"
                name="starttime"
                value={formik.values.starttime}
                error={Boolean(formik.touched.starttime && formik.errors.starttime)}
                onChange={e => {
                  formik.setFieldValue('starttime', e.target.value);
                }}
                onBlur={formik.handleBlur}
              >
                 <FormHelperText sx={{color:"red"}}>{formik.touched.starttime && formik.errors.starttime ? formik.errors.starttime : ''}</FormHelperText>
                <FormControlLabel value="now" control={<Radio />} label="now" />
                <FormControlLabel value="date" control={<Radio />} label="Specific date and time" />
               
              </RadioGroup>
    </FormControl>

        </Grid>
        <Grid item xs={8} md={6} sx={{marginLeft:'30px',textAlign:'left',marginBottom:'50px'}}>
        <FormControl>
        <DatePicker 
        name="startdatetime" label="Date & Time"
                    //  value={formik.values.startdatetime}
                       placeholderText="yyyy/MM/dd"
                       selected={formik.values.startdatetime}
                      dateFormat="yyyy/MM/dd"
                      minDate={new Date()}
                      className="custom-datepicker"
                      onChange={date => formik.setFieldValue('startdatetime', date)} />
                    <FormHelperText sx={{color:"red"}}>{formik.touched.startdatetime && formik.errors.startdatetime ? formik.errors.startdatetime : ''}</FormHelperText>
            </FormControl></Grid>
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
  
  export default Schedule
  