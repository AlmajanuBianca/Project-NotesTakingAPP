import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const Grup=db.define('Grup',{
    //PK
    idGrup:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nume:{
        type:Sequelize.STRING,
        allowNull:false
    },
    // id-ul userului care a creat grupul va fi aici, astfel incat doar lui sa ii apara optiunea de a sterge grupul
    idCreator:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

export default Grup;