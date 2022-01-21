import { Button } from '@mui/material';
import React from 'react'
import ReactPlayer from 'react-player'
import {useState,useEffect} from 'react';
import Notita from './Notita';
import ListaNotite from './ListaNotite';
import ReactMarkdown from 'react-markdown';
import '../Continut.css';
import { userRoute } from '../ApiRoutes';
import { notitaRoute } from '../ApiRoutes';
import {put,get} from '../Calls';

export default function ConinutIntegrat(){

    const [youtubeVideo,setyoutubeVideo]=useState('');

    const [youtubeURL,setyoutubeURL]=useState('');

    let idNotita=JSON.parse(localStorage.getItem("IDNotita"));
    let text=JSON.parse(localStorage.getItem("Text"));

      const salvare=async()=>{

        let notita=await get(notitaRoute,idNotita);
        notita.text=document.querySelector('textarea').value;
        await put(notitaRoute, idNotita, notita);
      }
const handleYTChange=(e)=>{
    setyoutubeVideo(e.target.value);
}

const handleYTSubmit=(e)=>{
    e.preventDefault();
    setyoutubeURL(youtubeVideo);
}

    return(
        <div>
             <div>
               <textarea id="cont" defaultValue={text}  onChange={salvare}></textarea>
            </div> 
            <div>
            
            <form className="form-group form" onSubmit={handleYTSubmit}>
                <input id="text" type='text' 
                placeholder="Introdu URL" required onChange={handleYTChange}>
                </input>
                <Button type='submit' variant="contained">UPLOAD</Button>
            </form>
  
                <br></br>
            <ReactPlayer  url={youtubeURL} controls />
    
            
            </div>

        </div>
    );
}