import '../PaginaOrganizare.css';
import OrganizareGrup from './OrganizareGrup';
import { useState, useEffect} from "react";
import {get,remove} from '../Calls';
import { useNavigate, useParams } from 'react-router-dom';
import {grupRoute, notitaGrupRoute, userRoute} from '../ApiRoutes';
import NotitaGrup from './NotitaGrup';

function PaginaGrup() {
  const navigate = useNavigate();
  // Acest state reprezinta lista de notite pe care o vom afisa in partea din stanga de jos
  // State-ul pe care il initializam cu un array gol daca nu exista notite in storage care sa fie afisate
  // Tot acest state va fi primit de catre componenta Organizare ca prop (ca sa aiba acces la lista de notite)
  const [notite, setNotite] = useState([]);
  const [notiteUser, setNotiteUser] = useState([]);
  // In acest state se va afla id-ul userului
  const [user, setUser] = useState();
  const [needUpdate, setNeedUpdate] = useState(false);
  // Acest state este pentru a edita notita si va prelua id-ul notitei
  const [idNotitaDeEditat, setIdNotitaDeEditat] = useState("gol");
  // Acest state este pentru a afla care notita este in curs de vizualizare
  const [inCursDeVizualizare, setInCursDeVizualizare] = useState(false);
  const routerParams = useParams();
  const id = routerParams.id;

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
        setNotiteUser(data);
    }
    
    if (!id)
      return;

    let data = await get(grupRoute, id);
    setNotite(data.Notite);
  }, [needUpdate]);

  // Functia care gaseste ce notita din lista este vizualizata in functie de id-ul din state-ul idNotitaDeEditat
  // si intoarce intreaga notita pentru a fi previzualizata in partea dreaprta a paginii
  const getNotitaVizualizata = () => {
    // singura notita care va returna true in functia find va fi cea pe care o cautam noi de fapt
    // si astfel din tot array-ul de notite, vom returna fix notita cautata
    return notite.find((notita) => notita.idNotita === idNotitaDeEditat);
  };

  const stergeNotita = async (idNotitaDeSters) => {
    let notitaProprie = false;
    let cautat = notiteUser.find(notita=> notita.idNotita === idNotitaDeSters);
    if (typeof cautat !== 'undefined')
      notitaProprie = true;
    else
      notitaProprie = false;
    if(notitaProprie) {
      setNotite(notite.filter((notita) => notita.idNotita !== idNotitaDeSters));
      // http://localhost:8000/api/notitaGrup/?idGrup=1&idNotita=notita1user1
      await remove(notitaGrupRoute, '?idGrup='+id+'&idNotita='+idNotitaDeSters);
      setNeedUpdate(!needUpdate);
    }
    else alert("Nu puteti sterge aceasta notita deoarece nu va apartine, puteti sterge doar notitele pe care dumneavoastra le-ati adaugat in grup");
  };

  const acasa = () => {
    navigate("/PaginaPrincipala");
  }

  return (
    <div className="PaginaGrup">
      <OrganizareGrup notite={notite} idNotitaDeEditat ={idNotitaDeEditat} 
        setIdNotitaDeEditat={setIdNotitaDeEditat} setInCursDeVizualizare={setInCursDeVizualizare}
        acasa={acasa} stergeNotita={stergeNotita}/>
      <NotitaGrup idNotitaDeEditat ={getNotitaVizualizata()} inCursDeVizualizare={inCursDeVizualizare}/>
    </div>
  );
}

export default PaginaGrup;