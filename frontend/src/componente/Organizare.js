import React from 'react';
import {IconButton} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import PropTypes from 'prop-types';

// componenta Organizare care include organizarea notitelor dar si afisarea listei de notite
// (toata partea din stanga)
const Organizare = ({ notite, idNotitaDeEditat, setIdNotitaDeEditat, setInCursDeVizualizare, acasa}) => {
    // Cateva stiluri pentru iconite
    const styles = {
        iconitaDelete: {
            width: "10px",
            height: "10px",
            padding: "10px",
        }
    }

    // Facem un array care sa fie ordonat dupa data de incarcare a notitei, care se modifica atunci cand editam notita
    // astfel incat, cea mai recenta notita sa fie prima (ordinea descrescatoare)
    const notiteSortateDescrescator = notite.sort((a, b) => b.dataIncarcare - a.dataIncarcare);

    return <div className="partea-stanga">
        <div className="partea-stanga-acasa">
            <IconButton style={styles.iconitaDelete}  onClick={() => {acasa(); console.log(notite)}}>
                <HomeIcon style={{ color: 'white', fontSize: 40 }}/>
            </IconButton>
        </div>
        <div className="partea-stanga-header">
            <h2>Lista notite organizate</h2>
        </div>
        <div className="partea-stanga-lista-notite">
            {notiteSortateDescrescator.map(notita => (
                <div key={notita.idNotita} className={`partea-stanga-lista-notita ${notita.idNotita===idNotitaDeEditat && "editare"}`} 
                  onClick={() => {setIdNotitaDeEditat(notita.idNotita); setInCursDeVizualizare(true);}}>
                    <div className="partea-stanga-notita-titlu">
                        <strong>{notita.titlu}</strong>
                    </div>
                    <p>{notita.tipActivitate}, {notita.materie}</p>
                    <small className="partea-stanga-notita-modificari">{new Date(notita.dataIncarcare).toLocaleDateString('en-GB',
                    { hour: "2-digit", minute: "2-digit" })}</small>
                </div>
            ))}
        </div>
    </div>
}

Organizare.propTypes = {
    notite:  PropTypes.array.isRequired,
    idNotitaDeEditat:  PropTypes.string.isRequired,
    setInCursDeVizualizare:  PropTypes.func.isRequired,
    setIdNotitaDeEditat:  PropTypes.func.isRequired
}

export default Organizare;