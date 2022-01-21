import SignIn from './componente/SignIn';
import SignUp from './componente/SignUp';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import PaginaNotite from './componente/PaginaNotite';
import PaginaPrincipala from './componente/PaginaPrincipala';
import PaginaOrganizare from './componente/PaginaOrganizare';
import PaginaGrup from './componente/PaginaGrup';
import ConinutIntegrat from './componente/ContinutIntegrat';
import PdfUpload from './componente/PdfUpload';
import PaginaCreeazaGrup from './componente/PaginaCreeazaGrup';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn/>}></Route>
          <Route path="/SignUp" element={<SignUp/>}></Route>
          <Route path="/PaginaPrincipala" element={<PaginaPrincipala/>}></Route>
          <Route path="/PaginaNotite" element={<PaginaNotite/>}></Route>
          <Route path="/PaginaOrganizare" element={<PaginaOrganizare/>}></Route>
          <Route path="/PaginaGrup/:id" element={<PaginaGrup/>}></Route>
          <Route path="/PdfUpload" element={<PdfUpload/>}></Route>
          <Route path="/Continut" element={<ConinutIntegrat/>}></Route>
          <Route path="/PaginaCreeazaGrup" element={<PaginaCreeazaGrup/>}></Route>
          <Route path="/PaginaAdaugaMembri/:id" element={<PaginaCreeazaGrup/>}></Route>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
