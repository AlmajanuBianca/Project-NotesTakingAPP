import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert } from '@mui/material';
import {post, get} from '../Calls';
import {userRoute} from '../ApiRoutes';
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import { Snackbar } from '@mui/material';
import uuid from "react-uuid";

const theme = createTheme();

export default function SignUp() {

const[user, setUser]=useState({
    idUser: uuid(),
    email:"",
    parola:"",
    facultate:""
})

const [open, setOpen] = useState(false);
const [open2, setOpen2] = useState(false);
const [open3, setOpen3] = useState(false);

const onChangeUser=e=>{
    setUser({...user,[e.target.name]:e.target.value})
}

const saveUser=async()=>{
    await post(userRoute,user);
}
const [rows,setRows]=useState([]);

useEffect(async()=>{
  let data=await get(userRoute);
  setRows(data);

},[]);
const navigate=useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    let valoare=document.querySelector("#email").value;
    let ok=true;
    for(let row of rows){
      if(row.email===valoare){
        ok=false;
        
      }
    }
      if(document.querySelector('#parola').value &&document.querySelector('#facultate').value && document.querySelector('#email')){

        if(valoare.includes("@stud.ase.ro")){
          if(ok==true){

            saveUser();
        // setItem primeste 2 parametrii de tip string, id-ul si obiectul
         localStorage.setItem("ID",JSON.stringify(user));
        navigate("/PaginaPrincipala");
          }
          else{
            setOpen2(true);
            setOpen(false);
            setOpen3(false);
          }
        }
        else{
          setOpen(true);
          setOpen2(false);
          setOpen3(false);
        }

      }

      else{
        setOpen3(true);
        setOpen(false);
        setOpen2(false);

      }


  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
           
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="off"
                  name="facultate"
                  required
                  fullWidth
                  id="facultate"
                  label="University"
                  autoFocus
                  onChange={e=>onChangeUser(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                autoComplete="off"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={e=>onChangeUser(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                 autoComplete="off"
                  required
                  fullWidth
                  name="parola"
                  label="Password"
                  type="password"
                  id="parola"
                  autoComplete="new-password"
                  onChange={e=>onChangeUser(e)}
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            //   onClick={saveUser()}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2"
                onClick={()=>{navigate("/")}} >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Snackbar open={open} autoHideDuration={2000}>
          <Alert  severity="error" sx={{ width: '100%' }}>
          Formatul valid al adresei este example@stud.ase.ro
         </Alert>
         </Snackbar>
         <Snackbar open={open2} autoHideDuration={2000}>
          <Alert  severity="error" sx={{ width: '100%' }}>
          Exista deja un cont asociat adresei de email introduse
         </Alert>
         </Snackbar>
         <Snackbar open={open3} autoHideDuration={2000}>
          <Alert  severity="error" sx={{ width: '100%' }}>
          Completati toate campurile
         </Alert>
         </Snackbar>
      </Container>
    </ThemeProvider>
  );
}