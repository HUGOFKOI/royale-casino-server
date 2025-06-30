const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const ADMIN_PASSWORD = "LECASINOMEILLEURTAHLESFOURPFRANCE";
let codes = [];
let gagnants = [];

// ADMIN : Connexion
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(403).json({ success: false, message: "Mot de passe incorrect" });
  }
});

// ADMIN : Générer un code
app.post("/api/admin/generate-code", (req, res) => {
  const code = Math.random().toString(36).substr(2, 6).toUpperCase();
  codes.push({ code, used: false });
  res.json({ success: true, code });
});

// ADMIN : Supprimer un code
app.post("/api/admin/delete-code", (req, res) => {
  const { code } = req.body;
  codes = codes.filter(c => c.code !== code);
  res.json({ success: true });
});

// ADMIN : Voir codes
app.get("/api/admin/codes", (req, res) => {
  res.json(codes);
});

// ADMIN : Voir gagnants
app.get("/api/admin/gagnants", (req, res) => {
  res.json(gagnants);
});

// ADMIN : Effacer gagnants
app.post("/api/admin/clear-gagnants", (req, res) => {
  gagnants = [];
  res.json({ success: true });
});

// PLAYER : Vérifier un code
app.post("/api/player/verify-code", (req, res) => {
  const { code } = req.body;
  const codeObj = codes.find(c => c.code === code && !c.used);
  if (codeObj) {
    codeObj.used = true;
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "Code invalide ou déjà utilisé" });
  }
});

// PLAYER : Enregistrer un gagnant
app.post("/api/player/save-gagnant", (req, res) => {
  const { nom, prenom, gain } = req.body;
  if (nom && prenom && gain >= 0) {
    gagnants.push({ nom, prenom, gain });
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "Données invalides" });
  }
});

// TEST : Route simple
app.get("/", (req, res) => {
  res.send("✅ Serveur Royale Casino actif !");
});

app.listen(PORT, () => {
  console.log(`🎲 Serveur lancé sur le port ${PORT}`);
});
