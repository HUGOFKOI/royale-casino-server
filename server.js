const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());  // Autorise ton site Neocities à interagir
app.use(bodyParser.json());

const ADMIN_PASSWORD = "LECASINOMEILLEURTAHLESFOURPFRANCE";
let codes = [];
let gagnants = [];

// Auth admin
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// Générer code
app.post("/api/admin/generate-code", (req, res) => {
  const code = Math.random().toString(36).substr(2, 6).toUpperCase();
  codes.push({ code, used: false });
  res.json({ code });
});

// Lister codes
app.get("/api/admin/codes", (req, res) => {
  res.json(codes);
});

// Supprimer code
app.post("/api/admin/delete-code", (req, res) => {
  const { code } = req.body;
  codes = codes.filter(c => c.code !== code);
  res.json({ success: true });
});

// Vérifier code joueur
app.post("/api/player/verify-code", (req, res) => {
  const { code } = req.body;
  const found = codes.find(c => c.code === code && !c.used);
  if (found) {
    found.used = true;
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// Ajouter gagnant
app.post("/api/player/add-winner", (req, res) => {
  const { nom, prenom, gain } = req.body;
  gagnants.push({ nom, prenom, gain });
  res.json({ success: true });
});

// Lister gagnants
app.get("/api/admin/gagnants", (req, res) => {
  res.json(gagnants);
});

// Effacer gagnants
app.post("/api/admin/clear-gagnants", (req, res) => {
  gagnants = [];
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
