import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const MembruGrup=db.define('MembruGrup',{
   idUser:{
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
   },
   idGrup:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: false,
    allowNull: false
   }
})

export default MembruGrup;