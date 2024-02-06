const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const db = new sqlite3.Database('database.db');

app.use(express.json());
app.use(cors());

app.post('/cheques', (req, res) => {
  const { numeroCheque, nomPrenom, montantChiffre, montantLettres, codeBanque, numeroCompteRecepteur } = req.body;

  if (!numeroCheque || !nomPrenom || !montantChiffre || !montantLettres || !codeBanque || !numeroCompteRecepteur) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }

  const query = `INSERT INTO Cheques (numeroCheque, nomPrenom, montantChiffre, montantLettres, codeBanque, numeroCompteRecepteur) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [numeroCheque, nomPrenom, montantChiffre, montantLettres, codeBanque, numeroCompteRecepteur];

  db.run(query, values, function(err) {
    if (err) {
      console.error('Erreur lors de l\'insertion du chèque', err.message);
      return res.status(500).json({ error: 'Erreur lors de l\'insertion du chèque' });
    }
    console.log('Chèque inséré avec succès. ID:', this.lastID);
    res.status(201).json({ message: 'Chèque inséré avec succès', insertedId: this.lastID });
  });
});

app.get('/cheques', (req, res) => {
    const query = `SELECT * FROM Cheques`;
  
    db.all(query, (err, rows) => {
      if (err) {
        console.error('Erreur lors de la récupération des chèques', err.message);
        return res.status(500).json({ error: 'Erreur lors de la récupération des chèques' });
      }
      res.json(rows);
    });
  });
  

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
