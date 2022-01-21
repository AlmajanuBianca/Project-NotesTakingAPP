import React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import '../PaginaOrganizare.css';

const NotitaGrup = ({idNotitaDeEditat, inCursDeVizualizare}) => {

    // Daca nu am dat click pe o notita pentru a o edita, atunci nu vom avea componenta Notita afisata
    if (!inCursDeVizualizare) return <div className="nimic-de-vizualizat">Click pe o notita pentru a o vizualiza</div>;

    // Daca nu am dat click pe o notita pentru a o vizualiza, atunci nu vom avea componenta Notita afisata
    return <div className="notita-vizualizare">
            <h2 className="notita-vizualizare-titlu">{idNotitaDeEditat.titlu}</h2> 
            <ReactMarkdown className="notita-vizualizare-markdown">{idNotitaDeEditat.text}</ReactMarkdown> 
        </div>
}

// Propsul idNotitaDeEditat isi schimba tipul, aici initial este undefined (pentru ca inca nu a fost incarcat un obiect)
//, iar dupa ce dau click pe o notita pentru a o edita, se transforma in object
NotitaGrup.propTypes = {
    inCursDeVizualizare: PropTypes.bool.isRequired
}

export default NotitaGrup;