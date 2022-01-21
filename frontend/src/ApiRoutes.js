// ruta generala
const link = "http://localhost:8000/api/";
// ruta catre utilizator
const userRoute = link + "user";
// ruta catre utilizator de cautare dupa email
const userFilterRoute = link + "userFilter";
// ruta catre notite
const notitaRoute = link + "notita";
// ruta catre grup
const grupRoute = link + "grup";
// ruta catre notitaGrup
const notitaGrupRoute = link + "notitaGrup";
// ruta catre membruGrup
const membruGrupRoute = link + "membruGrup";

export {userRoute, notitaRoute, grupRoute, notitaGrupRoute, membruGrupRoute, userFilterRoute};