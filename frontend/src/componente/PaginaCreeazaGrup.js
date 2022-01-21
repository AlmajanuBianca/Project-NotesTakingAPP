import '../PaginaCreeazaGrup.css';
import React from 'react';
import { useState, useEffect} from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { grupRoute, membruGrupRoute, userRoute } from '../ApiRoutes';
import { get,post } from '../Calls';

function PaginaCreeazaGrup() {

    const [user, setUser] = useState();
    const [needUpdate, setNeedUpdate] = useState(false);
    const [grupuri, setGrupuri] = useState();
    const [listaUseri, setListaUseri] = useState();
    const routerParams = useParams();
    const id = routerParams.id;
    const [optiuneAdauga, setOptiuneAdauga] = useState(false);


    const navigate=useNavigate();

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

        if (id)
            setOptiuneAdauga(true);
        else
            setOptiuneAdauga(false);
        
    }, [needUpdate]);
    
    const creeazaGrup = async () => {
        let maxID = -1;
        grupuri.forEach(grup => {
            if(grup.idGrup > maxID)
                maxID = grup.idGrup;
        });
        let listaEmail = [];
        let ok = true;
        let email1, email2, email3, email4, email5 = -1;
        if(document.getElementById("numeGrup").value != ""){
            if(document.getElementById("email1").value === "" && document.getElementById("email2").value === "" && document.getElementById("email3").value === "" 
                    && document.getElementById("email4").value === "" && document.getElementById("email5").value === "") {
                ok = false;
                alert("Va rugam sa introduceti macar 1 membru in grupul pe care doriti sa il creati!");
                }
            else {
                if(document.getElementById("email1").value != "") {
                    let emailColeg = document.getElementById("email1").value;
                    let existaEmail = false;
                    let cautat = listaUseri.find(utilizator=> utilizator.email === emailColeg);
                    if (typeof cautat !== 'undefined')
                        existaEmail = true;
                    else
                        existaEmail = false;
                    if(existaEmail) {
                        if(cautat.email!=user.email){
                            listaEmail.push(cautat.email);
                            email1 = cautat.email;
                        }
                        else {
                            ok = false;
                            alert("Email-ul introdus este email-ul dumneavoastra iar dumneavoastra sunteti automat introdus in grup ca administrator, va rugam reincercati");
                        }
                    }
                    else {
                        ok = false;
                        alert("Colegul pe care doriti sa il adaugati in grup nu exista, va rugam reintroduceti adresa de email");
                    }    
                }
                if(document.getElementById("email2").value != "") {
                    let emailColeg = document.getElementById("email2").value;
                    let existaEmail = false;
                    let cautat = listaUseri.find(utilizator=> utilizator.email === emailColeg);
                    if (typeof cautat !== 'undefined')
                        existaEmail = true;
                    else
                        existaEmail = false;
                    if(existaEmail) {
                        if(cautat.email!=user.email){
                            let repetitie = listaEmail.includes(cautat.email);
                            if(repetitie) {
                                ok = false;
                                alert("Acest email a mai fost introdus o data, va rugam reincercati");
                            }
                            else {
                                listaEmail.push(cautat.email);
                                email2 = cautat.email;
                            }
                        }
                        else {
                            ok = false;
                            alert("Email-ul introdus este email-ul dumneavoastra iar dumneavoastra sunteti automat introdus in grup ca administrator, va rugam reincercati");
                        }
                    }
                    else {
                        ok = false;
                        alert("Colegul pe care doriti sa il adaugati in grup nu exista, va rugam reintroduceti adresa de email");
                    }    
                }
                if(document.getElementById("email3").value != "") {
                    let emailColeg = document.getElementById("email3").value;
                    let existaEmail = false;
                    let cautat = listaUseri.find(utilizator=> utilizator.email === emailColeg);
                    if (typeof cautat !== 'undefined')
                        existaEmail = true;
                    else
                        existaEmail = false;
                    if(existaEmail) {
                        if(cautat.email!=user.email){
                            let repetitie = listaEmail.includes(cautat.email);
                            if(repetitie){
                                ok = false;
                                alert("Acest email a mai fost introdus o data, va rugam reincercati");
                            }
                            else {
                                listaEmail.push(cautat.email);
                                email3 = cautat.email;
                            }
                        }
                        else {
                            ok = false;
                            alert("Email-ul introdus este email-ul dumneavoastra iar dumneavoastra sunteti automat introdus in grup ca administrator, va rugam reincercati");
                        }
                    }
                    else {
                        ok = false;
                        alert("Colegul pe care doriti sa il adaugati in grup nu exista, va rugam reintroduceti adresa de email");
                    }    
                }
                if(document.getElementById("email4").value != "") {
                    let emailColeg = document.getElementById("email4").value;
                    let existaEmail = false;
                    let cautat = listaUseri.find(utilizator=> utilizator.email === emailColeg);
                    if (typeof cautat !== 'undefined')
                        existaEmail = true;
                    else
                        existaEmail = false;
                    if(existaEmail) {
                        if(cautat.email!=user.email){
                            let repetitie = listaEmail.includes(cautat.email);
                            if(repetitie){
                                ok = false;
                                alert("Acest email a mai fost introdus o data, va rugam reincercati");
                            }
                            else {
                                listaEmail.push(cautat.email);
                                email4 = cautat.email;
                            }
                        }
                        else {
                            ok = false;
                            alert("Email-ul introdus este email-ul dumneavoastra iar dumneavoastra sunteti automat introdus in grup ca administrator, va rugam reincercati");
                        }
                    }
                    else {
                        ok = false;
                        alert("Colegul pe care doriti sa il adaugati in grup nu exista, va rugam reintroduceti adresa de email");
                    }    
                }
                if(document.getElementById("email5").value != "") {
                    let emailColeg = document.getElementById("email5").value;
                    let existaEmail = false;
                    let cautat = listaUseri.find(utilizator=> utilizator.email === emailColeg);
                    if (typeof cautat !== 'undefined')
                        existaEmail = true;
                    else
                        existaEmail = false;
                    if(existaEmail) {
                        if(cautat.email!=user.email){
                            let repetitie = listaEmail.includes(cautat.email);
                            if(repetitie){
                                ok = false;
                                alert("Acest email a mai fost introdus o data, va rugam reincercati");
                            }
                            else {
                                listaEmail.push(cautat.email);
                                email5 = cautat.email;
                            }
                        }
                        else {
                            ok = false;
                            alert("Email-ul introdus este email-ul dumneavoastra iar dumneavoastra sunteti automat introdus in grup ca administrator, va rugam reincercati");
                        }
                    }
                    else {
                        ok = false;
                        alert("Colegul pe care doriti sa il adaugati in grup nu exista, va rugam reintroduceti adresa de email");
                    }    
                }
            }
        }
        else {
            ok = false;
            alert("Va rugam sa denumiti grupul pe care doriti sa il creati!");
        }

        if(ok)
        {
            const grupNou = {
                nume: document.getElementById("numeGrup").value,
                idCreator: user.idUser
            };
            await post(grupRoute, grupNou);
            console.log("grupul a fost creat cu succes cu id-ul "+(maxID+1));
            const membruCreator = {
                idUser: user.idUser,
                idGrup: maxID+1
            }
            await post(membruGrupRoute, membruCreator);
            console.log("membrul a fost adaugat cu succes cu email-ul "+user.email);
            if(email1!=-1 && typeof email1 !== 'undefined')
            {
                let userGasit = listaUseri.find(utilizator=> utilizator.email === email1);
                const membruNou = {
                    idUser: userGasit.idUser,
                    idGrup: maxID+1
                }
                await post(membruGrupRoute, membruNou);
                console.log("membrul a fost adaugat cu succes cu email-ul "+userGasit.email);
            }
            if(email2!=-1 && typeof email2 !== 'undefined')
            {
                let userGasit = listaUseri.find(utilizator=> utilizator.email === email2);
                const membruNou = {
                    idUser: userGasit.idUser,
                    idGrup: maxID+1
                }
                await post(membruGrupRoute, membruNou);
                console.log("membrul a fost adaugat cu succes cu email-ul "+userGasit.email);
            }
            if(email3!=-1 && typeof email3 !== 'undefined')
            {
                let userGasit = listaUseri.find(utilizator=> utilizator.email === email3);
                const membruNou = {
                    idUser: userGasit.idUser,
                    idGrup: maxID+1
                }
                await post(membruGrupRoute, membruNou);
                console.log("membrul a fost adaugat cu succes cu email-ul "+userGasit.email);
            }
            if(email4!=-1 && typeof email4 !== 'undefined')
            {
                let userGasit = listaUseri.find(utilizator=> utilizator.email === email4);
                const membruNou = {
                    idUser: userGasit.idUser,
                    idGrup: maxID+1
                }
                await post(membruGrupRoute, membruNou);
                console.log("membrul a fost adaugat cu succes cu email-ul "+userGasit.email);
            }
            if(email5!=-1 && typeof email5 !== 'undefined')
            {
                let userGasit = listaUseri.find(utilizator=> utilizator.email === email5);
                const membruNou = {
                    idUser: userGasit.idUser,
                    idGrup: maxID+1
                }
                await post(membruGrupRoute, membruNou);
                console.log("membrul a fost adaugat cu succes cu email-ul "+userGasit.email);
            }
            document.getElementById("numeGrup").value = "";
            document.getElementById("email1").value = "";
            document.getElementById("email2").value = "";
            document.getElementById("email3").value = "";
            document.getElementById("email4").value = "";
            document.getElementById("email5").value = "";
            navigate('/PaginaPrincipala');
        }
        else {
            alert("Va rugam sa respectati conditiile de creare a grupului!");
            document.getElementById("email1").value = "";
            document.getElementById("email2").value = "";
            document.getElementById("email3").value = "";
            document.getElementById("email4").value = "";
            document.getElementById("email5").value = "";
            document.getElementById("numeGrup").value = "";
        }
    }

    const adaugaMembri = async () => {
        let grupSelectat = await get(grupRoute, id);
        let listaMembriGrup = grupSelectat.Membri;
        let listaEmailMembri = listaMembriGrup.map(membru => membru.email);
        let ok = true;
        let email1, email2, email3, email4, email5 = -1;
        if(document.getElementById("Oemail1").value === "" && document.getElementById("Oemail2").value === "" && document.getElementById("Oemail3").value === "" 
                    && document.getElementById("Oemail4").value === "" && document.getElementById("Oemail5").value === "") {
            ok = false;
            alert("Va rugam sa introduceti macar un membru pe care doriti sa il adaugati in grup!");
        }
        else {
            if(document.getElementById("Oemail1").value != "") {
                // verific daca exista in baza de date
                let emailColeg = document.getElementById("Oemail1").value;
                let existaEmail = false;
                let cautat = listaUseri.find(utilizator=> utilizator.email === emailColeg);
                if (typeof cautat !== 'undefined')
                    existaEmail = true;
                else
                    existaEmail = false;
                if(existaEmail) {
                    // daca exista verific daca este email-ul administratorului, care oricum se afla in grup
                    if(cautat.email!=user.email){
                        // daca e diferit, verific daca exista deja in lista de membrii ai grupului
                        let repetitie = listaEmailMembri.includes(cautat.email);
                        if(repetitie) {
                            ok = false;
                            alert("Acest utilizator exista deja in grup, va rugam reincercati");
                        }
                        // daca nu exista in lista, il adaug in lista ca sa pot sa compar ulterior si celealte mail-uri
                        else {
                            listaEmailMembri.push(cautat.email);
                            email1 = cautat.email;
                        }
                    }
                    else {
                        ok = false;
                        alert("Email-ul introdus este email-ul dumneavoastra iar dumneavoastra faceti deja parte din grup ca administrator, va rugam reincercati");
                    }
                }
                else {
                    ok = false;
                    alert("Colegul pe care doriti sa il adaugati in grup nu exista in baza de date, va rugam reintroduceti adresa de email");
                }
            }
            if(document.getElementById("Oemail2").value != "") {
                // verific daca exista in baza de date
                let emailColeg = document.getElementById("Oemail2").value;
                let existaEmail = false;
                let cautat = listaUseri.find(utilizator=> utilizator.email === emailColeg);
                if (typeof cautat !== 'undefined')
                    existaEmail = true;
                else
                    existaEmail = false;
                if(existaEmail) {
                    // daca exista verific daca este email-ul administratorului, care oricum se afla in grup
                    if(cautat.email!=user.email){
                        // daca e diferit, verific daca exista deja in lista de membrii ai grupului
                        let repetitie = listaEmailMembri.includes(cautat.email);
                        if(repetitie) {
                            ok = false;
                            alert("Acest utilizator exista deja in grup, va rugam reincercati");
                        }
                        // daca nu exista in lista, il adaug in lista ca sa pot sa compar ulterior si celealte mail-uri
                        else {
                            listaEmailMembri.push(cautat.email);
                            email2 = cautat.email;
                        }
                    }
                    else {
                        ok = false;
                        alert("Email-ul introdus este email-ul dumneavoastra iar dumneavoastra faceti deja parte din grup ca administrator, va rugam reincercati");
                    }
                }
                else {
                    ok = false;
                    alert("Colegul pe care doriti sa il adaugati in grup nu exista in baza de date, va rugam reintroduceti adresa de email");
                }
            }
            if(document.getElementById("Oemail3").value != "") {
                // verific daca exista in baza de date
                let emailColeg = document.getElementById("Oemail3").value;
                let existaEmail = false;
                let cautat = listaUseri.find(utilizator=> utilizator.email === emailColeg);
                if (typeof cautat !== 'undefined')
                    existaEmail = true;
                else
                    existaEmail = false;
                if(existaEmail) {
                    // daca exista verific daca este email-ul administratorului, care oricum se afla in grup
                    if(cautat.email!=user.email){
                        // daca e diferit, verific daca exista deja in lista de membrii ai grupului
                        let repetitie = listaEmailMembri.includes(cautat.email);
                        if(repetitie) {
                            ok = false;
                            alert("Acest utilizator exista deja in grup, va rugam reincercati");
                        }
                        // daca nu exista in lista, il adaug in lista ca sa pot sa compar ulterior si celealte mail-uri
                        else {
                            listaEmailMembri.push(cautat.email);
                            email3 = cautat.email;
                        }
                    }
                    else {
                        ok = false;
                        alert("Email-ul introdus este email-ul dumneavoastra iar dumneavoastra faceti deja parte din grup ca administrator, va rugam reincercati");
                    }
                }
                else {
                    ok = false;
                    alert("Colegul pe care doriti sa il adaugati in grup nu exista in baza de date, va rugam reintroduceti adresa de email");
                }
            }
            if(document.getElementById("Oemail4").value != "") {
                // verific daca exista in baza de date
                let emailColeg = document.getElementById("Oemail4").value;
                let existaEmail = false;
                let cautat = listaUseri.find(utilizator=> utilizator.email === emailColeg);
                if (typeof cautat !== 'undefined')
                    existaEmail = true;
                else
                    existaEmail = false;
                if(existaEmail) {
                    // daca exista verific daca este email-ul administratorului, care oricum se afla in grup
                    if(cautat.email!=user.email){
                        // daca e diferit, verific daca exista deja in lista de membrii ai grupului
                        let repetitie = listaEmailMembri.includes(cautat.email);
                        if(repetitie) {
                            ok = false;
                            alert("Acest utilizator exista deja in grup, va rugam reincercati");
                        }
                        // daca nu exista in lista, il adaug in lista ca sa pot sa compar ulterior si celealte mail-uri
                        else {
                            listaEmailMembri.push(cautat.email);
                            email4 = cautat.email;
                        }
                    }
                    else {
                        ok = false;
                        alert("Email-ul introdus este email-ul dumneavoastra iar dumneavoastra faceti deja parte din grup ca administrator, va rugam reincercati");
                    }
                }
                else {
                    ok = false;
                    alert("Colegul pe care doriti sa il adaugati in grup nu exista in baza de date, va rugam reintroduceti adresa de email");
                }
            }
            if(document.getElementById("Oemail5").value != "") {
                // verific daca exista in baza de date
                let emailColeg = document.getElementById("Oemail5").value;
                let existaEmail = false;
                let cautat = listaUseri.find(utilizator=> utilizator.email === emailColeg);
                if (typeof cautat !== 'undefined')
                    existaEmail = true;
                else
                    existaEmail = false;
                if(existaEmail) {
                    // daca exista verific daca este email-ul administratorului, care oricum se afla in grup
                    if(cautat.email!=user.email){
                        // daca e diferit, verific daca exista deja in lista de membrii ai grupului
                        let repetitie = listaEmailMembri.includes(cautat.email);
                        if(repetitie) {
                            ok = false;
                            alert("Acest utilizator exista deja in grup, va rugam reincercati");
                        }
                        // daca nu exista in lista, il adaug in lista ca sa pot sa compar ulterior si celealte mail-uri
                        else {
                            listaEmailMembri.push(cautat.email);
                            email5 = cautat.email;
                        }
                    }
                    else {
                        ok = false;
                        alert("Email-ul introdus este email-ul dumneavoastra iar dumneavoastra faceti deja parte din grup ca administrator, va rugam reincercati");
                    }
                }
                else {
                    ok = false;
                    alert("Colegul pe care doriti sa il adaugati in grup nu exista in baza de date, va rugam reintroduceti adresa de email");
                }
            }
        }
        if(ok)
        {
            if(email1!=-1 && typeof email1 !== 'undefined')
            {
                let userGasit = listaUseri.find(utilizator=> utilizator.email === email1);
                const membruNou = {
                    idUser: userGasit.idUser,
                    idGrup: id
                }
                await post(membruGrupRoute, membruNou);
                console.log("membrul a fost adaugat cu succes cu email-ul "+userGasit.email);
            }
            if(email2!=-1 && typeof email2 !== 'undefined')
            {
                let userGasit = listaUseri.find(utilizator=> utilizator.email === email2);
                const membruNou = {
                    idUser: userGasit.idUser,
                    idGrup: id
                }
                await post(membruGrupRoute, membruNou);
                console.log("membrul a fost adaugat cu succes cu email-ul "+userGasit.email);
            }
            if(email3!=-1 && typeof email3 !== 'undefined')
            {
                let userGasit = listaUseri.find(utilizator=> utilizator.email === email3);
                const membruNou = {
                    idUser: userGasit.idUser,
                    idGrup: id
                }
                await post(membruGrupRoute, membruNou);
                console.log("membrul a fost adaugat cu succes cu email-ul "+userGasit.email);
            }
            if(email4!=-1 && typeof email4 !== 'undefined')
            {
                let userGasit = listaUseri.find(utilizator=> utilizator.email === email4);
                const membruNou = {
                    idUser: userGasit.idUser,
                    idGrup: id
                }
                await post(membruGrupRoute, membruNou);
                console.log("membrul a fost adaugat cu succes cu email-ul "+userGasit.email);
            }
            if(email5!=-1 && typeof email5 !== 'undefined')
            {
                let userGasit = listaUseri.find(utilizator=> utilizator.email === email5);
                const membruNou = {
                    idUser: userGasit.idUser,
                    idGrup: id
                }
                await post(membruGrupRoute, membruNou);
                console.log("membrul a fost adaugat cu succes cu email-ul "+userGasit.email);
            }
            document.getElementById("Oemail1").value = "";
            document.getElementById("Oemail2").value = "";
            document.getElementById("Oemail3").value = "";
            document.getElementById("Oemail4").value = "";
            document.getElementById("Oemail5").value = "";
            alert("Toti utilizatorii au fost adaugati cu succes in grupul cu id-ul "+id);
        }
        else {
            alert("Va rugam sa respectati conditiile de creare a grupului!");
            document.getElementById("Oemail1").value = "";
            document.getElementById("Oemail2").value = "";
            document.getElementById("Oemail3").value = "";
            document.getElementById("Oemail4").value = "";
            document.getElementById("Oemail5").value = "";
        }
    }

    if(optiuneAdauga) return <div className="paginaCreareGrup">
        <div>
           <input type="text" id="idGrup" value={id} disabled></input>
        <input type="text" id="Oemail1" placeholder="Persoana 1"></input>
        <input type="text" id="Oemail2" placeholder="Persoana 2"></input>
        <input type="text" id="Oemail3" placeholder="Persoana 3"></input>
        <input type="text" id="Oemail4" placeholder="Persoana 4"></input>
        <input type="text" id="Oemail5" placeholder="Persoana 5"></input> 
        </div>
        
        <br></br>
        <div>
          <button id="adaugaMembri" onClick={() => adaugaMembri()}>Adauga membri noi</button>

        </div>
        
    </div>

    else return <div className="paginaCreareGrup">
        <div id="input">
        <input  type="text" id="numeGrup" placeholder="Numele grupului"></input>
        
        <input type="text" id="email1" placeholder="  Persoana 1"></input>
        <input type="text" id="email2" placeholder="Persoana 2"></input>
        <input type="text" id="email3" placeholder="Persoana 3"></input>
        <input type="text" id="email4" placeholder="Persoana 4"></input>
        <input type="text" id="email5" placeholder="Persoana 5"></input>
        </div>
        <br></br>
        <div>
          <button id="creeazaGrup" onClick={() => creeazaGrup()}>Creeaza grup nou</button>  
        
        </div>
        
    </div>
}

export default PaginaCreeazaGrup;