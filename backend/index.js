import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql2/promise';
import db from './dbConfig.js';
import {DB_USERNAME, DB_PASSWORD} from './Consts.js';
import Notita from './entities/Notita.js';
import User from './entities/User.js';
import Grup from './entities/Grup.js';
import MembruGrup from './entities/MembruGrup.js';
import NotitaGrup from './entities/NotitaGrup.js';
import Sequelize from 'sequelize';
const LikeOp = Sequelize.Op.like;

// configurarile pentru api respectiv pentru router
let app = express();
let router = express.Router();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

// conexiunea pentru baza de date + crearea ei
let conn;
mysql.createConnection({
    user: DB_USERNAME,
    password: DB_PASSWORD
})
.then(connection => {
    conn = connection;
    return connection.query("CREATE DATABASE IF NOT EXISTS PROIECT_DATABASE");
})
.then(() => {
    return conn.end();
})
.catch((err) => {
    console.warn(err.stack);
})

// legaturile intre tabele
// Un user poate avea mai multe notite 1 TO MANY
User.hasMany(Notita, {as : "Notite", foreignKey: "idUser"});
Notita.belongsTo(User, {foreignKey: "idUser"});
// Un grup poate avea mai multi membri dar si un membru poate apartine de mai multe grupuri MANY TO MANY
Grup.belongsToMany(User, {through: "MembruGrup", as: "Membri", foreignKey: "idGrup"});
User.belongsToMany(Grup, {through: "MembruGrup", as: "Grupuri", foreignKey: "idUser"});
// Un grup poate avea mai multe notite dar si o notita se poate regasi in mai multe grupuri MANY TO MANY
Grup.belongsToMany(Notita, {through: "NotitaGrup", as: "Notite", foreignKey: "idGrup"});
Notita.belongsToMany(Grup, {through: "NotitaGrup", as: "Grupuri", foreignKey: "idNotita"});

// crearea tabelelor
db.sync();

////////////////////////////////////////////////////////////////////////////////////////////////////// USER
// 1. Get lista de useri cu tot cu notile lor si grupurile din care fac parte (pentru verifcare in Postman)
async function getUsers(){
    return await User.findAll({include: ["Notite", "Grupuri"]});
}
router.route('/user').get(async(req,res)=>{
    return res.json(await getUsers());
})

// 2. Creare user FARA notite
async function createUserWithoutNotes(user){
    return await User.create(user);
}
router.route('/user').post(async(req,res)=>{
    return res.sendStatus(201).json(await createUserWithoutNotes(req.body));
})

// 3. Get user dupa id si CU tot cu notitele create
async function getUserById(id){
    return await User.findByPk(id, {include: ["Notite", "Grupuri"]});
}
router.route('/user/:id').get(async (req, res) => {
    return res.json(await getUserById(req.params.id));
})

// 4. Stergere user cu tot cu notitele sale
async function deleteUser(id){
    let deleteEntity=await getUserById(id);
    if(!deleteEntity){
        console.log("Nu exista un utilizator cu id-ul introdus in baza de date");
        return;
    }
    return await deleteEntity.destroy();
}
router.route('/user/:id').delete(async(req, res) => {
    try{
        return res.json(await deleteUser(req.params.id));
    }
    catch(e){
        console.log(e.message);
    }
})

// 5. Update user dupa ID-ul sau
async function updateUser(id, user){
    if (parseInt(id) !== user.idUser){
        console.log("Id-ul introdus in ruta nu corespunde cu id-ul userului, va rugam reincercati");
        return;
    }
    let updateEntity = await getUserById(id);
    if (!updateEntity){
        console.log("Nu exista un utilizator cu id-ul introdus in baza de date");
        return;
    }
    return await updateEntity.update(user);
}
router.route('/user/:id').put(async(req, res) => {
    try{
        return res.json(await updateUser(req.params.id, req.body));
    }
    catch(e){
        console.log(e.message);
    }
})

// 6. Get user dupa email-ul sau NU MERGE
async function getUserByEmail(emailIntrodus){
    // daca ai un email pe care sa il gaseasca in baza de date, atunci filtreaza daca nu, nu
    return await User.findOne({where: emailIntrodus ? {email: emailIntrodus} : undefined})
}
router.route('/userFilter').get(async (req, res) => {
    return res.json(await getUserByEmail(req.query.email));
})


/////////////////////////////////////////////////////////////////////////////////////////////////////// NOTITA
// 1. Get lista notite de la toti useri (pentru verificare in postman)
async function getNotite(){
    return await Notita.findAll({include: ["Grupuri"]});
}
router.route('/notita').get(async(req,res)=>{
    return res.json(await getNotite());
})

// 2. Creare notita pentru user primit ca parametru
async function createNotita(id, notita){
    if (id !== notita.idUser){
        console.log("Id-ul introdus in ruta nu corespunde cu id-ul userului la care se va adauga notita");
        return;
    }
    let user = await getUserById(id);
    if (!user){
        console.log("Nu exista un utilizator cu id-ul introdus in baza de date");
        return;
    }
    return await Notita.create(notita);
}
router.route('/notita/:id').post(async(req, res) => {
    try{
        return res.sendStatus(201).json(await createNotita(req.params.id, req.body));
    }
    catch(e){
        console.log(e.message);
    }
})

// 3. Get notita dupa id
async function getNotitaById(id){
    return await Notita.findByPk(id, {include: ["Grupuri"]});
}
router.route('/notita/:id').get(async (req, res) => {
    return res.json(await getNotitaById(req.params.id));
})

