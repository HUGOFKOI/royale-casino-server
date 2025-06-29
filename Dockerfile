FROM node:16

# Crée un dossier app
WORKDIR /app

# Copie les fichiers de config + code
COPY package*.json ./
RUN npm install
COPY . .

# Expose le port (par défaut 3000 si ton server.js écoute sur ce port)
EXPOSE 3000

# Commande de démarrage
CMD [ "node", "server.js" ]
