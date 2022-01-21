import '../PaginaNotite.css';
import ListaNotite from './ListaNotite';
import Notita from './Notita';
import { useState, useEffect} from "react";
import uuid from "react-uuid";
import { useNavigate } from 'react-router-dom';
import {post, get, remove} from '../Calls';
import {userRoute, notitaRoute} from '../ApiRoutes';

function PaginaNotite() {
  const navigate = useNavigate();
  // Acest state reprezinta lista de notite pe care o vom afisa in partea din stanga de jos
  // State-ul pe care il initializam cu un array gol daca nu exista notite in storage care sa fie afisate
  // Tot acest state va fi primit de catre componenta ListaNotite ca prop (ca sa aiba acces la lista de notite)
  const [notite, setNotite] = useState([]);
  // In acest state se va afla id-ul userului
  const [user, setUser] = useState();
  const [needUpdate, setNeedUpdate] = useState(false);
  // Acest state este pentru a edita notita si va prelua id-ul notitei
  const [idNotitaDeEditat, setIdNotitaDeEditat] = useState("gol");
  // Acest state este pentru a afla care notita este in curs de editare
  const [inCursDeEditare, setInCursDeEditare] = useState(false);
  // Acest state este pentru a afla care notita este in curs de vizualizare
  const [inCursDeVizualizare, setInCursDeVizualizare] = useState(false);

  // Facem un useEffect caruia ii dam o functie asincrona care sa preia din baza de date userul nostru, 
  // am hardcodat momentan id-ul userului de la care sa preia notitele
  useEffect(async() => {
    let utilizator=JSON.parse(localStorage.getItem("ID"));
    let user = await get(userRoute, utilizator.idUser);
    if(Object.keys(user).length === 0)
      console.log("Nu avem user");
    else{
      setUser(user.idUser);
      let data = user.Notite;

      if (data.length === 0)
        console.log("Nu avem notite");
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

  // Functia care adauga notitele, pe care o transmitem ca props catre componenta de ListaNotite
  // Fiecare notita va avea un id unic, random creat cu ajutorul uuid
  const adaugaNotita = async () => {
    const notitaNoua = {
      idNotita: uuid(),
      idUser: user,
      text: "Notita goala",
      titlu: "Notita neintitulata",
      dataIncarcare: Date.now(),
      tipActivitate: "Curs",
      materie: "Neintitulat"
    };

    // In setter, cream un array nou, care va contine notita noua adaugata si apoi ia toate celelalte obiecte
    // din vechiul array (notite) si le adauga si pe ele aici, in noul array
    setNotite([notitaNoua, ...notite]);
    
    // Daca nu exista notita in baza de date o creeaza, daca exista, atunci o modifica
    await post(notitaRoute+"/"+user, notitaNoua);
    setNeedUpdate(!needUpdate);
  };

  // Functia care sterge notitele, pe care o transmitem ca props catre componenta de ListaNotite
  const stergeNotita = async (idNotitaDeSters) => {
    // Cauta cu ajutorul lui filter in lista de notite existente iar pentru fiecare notita, verifica daca id-ul este 
    // diferit fata de id-ul pe care vrem sa il stergem, iar daca este diferit, atunci notita ramane, si returneaza true
    // dar daca este la fel cu id-ul, filterul returneaza false si notita se sterge
    setNotite(notite.filter((notita) => notita.idNotita !== idNotitaDeSters));
    await remove(notitaRoute, idNotitaDeSters);
    setNeedUpdate(!needUpdate);
  };

  // Functia care editeaza notita selectata
  const editareNotita = (notitaDeEditat) => {
    // Pentru fiecare notita, map va verifica daca notita la care a ajuns parcurgerea are acelasi ID cu notita
    // pe care o vizualizam si vrem sa o editam, si atunci o inlocuieste cu notita editata, 
    // iar daca nu, atunci nu face nicio modificare
    const notiteEditate = notite.map((notita) => {
      if (notita.idNotita === idNotitaDeEditat) {
        return notitaDeEditat;
      }
      return notita;
    });
    // Aici actualizeaza array-ul de notite cu noul array, in care am editat o notita
    setNotite(notiteEditate);
  };

  return (
    <div className="PaginaNotite">
      <ListaNotite notite={notite} adaugaNotita={adaugaNotita} stergeNotita={stergeNotita} 
       idNotitaDeEditat ={idNotitaDeEditat} setIdNotitaDeEditat={setIdNotitaDeEditat}
       setInCursDeEditare={setInCursDeEditare} setInCursDeVizualizare={setInCursDeVizualizare}
       acasa={acasa}/>

      <Notita idNotitaDeEditat ={getNotitaVizualizata()} editareNotita={editareNotita}
      inCursDeEditare={inCursDeEditare} inCursDeVizualizare={inCursDeVizualizare}
      user={user}/>
    </div>
  );
}

export default PaginaNotite;