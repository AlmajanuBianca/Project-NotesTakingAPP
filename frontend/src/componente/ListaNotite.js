import React from 'react';
import {IconButton} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import HomeIcon from '@material-ui/icons/Home';
import ViewArray from '@material-ui/icons/ViewArray';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PostAddIcon from '@mui/icons-material/PostAdd';



// componenta ListaNotite care include ListaNotite notitelor dar si afisarea listei de notite
// (toata partea din stanga)
const ListaNotite = ({ notite, adaugaNotita, stergeNotita, idNotitaDeEditat, setIdNotitaDeEditat,
    setInCursDeEditare, setInCursDeVizualizare}) => {
    // Cateva stiluri pentru iconite
    const styles = {
        iconitaDelete: {
            width: "10px",
            height: "10px",
            padding: "10px",
        },
        iconitaAdd: {
            width: "20px",
            height: "20px",
            padding: "5px",
            margin: "25px 25px 0px 0px"
        }
    }

    // Facem un array care sa fie ordonat dupa data de incarcare a notitei, care se modifica atunci cand editam notita
    // astfel incat, cea mai recenta notita sa fie prima (ordinea descrescatoare)
    const notiteSortateDescrescator = notite.sort((a, b) => b.dataIncarcare - a.dataIncarcare);
    const navigate=useNavigate();

    const upload=()=>{
        const notes=notite.map((notita)=>{
            if(notita.idNotita===idNotitaDeEditat){
                localStorage.setItem("IDNotita",JSON.stringify(notita.idNotita));
                localStorage.setItem("Text",JSON.stringify(notita.text));
                 navigate('/Continut');
            }
        })
    }

    const pdfUpload=()=>{
        const notes=notite.map((notita)=>{
            if(notita.idNotita===idNotitaDeEditat){
                localStorage.setItem("IDNotita",JSON.stringify(notita.idNotita));
                localStorage.setItem("Text",JSON.stringify(notita.text));

            
                 navigate('/PdfUpload');
            }
        })
    }


    return <div className="partea-stanga">
        <div className="partea-stanga-acasa">
            <IconButton style={styles.iconitaDelete} onClick={() => {navigate("/PaginaPrincipala")}}>
                <HomeIcon style={{ color: 'white', fontSize: 40 }}/>
            </IconButton>
        </div>
        <div className="partea-stanga-header">
            <h2>Lista notite</h2>
            <IconButton style={styles.iconitaAdd} onClick={() => adaugaNotita()}>
                <AddIcon style={{ color: 'navy', fontSize: 40 }}/>
            </IconButton>
        </div>
        <div className="partea-stanga-lista-notite">
            {notiteSortateDescrescator.map(notita => (
                <div key={notita.idNotita} className={`partea-stanga-lista-notita ${notita.idNotita===idNotitaDeEditat && "editare"}`} 
                  onClick={() => {setIdNotitaDeEditat(notita.idNotita)}}>
                    <div className="partea-stanga-notita-titlu">
                        <strong>{notita.titlu}</strong>
                        <div className="partea-stanga-notita-titlu">
                            <IconButton  onClick={() => {setIdNotitaDeEditat(notita.idNotita); 
                                setInCursDeVizualizare(true);}}>
                                <ViewArray />
                            </IconButton>
                            <IconButton  onClick={() => {setIdNotitaDeEditat(notita.idNotita); 
                                setInCursDeEditare(true); setInCursDeVizualizare(false);}}>
                                <EditIcon />
                            </IconButton>
                            <IconButton  onClick={() => {stergeNotita(notita.idNotita)
                                setInCursDeEditare(false); setInCursDeVizualizare(false);}}>
                                <DeleteIcon />
                            </IconButton>
                            <IconButton onClick={()=> {setIdNotitaDeEditat(notita.idNotita); upload(); }}>
                                <VideoLibraryIcon />
                            </IconButton>
                            <IconButton onClick={()=> {setIdNotitaDeEditat(notita.idNotita); pdfUpload(); }}>
                                <PostAddIcon ></PostAddIcon>
                            </IconButton>
                        </div>
                    </div>
                    <p>{notita.tipActivitate}, {notita.materie}</p>
                    <small className="partea-stanga-notita-modificari">{new Date(notita.dataIncarcare).toLocaleDateString('en-GB',
                    { hour: "2-digit", minute: "2-digit" })}</small>
                </div>
            ))}
        </div>
    </div>
}

ListaNotite.propTypes = {
    notite:  PropTypes.array.isRequired,
    adaugaNotita: PropTypes.func.isRequired,
    stergeNotita:  PropTypes.func.isRequired,
    idNotitaDeEditat:  PropTypes.string.isRequired,
    setInCursDeEditare:  PropTypes.func.isRequired,
    setIdNotitaDeEditat:  PropTypes.func.isRequired
}

export default ListaNotite;