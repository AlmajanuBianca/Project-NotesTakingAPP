import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const Notita=db.define('Notita',{
    // va fi un id random cu libraria uuid
    idNotita:{
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    // FK
    idUser:{
        type:Sequelize.STRING,
        allowNull:false
    },
    // continutul notitei
    text:{
        type: Sequelize.STRING(6000),
        allowNull:true
    },
    // titlul notitei
    titlu:{
        type: Sequelize.STRING,
        allowNull:true
    },
    // data de incarcarea se va modifica la fiecare editare a notitei
    dataIncarcare:{
        type:Sequelize.DATE,
        allowNull:true
    },
    // daca e curs sau seminar, o sa fie un fel de eticheta
    tipActivitate:{
        type:Sequelize.STRING,
        allowNull:true
    },
    // numele materiei
    materie:{
        type:Sequelize.STRING,
        allowNull:true
    }
})

export default Notita;