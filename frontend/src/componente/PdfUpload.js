import * as React from 'react';
import {useState} from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Button } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import '../Pdf.css';
import { notitaRoute } from '../ApiRoutes';
import {put,get} from '../Calls';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';


export default function PdfUpload(){

    const defaultLayoutPluginInstance = defaultLayoutPlugin();
  
  const [pdfFile, setPdfFile]=useState(null);
  const [viewPdf, setViewPdf]=useState(null);
  const [open, setOpen] = useState(false);

  let idNotita=JSON.parse(localStorage.getItem("IDNotita"));
  let text=JSON.parse(localStorage.getItem("Text"));

    const salvare=async()=>{

      let notita=await get(notitaRoute,idNotita);
      notita.text=document.querySelector('textarea').value;
      await put(notitaRoute, idNotita, notita);
    }

  const fileType=['application/pdf'];
  const handlePdfFileChange=(e)=>{
    let selectedFile=e.target.files[0];
    if(selectedFile){
      if(selectedFile&&fileType.includes(selectedFile.type)){
        let reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = (e) =>{
              setPdfFile(e.target.result);   
            }
      }
      else{
        setPdfFile(null);
        
      }
    }
    else{
      console.log('select your file');
      
    } 
  }


  const handlePdfFileSubmit=(e)=>{
    e.preventDefault();
    if(pdfFile!==null){
      setViewPdf(pdfFile);
      setOpen(false);
    }
    else{
      setViewPdf(null);
      setOpen(true);
    }
  }

  const Input = styled('input')({
    display: 'none',
  });

    return(
        <div className='container'>      
          
        <label htmlFor="icon-button-file">
            <Input accept="application/pdf*" id="icon-button-file" type="file" className='form-control'
              required onChange={handlePdfFileChange}/>
                <IconButton color="primary" aria-label="upload picture" component="span">
                <PostAddIcon />
                </IconButton>
        </label>
            <Button  variant="contained"  onClick={handlePdfFileSubmit}>
              UPLOAD
            </Button>
            
            <div className='view'>
            <textarea defaultValue={text} id="pdfNotita" onChange={salvare}></textarea>
              <div className='pdf-container'>
              {viewPdf&&<><Worker  workerUrl="https://unpkg.com/pdfjs-dist@2.11.338/build/pdf.worker.min.js">
                <Viewer  fileUrl={viewPdf}
                plugins={[defaultLayoutPluginInstance]} />
                </Worker></>}
           
               
        
          </div>
          
            </div>
          
            <Snackbar open={open} autoHideDuration={2000}>
          <Alert  severity="error" sx={{ width: '100%' }}>
          Nu ati selectat niciun document
         </Alert>
         </Snackbar>
    
        </div>
    );
}