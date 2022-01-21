# Proiect-TW-CODEX-Almajanu-Azzano

--------------------------------------------- SIGN IN
-> Verifica daca ambele campuri corespunzatoare email-ului si parolei sunt completate + ALERTA
-> Verifica existenta contului in baza de date + ALERTA
-> Stocheaza cateva date despre utilizator in localStorage


--------------------------------------------- SIGN UP
-> Verifica daca toate campurile sunt completate + ALERTA
-> Verifica daca email-ul este scris corespunzator cu @stud.ase.ro + ALERTA
-> Verifica unicitatea email-ului in baza de date + ALERTA
-> Creeaza un user in baza de date
-> Stocheaza cateva date despre utilizator in localStorage


--------------------------------------------- PAGINA PRINCIPALA
-> Afiseaza email-ul userului in coltul din stanga sus 
-> Userul poate accesa lista sa de notite
-> Userul poate crea un grup si adauga colegi in grupul sau
-> Userul poate filtra notitele avute (dupa tag (tipul activitatii curs/seminar), dupa cuvintele cheie din corpul notitei, dupa materie, dupa data la care a fost creata notita, conditiile de filtrare aplicandu-se simultan) putand apoi sa vizualizeze notitele obtinute in urma filtrarii. In cazul in care nicio notita nu corespunde conditiilor impuse de user, i se va afisa lista integrala de notite
-> Afiseaza grupurile din care userului face parte cu 3 optiuni (parasirea grupului, adaugarea de noi membrii si vizualizarea notitelor aferente grupului respectiv)
-> Parasirea implica 1 verificare : daca utilizatorul este administratorul grupului respectiv, atunci iesirea sa din grup inseamna stergerea definitiva a grupului odata cu eliminarea tuturor membrilor si notitelor, dar daca este doar un simplu membru, atunci nu afecteaza grupul cu nimic
-> Adaugarea de noi membri se poate face doar de catre administratorul grupului respectiv
-> Notitele vizualizate sunt toate notitele care au fost partajate cu grupul de oricare dintre membrii sai
-> Userul poate sa se delogheze din coltul din dreapta sus


--------------------------------------------- PAGINA DE NOTITE
-> Userul poate adauga notite noi in lista, care se vor salva automat in baza de date
-> Userul isi poate vizualiza lista integrala de notite atat in modul de previzualizare care este de tip react markdown cat si in modul de editare
-> Modul de editare presupune editarea textului notitei, a titlului, a tipului de activitate curs/seminar si a materiei actualizandu-se automat atat in markdown (jos in previzualizare) cat si in lista. In momentul in care userul da click pe butonul de salvare, toate modificarile se salveaza automat in baza de date modificandu-si si data cu data ultimei modificari + ALERT LA SALVARE
-> Userul is poate sterge notitele, acestea disparand si din lista dar si din baza de date
-> Userul are posibilitatea de a integra continut din alte surse pentru a-si lua notite cum ar fi accesarea unui link de youtube, videoclipul aparand in jumatatea de jos a paginii si corpul notitei in jumatatea de sus, notita salvandu-se automat
-> Userul are optiunea de a adauga din atasamente cu ar fi adaugarea dintr-un pdf (avand pdf-ul in dreapta, iar corpul notitei in stanga, aceasta salvandu-se automat)


--------------------------------------------- CREEAZA GRUP
-> Verifica daca toate campurile sunt completate + ALERTA
-> Verifica daca email-urile introduse : exista in baza de date, nu se repeta si niciunul dintre ele nu este email-ul userului care creeaza grupul + ALERTE
-> Minim un coleg trebuie adaugat in grup, iar userul care creeaza grupul este adaugat automat ca administrator (doar el putand adauga alte persoane utlerior si daca paraseste grupul, aceste se sterge cu totul)
-> Odata creat grupul, ne intoarce la pagina principala unde il vom putea vedea in lista de grupuri

--------------------------------------------- FILTRAREA
-> Verifica daca au fost selectate conditii de filtrare, daca nu afiseaza lista integrala, iar daca au fost selectate, atunci le aplica simultan afisand rezultatul selectiei. Daca exista notite care corespund, le afiseaza pe acelea, daca nu, atunci afiseaza lista integrala
-> Cand se afiseaza lista de notite organizate, utilizatorul are optiunea de a vizualiza notita in modul de markdown
-> Utilizatorul poate incarca notita intr-un grup introducand ID-ul grupului care apare si in pagina principala. Presupune 3 verificari : grupul sa existe in baza de date, utilizatorul sa faca parte din grup si notita pe care vrea sa o adauge in grup sa nu fi fost deja adaugata (deoarece orice notita din grup se modifica automat in momenntul in care utilizatorul careia ii apartine o editeaza).
-> Utilizatorul are optiunea de a partaja notita unui coleg introducandu-i email-ul. Presupune crearea unei noi notite cu un ID nou si cu ID-ul userului corespunzator email-ului introdus atfel incat modificarile aduse de un user sa nu afecteze notita celuilalt user + 2 verificari : email-ul sa existe in baza de date, sa nu fie al utilizatorului curent


--------------------------------------------- VIZUALIZAREA NOTITELOR DIN GRUP
-> Orice membru poate vizualiza notitele din grupul din care face parte
-> Doar membrul care a adaugat notita o poate sterge, ceilalti nu au dreptul de a face asa ceva 
