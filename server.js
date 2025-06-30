<<<<<<< HEAD
cconst express = require("express");
=======
const express = require("express");
>>>>>>> e7f4b90e9f6e78f847a65f14bed788e15b392c1b
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
<<<<<<< HEAD
app.use(cors());  // autorise les requêtes depuis ton site Neocities
=======
>>>>>>> e7f4b90e9f6e78f847a65f14bed788e15b392c1b
app.use(bodyParser.json());
app.use(cors());

<<<<<<< HEAD
// Mot de passe stocké uniquement côté serveur (invisible pour le client)
const ADMIN_PASSWORD = "LECASINOMEILLEURTAHLESFOURPFRANCE";

// Exemple : stocke les codes et gagnants en mémoire (optionnel : remplace par une DB si besoin)
let codes = [];
let gagnants = [];

// Vérification admin
=======
// Données en mémoire (tu peux les remplacer par une base de données plus tard)
const ADMIN_PASSWORD = "LECASINOMEILLEURTAHLESFOURPFRANCE";
let codes = []; // { code: string, used: boolean }
let gagnants = []; // { nom: string, prenom: string, gain: number }

// ROUTES ADMIN

// Connexion admin
>>>>>>> e7f4b90e9f6e78f847a65f14bed788e15b392c1b
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(403).json({ success: false, message: "Mot de passe incorrect" });
  }
});

<<<<<<< HEAD
// Génération code (admin uniquement)
=======
// Générer un code
>>>>>>> e7f4b90e9f6e78f847a65f14bed788e15b392c1b
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
<<<<<<< HEAD
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
=======
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
>>>>>>> e7f4b90e9f6e78f847a65f14bed788e15b392c1b
app.post("/api/admin/clear-gagnants", (req, res) => {
  gagnants = [];
  res.json({ success: true });
});

<<<<<<< HEAD
// Test route
app.get("/", (req, res) => {
  res.send("Serveur Royale Casino actif !");
});

// Lancement serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur le port ${PORT}`);
=======
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
>>>>>>> e7f4b90e9f6e78f847a65f14bed788e15b392c1b
});
