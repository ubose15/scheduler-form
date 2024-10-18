import { useState ,useEffect} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios"

import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Grid,
  FormHelperText,
  Button
} from '@mui/material';
import Parameters from './Parameters';
import Schedule from './Schedule';
import Output from './Output'
import Notifications from './Notifications'


const steps = ['Schedule','Parameters', 'Output', 'Notifications'];

const Form = () => {
    const [activeStep, setActiveStep] = useState(0);
   const [formats,setFormats]=useState([]);
    const [brands,setBrands]=useState([]);
    const [timeZones,setTimeZones]=useState([]);
     const [timeframe,setTimeframe]=useState([]);

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  const nextStep = (steptobe) => {
    setActiveStep(steptobe);
  };

  useEffect(() => {
    axios.get("formats.json")
    .then((res)=>{
     setFormats(res.data.find(group => group.formats)?.formats || [])
      setBrands(res.data.find(group => group.brands)?.brands || [])
     setTimeZones(res.data.find(group => group.timeZones)?.timeZones || [])
      setTimeframe(res.data.find(group => group.timeframe)?.timeframe || [])

    })
    .catch((err)=>alert(err))
  }, []);
 
//   const timeZones = [
//     { value: 'UTC', label: 'UTC' },
//     { value: 'GMT', label: 'GMT' },
//     { value: 'EST', label: 'Eastern Standard Time (EST)' },
//     { value: 'CST', label: 'Central Standard Time (CST)' },
//     { value: 'MST', label: 'Mountain Standard Time (MST)' },
//     { value: 'PST', label: 'Pacific Standard Time (PST)' },
//   ]
//   const timeframe = [
//     { value: "day", label: "Day" },
//     { value: "week", label: "Week" },
//     { value: "month", label: "Month" },
//   ];

//   const brands=[
//     {"value":"1","label":"ADJ"},
//     {"value":"2","label":"app"},
//     {"value":"3","label":"dd"},
//     {"value":"4","label":"cc"},
//     {"value":"5","label":"tt"},
//     {"value":"6","label":"mm"}
//    ]
//    const formats=[
//     { "value": "csv", "label": "Comma separated values(.csv)" },
//     { "value": "xlsx", "label": "Microsoft Excel(.xlsx)" },
//     { "value": "docx", "label": "Microsoft Word(.docx)" },
//     { "value": "pptx", "label": "Microsoft Powerpoint(.pptx)" },
//     { "value": "pdf", "label": "PDF Document(.pdf)" }
// ]
  const formik = useFormik({
    initialValues: {
      jobname: '',
      description: '',
      interval: 1,
      timeframe: 'day',
      starttime: 'now',
      startdatetime: null,
      brand: [],
      filename: 'BrandSalesReport',
      notidesc: '',
      timezone: ['PST'],
      formats: ['pdf'],
      sendto:'',
      subject: '',
      message: '',
      reportaccess: 'link',
      url: '',
      attachment:null,
    },
    validationSchema: Yup.object().shape({
        jobname: Yup.string()
        .required('Job Name is required'),
        description: Yup.string()
        .optional(),
      interval: Yup.number()
        .required('Interval is required'),
        timeframe: Yup.string().required('Timeframe is required'),
      starttime: Yup.string()
        .required('Start Time is required'),
        startdatetime: Yup.date().when("starttime",{
            is:"date",
            then:(schema)=> schema.required().nullable(),
            otherwise: (schema)=> schema.optional().nullable()}
        ),
        brand: Yup.array().min(1, 'At least one brand must be selected')
        .required('Brand is required'),
        filename: Yup.string().required('File Name is required'),
        notidesc: Yup.string().optional(),
        timezone: Yup.array().required('Time Zone is required'),
        formats: Yup.array().min(1, 'At least 1 format must be selected')
        .required('Format is required'),
        sendto: Yup.string()
        .required('At least one email is required').test('is-valid-emails', 'Invalid email format', (value) => {
            if (!value) return false; // Ensure there's a value
            const emails = value.split(',').map(email => email.trim());
            return emails.every(email => /^\S+@\S+\.\S+$/.test(email)); // Basic email regex
          }),
        subject: Yup.string().required('Subject is required'),
        message: Yup.string().required('Message is required'),
        reportaccess: Yup.string().required('report access is requierd'),
        url: Yup.string().url('Invalid URL format')
        .when("reportaccess",{
            is:"link",
            then:(schema)=> schema.required(),
            otherwise: (schema)=> schema.optional().nullable()}),
        attachment: Yup.mixed()
        .when("reportaccess",{
            is:"attachment",
            then:(schema)=> schema.test('fileSize', 'File size is too large greater than 2MB', value => {
                return value && value.size <= 2000000; // 2MB limit
              }).required('Attachment is required'),
            otherwise: (schema)=> schema.optional().nullable()})

    }),
    onSubmit: () => {
       
      if (activeStep === steps.length - 1) {
        console.log('last step');
        alert("Schedule created successfully!!!")
        formik.handleReset();
      } else {

        setActiveStep((prevStep) => prevStep + 1);
      }
    }
  });

  const formContent = (step) => {
    switch(step) {
      case 0:
        return <Schedule formik={formik} timeframe={timeframe} />;
      case 1:
        return <Parameters formik={formik} brands={brands} />;
      case 2:
        return <Output formik={formik} formats={formats} timeZones={timeZones}/>;
        case 3:
        return <Notifications formik={formik} />;
      default:
        return <div>404: Not Found</div>
    }
  };

  return (
    <>
    <Box sx={{ height: '800px', width: '100%' }}>
    <Box
      sx={{
        gap:2,
        margin: '5',
        padding: '2',
        height: '100%',
        width:'35%',
        float:'left',
        bgcolor:"#eae8e8"
      }}
    >
       
      <Stepper sx={{paddingLeft:'60px',paddingTop:'30px'}}
        activeStep={activeStep}
        orientation="vertical"
      >
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel><b><h3>{label}</h3></b></StepLabel>

            {index===0? <>
               <small> 
            {formik.values.jobname !='' ?`Scheduled job Name :${formik.values.jobname}`: 'Name the scheduled job'}
           </small><br />
           <small> 
            {formik.values.description !='' ?`Description :${formik.values.description}`: 'Add an optional description'}
           </small><br />
           <small> 
            {formik.values.interval ==1 && formik.values.timeframe=='day' && formik.values.starttime=='now'?`Customize the recurrence or it will be set to the following`: ``}
           </small><br />
           <small> 
            {formik.values.interval !=null && formik.values.timeframe!=''?`Repeat every: ${formik.values.interval}${formik.values.timeframe}`:`Repeat every: Select a recurrence`}
           </small><br />
           <small> 
            {formik.values.starttime =='now' ? `Starting:${formik.values.starttime}`: `Starting: ${formik.values.startdatetime}`}
           </small>
            </> : null}


            {index===1? <>
               <small> 
            {formik.values.brand !='' ?`Brand :${formik.values.brand.map((b)=> {return b.label})}`: 'Select the input control options for the report/dashboard'}
           </small>
            </> : null}
           

            {index===2? <>
               <small> 
            {formik.values.filename=='BrandSalesReport' ?`Customize the output or it will be set to the following`: ''}
           </small><br/>
           <small>
            {formik.values.filename!==''?`Filename : ${formik.values.filename}`:'Filename :Add a file name'}
           </small><br/>
           <small>
            {formik.values.notidesc!==''?`Description : ${formik.values.notidesc}`:`Add an optional Description`}
           </small><br/>
           <small>
            {formik.values.timezone.length>0?`TimeZone : ${formik.values.timezone}`:`TimeZone :Select a timezone`}
           </small>
           <small><br/>
            {formik.values.formats.length>0?`Format : ${formik.values.formats}`:`Format :Select atleast one format`}
           </small>
            </> : null}

            {index===3 ? <>
               <small> 
            {formik.values.sendto.length!=0?`Send to : ${formik.values.sendto}`:`Specify Recipient`} 
           </small><br/>
           <small> 
           {formik.values.subject!=''?`Subject : ${formik.values.subject}`:`Enter a Subject line`} </small><br/>
           <small>
            {formik.values.message!=''?`Message : ${formik.values.message}`:`Add an optional message`}
           </small><br/>
           <small>
            {formik.values.reportaccess!=''?`Report Access :${formik.values.reportaccess}`:'Select Report/Dashboard access method'}
           
           </small>
            </> : null}
          </Step>
        ))}
      </Stepper></Box>
      <Box
      sx={{
        gap:2,
        height: '100%',
        width:'65%',
        float:'right',
        bgcolor:"#eae8e8"
      }}
    >
      <Box
      sx={{
        gap:2,
        margin: '3px',
        padding: '2px',
        height: '15%',
        width:'100%',
        float:'right',
        bgcolor:"#fcfbfb"
      }}
    >
       
     <Grid container  sx={{gridGap:'40px'}}>
         <Grid item size={12} sx={{marginTop:'10px',marginLeft:'10px',textAlign:'left',fontSize:'30px',fontWeight: "bold"}}>
           Create Schedule
        </Grid>
        <Grid container  spacing={20} sx={{bottom:'0px',mr:'5px',paddingTop:'0px'}}>
        <Grid item size={3}>
        <Button variant="text" size="large" color={activeStep===0?'primary':'black'} onClick={() => nextStep(0)}>  Schedule</Button> 
          
          </Grid>
          <Grid item size={3}>
            
          <Button variant="text" color={activeStep===1?'primary':'black'} onClick={() => nextStep(1)}>    Parameter</Button> 
            
          </Grid>
          <Grid item size={3}>
            
             <Button color={activeStep===2?'primary':'black'} onClick={() => nextStep(2)}> Output</Button>
            
          </Grid>
          <Grid item size={3}>
            
          <Button color={activeStep===3?'primary':'black'} onClick={() => nextStep(3)}> Notifications</Button>
          
        </Grid>
      </Grid></Grid>
        </Box>
        <Box
        display="flex"
      flexDirection="column"
      sx={{
        gap:2,
        margin: '3px',
        padding: '2px',
        height: '73%',
        width:'100%',
         bgcolor:"#fcfbfb",
         float:'right',
         overflowY: "scroll",
          justifyContent:'left'
      }}
    >
        
          {formContent(activeStep)}
        </Box>
       
        <Box
      sx={{
        gap:2,
        margin: '3px',
        padding: '2px',
        height: '12%',
        width:'100%',
         float:'right',
         justifyContent:'left',
         textAlign:'left',
         bgcolor:'#fcfbfb',
        
      }}
    >
        
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
       
         
            <Button onClick={formik.handleSubmit} variant='contained' color='primary' sx={{marginTop:'20px',gap:'2', marginLeft:'10px'}}>
              Create Schedule
            </Button>
            <Button variant='contained' color='standard' sx={{marginTop:'20px',marginLeft:'5px',gap:'2'}} onClick={formik.handleReset}>
              Cancel
            </Button>
         
       
    </Box></Box></Box>
    </>
  
  )
}

export default Form;
