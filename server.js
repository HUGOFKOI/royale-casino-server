const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());  // autorise les requêtes depuis ton site Neocities
app.use(bodyParser.json());

// Mot de passe stocké uniquement côté serveur (invisible pour le client)
const ADMIN_PASSWORD = "LECASINOMEILLEURTAHLESFOURPFRANCE";

// Exemple : stocke les codes et gagnants en mémoire (optionnel : remplace par une DB si besoin)
let codes = [];
let gagnants = [];

// Vérification admin
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// Génération code (admin uniquement)
app.post("/api/admin/generate-code", (req, res) => {
  const code = Math.random().toString(36).substr(2, 6).toUpperCase();
  codes.push({ code, used: false });
  res.json({ code });
});

// Liste des codes
app.get("/api/admin/codes", (req, res) => {
  res.json(codes);
});

// Supprimer un code
app.post("/api/admin/delete-code", (req, res) => {
  const { code } = req.body;
  codes = codes.filter(c => c.code !== code);
  res.json({ success: true });
});

// Liste des gagnants
app.get("/api/admin/gagnants", (req, res) => {
  res.json(gagnants);
});

// Enregistrer un gagnant
app.post("/api/admin/add-gagnant", (req, res) => {
  const { nom, prenom, gain } = req.body;
  gagnants.push({ nom, prenom, gain });
  res.json({ success: true });
});

// Clear gagnants
app.post("/api/admin/clear-gagnants", (req, res) => {
  gagnants = [];
  res.json({ success: true });
});

// Test route
app.get("/", (req, res) => {
  res.send("Serveur Royale Casino actif !");
});

// Lancement serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur le port ${PORT}`);
});
