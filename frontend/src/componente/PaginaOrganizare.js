import '../PaginaOrganizare.css';
import Organizare from './Organizare';
import NotitaOrganizata from './NotitaOrganizata';
import { useState, useEffect} from "react";
import {get} from '../Calls';
import { useNavigate } from 'react-router-dom';
import {userRoute} from '../ApiRoutes';

function PaginaOrganizare() {
  const navigate = useNavigate();
  // Acest state reprezinta lista de notite pe care o vom afisa in partea din stanga de jos
  // State-ul pe care il initializam cu un array gol daca nu exista notite in storage care sa fie afisate
  // Tot acest state va fi primit de catre componenta Organizare ca prop (ca sa aiba acces la lista de notite)
  const [notite, setNotite] = useState([]);
  // In acest state se va afla id-ul userului
  const [user, setUser] = useState();
  const [needUpdate, setNeedUpdate] = useState(false);
  // Acest state este pentru a edita notita si va prelua id-ul notitei
  const [idNotitaDeEditat, setIdNotitaDeEditat] = useState("gol");
  // Acest state este pentru a afla care notita este in curs de vizualizare
  const [inCursDeVizualizare, setInCursDeVizualizare] = useState(false);

  // Facem un useEffect caruia ii dam o functie asincrona care sa preia din baza de date userul nostru, 
  // am hardcodat momentan id-ul userului de la care sa preia notitele
  useEffect(async() => {
    let utilizator=JSON.parse(localStorage.getItem("ID"));
    let user = await get(userRoute, utilizator.idUser);
    let organizare=JSON.parse(localStorage.getItem("organizare"));
    if(Object.keys(user).length === 0)
      console.log("Nu avem user");
    else{
      setUser(user.idUser);
      let data = user.Notite;
      let rezultat = [];

      if (data.length === 0)
        console.log("Nu avem notite");
      else {
        if(organizare.curs === true) {
          if(rezultat.length === 0) {
            rezultat = data.filter(notita => notita.tipActivitate.toUpperCase() === "CURS"); 
            console.log(data.filter(notita => notita.tipActivitate.toUpperCase() === "CURS"));}
          else {
            rezultat = rezultat.filter(notita => notita.tipActivitate.toUpperCase() === "CURS"); 
            console.log(rezultat.filter(notita => notita.tipActivitate.toUpperCase() === "CURS"));}
        }
        if(organizare.seminar === true) {
          if(rezultat.length === 0) {
            rezultat = data.filter(notita => notita.tipActivitate.toUpperCase() === "SEMINAR");
            console.log(data.filter(notita => notita.tipActivitate.toUpperCase() === "SEMINAR"));}
          else {
            rezultat = rezultat.filter(notita => notita.tipActivitate.toUpperCase() === "SEMINAR"); 
            console.log(rezultat.filter(notita => notita.tipActivitate.toUpperCase() === "SEMINAR"));}
        }
        if(organizare.materie != -1) {
          if(rezultat.length === 0) {
            rezultat = data.filter(notita => notita.materie.toUpperCase() == organizare.materie.toUpperCase()); 
            console.log(data.filter(notita => notita.materie.toUpperCase() == organizare.materie.toUpperCase()));}
          else {
            rezultat = rezultat.filter(notita => notita.materie.toUpperCase() == organizare.materie.toUpperCase()); 
            console.log(rezultat.filter(notita => notita.materie.toUpperCase() == organizare.materie.toUpperCase()));}
        }
        if(organizare.cuvinteCheie != -1) {
          if(rezultat.length === 0) {
            rezultat = data.filter(notita => notita.text.includes(organizare.cuvinteCheie) == true);
            console.log(data.filter(notita => notita.text.includes(organizare.cuvinteCheie) == true)); }
          else {
            rezultat = rezultat.filter(notita => notita.text.includes(organizare.cuvinteCheie) == true); 
            console.log(rezultat.filter(notita => notita.text.includes(organizare.cuvinteCheie) == true));}
        }
        if(organizare.zi != -1) {
          if(rezultat.length === 0) {
            rezultat = data.filter(notita => new Date(notita.dataIncarcare).getDate() == parseInt(organizare.zi)); 
            console.log(data.filter(notita => new Date(notita.dataIncarcare).getDate() == parseInt(organizare.zi)));}
          else {
            rezultat = rezultat.filter(notita => new Date(notita.dataIncarcare).getDate() == parseInt(organizare.zi)); 
            console.log(rezultat.filter(notita => new Date(notita.dataIncarcare).getDate() == parseInt(organizare.zi)));}
        }
        if(organizare.luna != -1) {
          if(rezultat.length === 0) {
            rezultat = data.filter(notita => (new Date(notita.dataIncarcare).getMonth() + 1) == parseInt(organizare.luna)); 
            console.log(data.filter(notita => (new Date(notita.dataIncarcare).getMonth() + 1) == parseInt(organizare.luna)));}
          else {
            rezultat = rezultat.filter(notita => (new Date(notita.dataIncarcare).getMonth() + 1) == parseInt(organizare.luna)); 
            console.log(rezultat.filter(notita => (new Date(notita.dataIncarcare).getMonth() + 1) == parseInt(organizare.luna)));}
        }
        if(organizare.an != -1) {
          if(rezultat.length === 0) {
            rezultat = data.filter(notita => new Date(notita.dataIncarcare).getFullYear() == parseInt(organizare.an)); 
            console.log(data.filter(notita => new Date(notita.dataIncarcare).getFullYear() == parseInt(organizare.an)));}
          else {
            rezultat = rezultat.filter(notita => new Date(notita.dataIncarcare).getFullYear() == parseInt(organizare.an)); 
            console.log(rezultat.filter(notita => new Date(notita.dataIncarcare).getFullYear() == parseInt(organizare.an)));}
        }
      }
      if(rezultat.length != 0)
        setNotite(rezultat);
      else
        setNotite(data);
    }
  }, [needUpdate]);

  // Functia care gaseste ce notita din lista este vizualizata in functie de id-ul din state-ul idNotitaDeEditat
  // si intoarce intreaga notita pentru a fi previzualizata in partea dreaprta a paginii
  const getNotitaVizualizata = () => {
    // singura notita care va returna true in functia find va fi cea pe care o cautam noi de fapt
    // si astfel din tot array-ul de notite, vom returna fix notita cautata
    return notite.find((notita) => notita.idNotita === idNotitaDeEditat);
  };

  const acasa = () => {
    navigate("/PaginaPrincipala");
  }

  return (
    <div className="PaginaOrganizare">
      <Organizare notite={notite} idNotitaDeEditat ={idNotitaDeEditat} acasa={acasa}
        setIdNotitaDeEditat={setIdNotitaDeEditat} setInCursDeVizualizare={setInCursDeVizualizare}/>
      <NotitaOrganizata idNotitaDeEditat ={getNotitaVizualizata()} inCursDeVizualizare={inCursDeVizualizare}/>
    </div>
  );
}

export default PaginaOrganizare;