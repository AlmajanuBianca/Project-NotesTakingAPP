import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const User=db.define('User',{
    idUser:{
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    parola:{
        type: Sequelize.STRING,
        allowNull: false
    },
    facultate:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

export default User;