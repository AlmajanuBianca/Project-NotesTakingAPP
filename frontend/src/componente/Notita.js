import React from 'react';
import {IconButton} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import {put} from '../Calls';
import {notitaRoute} from '../ApiRoutes';
import { styled } from '@mui/material/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';


const Notita = ({idNotitaDeEditat, editareNotita, inCursDeEditare, inCursDeVizualizare, user}) => {
const [open,setOpen]=useState(false);

    const Input = styled('input')({
        display: 'none',
      });

    //   const [images,setImages]=useState([]);
    //   const [imageURLs,setImageURLs]=useState([]);
      
    //   useEffect(()=>{
    //       if(images.length<1) return;
    //       const newImageUrls=[];
    //       images.forEach(image=>newImageUrls.push(URL.createObjectURL(image)));
    //       setImageURLs(newImageUrls);
    //   },[images]);
  
    //   function onImageChange(e){
    //       setImages([...e.target.files]);
    //   }

      
    // Functia pentru editarea notitei care se afla in modul de idNotitaDeEditat si primeste ca parametri
    // o cheie (care va fi pe rand titlul, tipul activitatii, materia, textul etc) si o valoare care este
    // valoarea din campul respectiv cheii dar dupa modificare
    const editare = (cheie, valoare) => {
        editareNotita({
        // asta este ca toate celelalte campuri sa nu se stearga in momentul in care modificam
        ...idNotitaDeEditat,
        [cheie]: valoare,
        dataIncarcare: Date.now()
      });
    };

    // Functia pentru salvarea notitei in baza de date
    const salvare = async() => {
        let titluNotita = document.getElementById("titlu").value;
        if (titluNotita==="")
            titluNotita = "Notita neintitulata";
        
        let tipActivitateNotita = document.getElementById("tipActivitate").value;
        if (tipActivitateNotita==="")
            tipActivitateNotita = "Curs";

        let materieNotita = document.getElementById("materie").value;
            if (materieNotita==="")
                materieNotita = "Neintitulat";

        let notitaDeSalvat = {
            idNotita: idNotitaDeEditat.idNotita,
            idUser: user,
            text: document.getElementById("text").value,
            titlu: titluNotita,
            dataIncarcare: Date.now(),
            tipActivitate: tipActivitateNotita,
            materie: materieNotita,
            ...idNotitaDeEditat
        }
        console.log(notitaDeSalvat);
       
        await put(notitaRoute, idNotitaDeEditat.idNotita, notitaDeSalvat);

        setOpen(true);
       setTimeout(setOpen,2000,false);
    }

    // Daca nu am dat click pe o notita pentru a o vizualiza, atunci nu vom avea componenta Notita afisata
    if (inCursDeVizualizare) return <div className="notita-vizualizare"> <h2 className="notita-vizualizare-titlu">{idNotitaDeEditat.titlu}</h2> <ReactMarkdown className="notita-vizualizare-markdown">{idNotitaDeEditat.text}</ReactMarkdown> </div>;

    // Daca nu am dat click pe o notita pentru a o edita, atunci nu vom avea componenta Notita afisata
    if (!inCursDeEditare) return <div className="nimic-de-vizualizat">Click pe o notita pentru a o vizualiza</div>;

   
   

    return <div className="notita">
        <div className="notita-editare">
            <div className="notita-editare-inputuri">
                <IconButton color="primary" onClick={() => salvare()}>
                    <SaveIcon/>
                </IconButton>

                <input type="text" id="titlu" value={idNotitaDeEditat.titlu} 
                    onChange={(e) => editare("titlu", e.target.value)}></input>
                <input type="text" id="tipActivitate" value={idNotitaDeEditat.tipActivitate}
                    onChange={(e) => editare("tipActivitate", e.target.value)}></input>
                <input type="text" id="materie" value={idNotitaDeEditat.materie}
                    onChange={(e) => editare("materie", e.target.value)}></input>
                
            </div>
            <div className="textSiPoza">
            <textarea id="text" placeholder="Incepe sa iti scrii aici notita..." value={idNotitaDeEditat.text}
                onChange={(e) => editare("text", e.target.value)}></textarea>
   
            </div>
            
        </div>
        
        <div className="notita-previzualizare">
            <h2 className="notita-previzualizare-titlu">{idNotitaDeEditat.titlu}</h2>
            <ReactMarkdown className="notita-previzualizare-markdown">{idNotitaDeEditat.text}
            </ReactMarkdown>
        </div>
         <Snackbar open={open} autoHideDuration={6000}>
          <Alert  severity="success" sx={{ width: '100%' }}>
          Notita salvata cu succes
         </Alert>
         </Snackbar>
        
    </div>
}

// Propsul idNotitaDeEditat isi schimba tipul, aici initial este undefined (pentru ca inca nu a fost incarcat un obiect)
//, iar dupa ce dau click pe o notita pentru a o edita, se transforma in object
Notita.propTypes = {
    inCursDeEditare: PropTypes.bool.isRequired,
    editareNotita: PropTypes.func.isRequired
}

export default Notita;