// 4. Stergere notita dupa id-ul notitei
async function deleteNotita(id){
    let deleteEntity=await getNotitaById(id);
    if(!deleteEntity){
        console.log("Nu exista o notita cu id-ul introdus in baza de date");
        return;
    }
    return await deleteEntity.destroy();
}
router.route('/notita/:id').delete(async(req, res) => {
    try{
        return res.json(await deleteNotita(req.params.id));
    }
    catch(e){
        console.log(e.message);
    }
})

// 5. Update notita dupa ID-ul sau
async function updateNotita(id, notita){
    if (id !== notita.idNotita){
        console.log("Id-ul introdus in ruta nu corespunde cu id-ul notitei, va rugam reincercati");
        return;
    }
    let updateEntity = await getNotitaById(id);
    if (!updateEntity){
        console.log("Nu exista o notita cu id-ul introdus in baza de date");
        return;
    }
    return await updateEntity.update(notita);
}
router.route('/notita/:id').put(async(req, res) => {
    try{
        return res.json(await updateNotita(req.params.id, req.body));
    }
    catch(e){
        console.log(e.message);
    }
})

/////////////////////////////////////////////////////////////////////////////////////////////////////// GRUP
// 1. Get lista completa de grupuri
async function getGrupuri(){
    return await Grup.findAll({include: ["Membri", "Notite"]});
}
router.route('/grup').get(async(req,res)=>{
    return res.json(await getGrupuri());
})

// 2. Creare grup chel, fara participanti si fara notite
async function createGrup(grup){
    return await Grup.create(grup);
}
router.route('/grup').post(async (req, res) => {
    return res.send(201).json(await createGrup(req.body));
})

// 3. Get grup dupa id si CU tot cu notitele create si membrii din grup
async function getGrupById(id){
    return await Grup.findByPk(id, {include: ["Membri", "Notite"]});
}
router.route('/grup/:id').get(async (req, res) => {
    return res.json(await getGrupById(req.params.id));
})

// 4. Stergere grup dupa id-ul sau
async function deleteGrup(id){
    let deleteEntity=await getGrupById(id);
    if(!deleteEntity){
        console.log("Nu exista un grup cu id-ul introdus in baza de date");
        return;
    }
    return await deleteEntity.destroy();
}
router.route('/grup/:id').delete(async(req, res) => {
    try{
        return res.json(await deleteGrup(req.params.id));
    }
    catch(e){
        console.log(e.message);
    }
})

//////////////////////////////// ASOCIEREA DINTRE MEMBRII SI GRUPURILE LOR
async function associateMembruGrup(membruGrup){
    return await MembruGrup.create(membruGrup);
}
router.route('/membruGrup').post(async (req, res) => {
    return res.json(await associateMembruGrup(req.body));
})
// Get membru dupa ID-ul user-ului si dupa ID-ul grupului MERGE
async function getMembruGrupByFilter(filter){
    let whereClause = {};
    if (filter.idGrup)
        whereClause.idGrup = {[LikeOp]: `%${filter.idGrup}%`}; 
    if (filter.idUser)
        whereClause.idUser = {[LikeOp]: `%${filter.idUser}%`}; 
    return await MembruGrup.findOne({where: whereClause});   
}
// http://localhost:8000/api/membruGrup/?idGrup=1&idUser=user1
router.route('/membruGrup').get(async (req, res) => {
    return res.json(await getMembruGrupByFilter(req.query));
})
// Sterge membru dupa ID-ul user-ului si dupa ID-ul grupului
async function stergeMembruGrupByFilter(filter){
    let deleteEntity=await getMembruGrupByFilter(filter);
    if(!deleteEntity){
        console.log("Nu exista un membru sau grupul introdus in baza de date");
        return;
    }
    return await deleteEntity.destroy();
}
router.route('/membruGrup').delete(async(req, res) => {
    try{
        return res.json(await stergeMembruGrupByFilter(req.query));
    }
    catch(e){
        console.log(e.message);
    }
})

///////////////////////////////// ASOCIEREA DINTRE GRUPURI SI NOTITIELE LOR
async function associateNotitaGrup(notitaGrup){
    return await NotitaGrup.create(notitaGrup);
}
router.route('/notitaGrup').post(async (req, res) => {
    return res.json(await associateNotitaGrup(req.body));
})
// Get notita dupa ID-ul grupului si ID-ul notitei MERGE
async function getNotitaGrupByFilter(filter){
    let whereClause = {};
    if (filter.idGrup)
        whereClause.idGrup = {[LikeOp]: `%${filter.idGrup}%`}; 
    if (filter.idNotita)
        whereClause.idNotita = {[LikeOp]: `%${filter.idNotita}%`}; 
    return await NotitaGrup.findOne({where: whereClause});   
}
// http://localhost:8000/api/notitaGrup/?idGrup=1&idNotita=notita1user1
router.route('/notitaGrup').get(async (req, res) => {
    return res.json(await getNotitaGrupByFilter(req.query));
})
// Sterge notita dupa ID-ul grupului si ID-ul notitei
async function stergeNotitaGrup(filter){
    let deleteEntity=await getNotitaGrupByFilter(filter);
    if(!deleteEntity){
        console.log("Nu exista o notita sau grupul introdus in baza de date");
        return;
    }
    return await deleteEntity.destroy();
}
router.route('/notitaGrup').delete(async(req, res) => {
    try{
        return res.json(await stergeNotitaGrup(req.query));
    }
    catch(e){
        console.log(e.message);
    }
})

let port = process.env.PORT || 8000;
app.listen(port);
console.log(`API is running at ${port}`);