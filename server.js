const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Données en mémoire (tu peux les remplacer par une base de données plus tard)
const ADMIN_PASSWORD = "LECASINOMEILLEURTAHLESFOURPFRANCE";
let codes = []; // { code: string, used: boolean }
let gagnants = []; // { nom: string, prenom: string, gain: number }

// ROUTES ADMIN

// Connexion admin
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(403).json({ success: false, message: "Mot de passe incorrect" });
  }
});

// Générer un code
app.post("/api/admin/generate-code", (req, res) => {
  const code = Math.random().toString(36).substr(2, 6).toUpperCase();
  codes.push({ code, used: false });
  res.json({ success: true, code });
});

// Liste des codes
app.get("/api/admin/codes", (req, res) => {
  res.json(codes);
});

// Supprimer un code
app.post("/api/admin/delete-code", (req, res) => {
  const { code } = req.body;
  const index = codes.findIndex(c => c.code === code);
  if (index !== -1) {
    codes.splice(index, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false, message: "Code non trouvé" });
  }
});

// Liste des gagnants
app.get("/api/admin/gagnants", (req, res) => {
  res.json(gagnants);
});

// Effacer les gagnants
app.post("/api/admin/clear-gagnants", (req, res) => {
  gagnants = [];
  res.json({ success: true });
});

// ROUTES PUBLIC

// Vérifier code joueur
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

// Enregistrer un gagnant
app.post("/api/player/save-gagnant", (req, res) => {
  const { nom, prenom, gain } = req.body;
  if (nom && prenom && gain >= 0) {
    gagnants.push({ nom, prenom, gain });
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "Données invalides" });
  }
});

// Serveur prêt
app.listen(PORT, () => {
  console.log(`🎲 Serveur lancé sur le port ${PORT}`);
});
