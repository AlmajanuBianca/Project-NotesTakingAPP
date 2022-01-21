import React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { useState, useEffect} from "react";
import {IconButton} from '@material-ui/core';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import uuid from "react-uuid";
import { grupRoute, notitaGrupRoute, notitaRoute, userRoute } from '../ApiRoutes';
import { get,post } from '../Calls';

const NotitaOrganizata = ({idNotitaDeEditat, inCursDeVizualizare}) => {
    const [user, setUser] = useState();
    const [needUpdate, setNeedUpdate] = useState(false);
    const [grupuri, setGrupuri] = useState();
    const [listaUseri, setListaUseri] = useState();

    useEffect(async() => {
        let utilizator=JSON.parse(localStorage.getItem("ID"));
        let user = await get(userRoute, utilizator.idUser);
        let listaGrupuri = await get(grupRoute);
        let lista = await get(userRoute);
        if(Object.keys(user).length === 0)
          console.log("Nu avem user");
        else{
          setUser(user);
          setGrupuri(listaGrupuri);
          setListaUseri(lista);
        }
      }, [needUpdate]);

    const adaugaNotita = async () => {
        if(document.getElementById("grup").value != ""){
            let IDgrup = document.getElementById("grup").value;
            let existaGrup = false;
            let cautat = grupuri.find(grup=> grup.idGrup === parseInt(IDgrup));
            if (typeof cautat !== 'undefined')
                existaGrup = true;
            else
                existaGrup = false;
            if(existaGrup) {
                let faceParteDinGrup = user.Grupuri.find(grup=> grup.idGrup === parseInt(IDgrup));
                if(faceParteDinGrup) {
                    let notitaExistenta = cautat.Notite.find(notita=> notita.idNotita===idNotitaDeEditat.idNotita && notita.idUser === idNotitaDeEditat.idUser);
                    if(typeof notitaExistenta !== 'undefined')
                        alert("Notita pe care doriti sa o adaugati face parte deja din acest grup");
                    else {
                        const notitaGrupNoua = {
                            idNotita: idNotitaDeEditat.idNotita,
                            idGrup: cautat.idGrup
                        };
                        await post(notitaGrupRoute, notitaGrupNoua);
                        alert("Notita a fost adaugata cu succes");
                        document.getElementById("grup").value = "";
                    }
                }
                else alert("Nu faceti parte din grupul in care doriti sa aduagati notita!");
            }
            else alert("Grupul in care doriti sa adaugati notita nu exista, va rugam reintroduceti id-ul grupului");
        }
        if(document.getElementById("coleg").value != ""){
            let emailColeg = document.getElementById("coleg").value;
            let existaEmail = false;
            let cautat = listaUseri.find(utilizator=> utilizator.email === emailColeg);
            if (typeof cautat !== 'undefined')
                existaEmail = true;
            else
                existaEmail = false;
            if(existaEmail) {
                if(cautat.email!=user.email){
                    const notitaNoua = {
                        idNotita: uuid(),
                        idUser: cautat.idUser,
                        text: idNotitaDeEditat.text,
                        titlu: idNotitaDeEditat.titlu,
                        dataIncarcare: Date.now(),
                        tipActivitate: idNotitaDeEditat.tipActivitate,
                        materie: idNotitaDeEditat.materie
                    };
                    await post(notitaRoute+"/"+cautat.idUser, notitaNoua);
                    alert("Notita a fost partajata cu succes");
                    document.getElementById("coleg").value = "";
                }
                else alert("Email-ul introdus este email-ul dumneavoastra, va rugam reincercati");
            }
            else alert("Colegul caruia doriti sa ii trimiteti notita nu exista, va rugam reintroduceti adresa de email");
        }
        setNeedUpdate(!needUpdate);
      };

    // Daca nu am dat click pe o notita pentru a o edita, atunci nu vom avea componenta Notita afisata
    if (!inCursDeVizualizare) return <div className="nimic-de-vizualizat">Click pe o notita pentru a o vizualiza</div>;

    // Daca nu am dat click pe o notita pentru a o vizualiza, atunci nu vom avea componenta Notita afisata
    return <div className="notita">
        <div className="notita-inputuri">
            <input type="text" id="grup" placeholder="ID grup"></input>
            <input type="text" id="coleg" placeholder="EMAIL coleg"></input>
            <IconButton onClick={() => adaugaNotita()}>
                <FileUploadIcon color="secondary"/>
            </IconButton>
        </div>
        <div className="notita-vizualizare">
            <h2 className="notita-vizualizare-titlu">{idNotitaDeEditat.titlu}</h2> 
            <ReactMarkdown className="notita-vizualizare-markdown">{idNotitaDeEditat.text}</ReactMarkdown> 
        </div>
    </div>
}

// Propsul idNotitaDeEditat isi schimba tipul, aici initial este undefined (pentru ca inca nu a fost incarcat un obiect)
//, iar dupa ce dau click pe o notita pentru a o edita, se transforma in object
NotitaOrganizata.propTypes = {
    inCursDeVizualizare: PropTypes.bool.isRequired
}

export default NotitaOrganizata;