import express from "express";

const app = express();



app.use(express.json());



app.get('/', (req, res) => {
    res.send('server läuft auf Port 5000');
});

const users = [
    { id: 1, name: "Jane Austen", status: "Ich befinde mich in erträglicher Gesundheit und Stimmung." },
    { id: 2, name: "Daria Morgendorffer", status: "Ich bin eine selektiv fürsorgliche Person." }
  ];


app.get('/user', (req, res) => {
    res.json(users);
});


app.get('/user/:id', (req, res) => {
    const userID = parseInt(req.params.id);
    const user = users.find(user => user.id === userID);

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "benutzer nicht gefunden"});
        } 
 /*    if (user) {

        const description = `${user.name}: ${user.status}`;
        res.send(description);
    } else {
        res.status(404).json({ message: "Benutzer nicht gefunden" });
    } */
});

app.post('/user', (req,res) => {
   const newUser = req.body.user;
   users.push(newUser);

   res.status(200).json(newUser);
   
});

app.patch('/user/:id', (req, res) => {
    const userID = parseInt(req.params.id);  // Extrahiere die ID aus der URL und wandle sie in eine Zahl um
    const user = users.find(user => user.id === userID);  // Suche den Benutzer anhand der ID
  
    if (!user) {
      return res.status(404).json({ message: "Benutzer nicht gefunden" });  // Wenn der Benutzer nicht gefunden wird
    }
  
    // Nur den Status aktualisieren
    if (req.body.status) {
      user.status = req.body.status;  // Der Status des Benutzers wird aktualisiert
    }
  
    // Rückgabe des aktualisierten Benutzers
    res.json(user);
  });
  

// Starte den Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});