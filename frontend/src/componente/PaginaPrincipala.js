import * as React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import DescriptionIcon from '@mui/icons-material/Description';
import GroupsIcon from '@mui/icons-material/Groups';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Checkbox from '@mui/material/Checkbox';
import {Paper, Table, TableBody, TableCell, TableRow, TableContainer, TableHead, IconButton } from '@material-ui/core';
import LogoutIcon from '@mui/icons-material/Logout';
import ExitToApp from '@material-ui/icons/ExitToApp';
import AddIcon from '@material-ui/icons/Add';
import ViewArray from '@material-ui/icons/ViewArray';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect} from "react";
import { teal,brown } from '@mui/material/colors';
import {get,remove} from '../Calls';
import {grupRoute, membruGrupRoute, userRoute} from '../ApiRoutes';



import HomeIcon from '@mui/icons-material/Home';
import "../Home.css";

const Home=()=>{

    const [rows, setRows] = useState([]);
    const [needUpdate, setNeedUpdate] = useState(false);
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const [text, setText] = useState("");



    useEffect(async() => {
        let utilizator=JSON.parse(localStorage.getItem("ID"));
        setText(utilizator.email);
        let user = await get(userRoute, utilizator.idUser);
        if(Object.keys(user).length === 0)
        console.log("Nu avem user");
        else{
            let data = user.Grupuri;
            if (data.length === 0)
                console.log("Nu avem grupuri");
            else {
                setRows(data);
                setUser(user.idUser);
                }
        }
    }, [needUpdate]);

    const parasesteGrup = async(idGrup, index) => {
        let membruGrupCautat = await get(membruGrupRoute, '?idGrup='+idGrup+'&idUser='+user);
        let grupCautat = await get(grupRoute, idGrup);
        if(typeof membruGrupCautat !== 'undefined')
        {
            if(typeof grupCautat !== 'undefined')
            {
                if(membruGrupCautat.idUser === grupCautat.idCreator) {
                    await remove(membruGrupRoute, '?idGrup='+idGrup+'&idUser='+user);
                    rows.splice(index, 1);
                    await remove(grupRoute, idGrup);
                    setRows(rows);
                    setNeedUpdate(!needUpdate);
                    alert("Deoarece ati fost administrator, grupul s-a sters in momentul in care dumneavoastra l-ati parasit!")
                }
                else {
                    await remove(membruGrupRoute, '?idGrup='+idGrup+'&idUser='+user);
                    rows.splice(index, 1);
                    setRows(rows);
                    setNeedUpdate(!needUpdate);
                    alert("Ati parasit cu succes grupul!");
                }
            }
        }
        else alert("Eroare!");
    }

    const adauga = async(ruta, id) => {
        let grup = await get(grupRoute, id);
        if(user !== grup.idCreator)
            alert("Nu aveti permisiunea de a adauga membri noi acestui grup deoarece nu dumneavoastra l-ati creat");
        else
            navigate(ruta);
    }
    


   
const filter=()=>{
    if(document.querySelector("#filter").style.display=="none"){
       document.querySelector("#filter").style.display="block"; 
    }
    else{
        document.querySelector("#filter").style.display="none";   
    }

}
   

    return(
        <div id="home">
            <div id='dashboard'>
                <IconButton id="account">
                    <AccountCircleIcon sx={{color:teal[50]}}></AccountCircleIcon>
                </IconButton>
                <input id="utilizator"type="text" defaultValue={text} disabled></input>
                
              <div className='listItem'>
                  <br></br>
                  <br></br>

              <IconButton >
                  <HomeIcon sx={{color:brown[200]}}></HomeIcon>
              </IconButton>
                  <label>Pagina principala</label>
                 <br></br>
                 <IconButton onClick={() => {navigate("/PaginaNotite")}}>
                     <DescriptionIcon sx={{color:brown[200]}}></DescriptionIcon>
                 </IconButton>
                 <label>Notite</label>
                 <br></br>
                 <IconButton onClick={() => {navigate("/PaginaCreeazaGrup")}}>
                     <GroupsIcon sx={{color:brown[200]}}></GroupsIcon>
                 </IconButton>
                 <label>Creeaza grup</label>
              </div>
              <IconButton onClick={filter}>
                  <FilterAltIcon sx={{color:brown[200]}}></FilterAltIcon>
              </IconButton>
              <label>Filtrare</label>
              <div id="filter" style={{display:"none"}}>
                  
                  <Checkbox sx={{color:teal[50]}} id="cbCurs"></Checkbox>
                  <label htmlFor="cbCurs">Curs</label>
                  <br></br>
                  <Checkbox sx={{color:teal[50]}} id="cbSeminar"></Checkbox>
                  <label htmlFor="cbSeminar">Seminar</label>
                  <br></br>
                  <div id="cautare">
                  <input type="text" id="cuvCheie"placeholder='cuvinte cheie'></input>
                  <input type="text"id="materieCautare" placeholder='materie'></input>
                  <input type="number" id='zi' placeholder='zi'></input>
                  <input type="number" id="luna" placeholder='luna'></input>
                  <input type="number" id="an"placeholder='an'></input>
                  </div>
                  
               
                 
                <IconButton id="lupa" onClick={() => {
                    let cbCurs = document.getElementById("cbCurs").checked;
                    let cbSeminar = document.getElementById("cbSeminar").checked;
                    let materie = document.getElementById("materieCautare").value;
                    let cuvinteCheie = document.getElementById("cuvCheie").value;
                    let zi = document.getElementById("zi").value;
                    let luna = document.getElementById("luna").value;
                    let an = document.getElementById("an").value;
                    
                    if(materie === "")
                        materie = -1;
                    
                    if(cuvinteCheie === "")
                        cuvinteCheie = -1;
                    
                    if(zi === "")
                        zi = -1;
                        
                    if(luna === "")
                        luna = -1;
                    
                    if(an === "")
                        an = -1;
                        
                    let organizare = {
                        curs: cbCurs,
                        seminar : cbSeminar,
                        materie: materie,
                        cuvinteCheie: cuvinteCheie,
                        zi: zi,
                        luna: luna,
                        an: an
                    }
                    // setItem primeste 2 parametrii de tip string, id-ul si obiectul
                    localStorage.setItem("organizare",JSON.stringify(organizare));
                    navigate("/PaginaOrganizare");}}>
                    <SearchIcon sx={{color:brown[200]}}
                    ></SearchIcon>
                </IconButton>
              </div>
              

            </div>
            <div id="continut">
                
                  <IconButton id="logout" onClick={() => {navigate("/")}}>
                    <LogoutIcon ></LogoutIcon>
                </IconButton>  
                
                <br></br>
                <br></br>
                <br></br>
         

                <TableContainer id="tableContainer" component={Paper}>
                <Table aria-label="simple table">
                    <TableHead >
                        <TableRow id="tr">
                            <TableCell>ID</TableCell>
                            <TableCell  align="left">Nume</TableCell>
                            <TableCell align="center">Paraseste grup</TableCell>
                            <TableCell align="center">Adauga membri noi in grup</TableCell>
                            <TableCell align="center">Vizualizeaza notitele din grup</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row, index) => (
                        <TableRow hover={true} key={row.idGrup}>
                            <TableCell  component="th" scope ="row"> {row.idGrup}</TableCell>
                            <TableCell align="left">{row.nume}</TableCell>
                            <TableCell align="center">
                            <IconButton onClick={() => parasesteGrup(row.idGrup, index)}>
                                <ExitToApp color="primary"></ExitToApp>
                            </IconButton>
                            </TableCell>
                            <TableCell align="center">
                            <IconButton onClick={() => adauga(`/PaginaAdaugaMembri/${row.idGrup}`, row.idGrup)}>
                                <AddIcon color="primary"/>
                            </IconButton>
                            </TableCell>
                            <TableCell align="center">
                            <IconButton  onClick={() => navigate(`/PaginaGrup/${row.idGrup}`)}>
                                <ViewArray color="primary" ></ViewArray>
                            </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
           

            </div>
        </div>
        
    );
}

export default Home;