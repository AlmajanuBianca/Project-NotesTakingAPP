import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { Alert} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { get} from '../Calls';
import {userRoute} from '../ApiRoutes';
import { useNavigate } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import {useState,useEffect} from 'react';



const theme = createTheme();

export default function SignIn() {



  const [rows,setRows]=useState([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const navigate=useNavigate();


  useEffect(async()=>{
    let data=await get(userRoute);
    setRows(data);

  },[]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  
    

    let email=document.querySelector("#email").value;
    let parola=document.querySelector("#parola").value;

    if(email && parola){

      for(let row of rows){
      if(row.email===email && row.parola===parola){
        let utilizator=row;
        localStorage.setItem("ID",JSON.stringify(utilizator));
        console.log("USER EXISTENT");
        navigate("/PaginaPrincipala");
   
      }
      else
      {
        setOpen(true);
        setOpen2(false);
        
      } }  
    }
    else{

      setOpen(false);
        setOpen2(true);
    }

    
   
  };




  return (
    <div className='signin'>
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              
      
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="parola"
              label="Password"
              type="password"
              id="parola"
              autoComplete="current-password"
            />
 
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2"
                onClick={()=>{navigate("SignUp")}}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
          <Snackbar open={open} autoHideDuration={6000}>
          <Alert  severity="error" sx={{ width: '100%' }}>
          Adresa sau parola incorecta
         </Alert>
         </Snackbar>
         <Snackbar open={open2} autoHideDuration={6000}>
          <Alert  severity="error" sx={{ width: '100%' }}>
          Completati toate campurile
         </Alert>
         </Snackbar>
      </Container>
    </ThemeProvider>
    </div>
  );
}