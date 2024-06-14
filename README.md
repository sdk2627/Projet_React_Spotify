# Spotiflow
- Saddek Ouyahia
- Guillaume Saurin


Application de gestion de playlist Spotify en React.


## Lancer le projet
Il est nécessaire d'ajouter le paramètre `--legacy-peer-deps` lors de l'installation des dépendances pour éviter les erreurs de dépendances entre notre version de React et  le package 'react-spotify-auth' qui permet de gérer l'authentification Spotify.
```shell
npm i --legacy-peer-deps
```

Le projet utilise l'API Spotify, il est donc nécessaire de créer un compte Spotify Developer et de créer une application pour obtenir un client ID et un client secret.
### [Lien vers Spotify developer](https://developer.spotify.com/)

##  NECESSAIRE: Ajouter une application sur Spotify Developer 
- Se connecter sur [Spotify Developer](https://developer.spotify.com/) avec votre compte Spotify
- Créer une application en cliquant sur 'Create App'
- Remplir les champs obligatoires 
- Dans 'Redirect URIs', ajouter l'URL de redirection de l'application 'http://localhost:5173/callback'
- Pour les API utilisées, cocher 'Web API' et 'Web Playback SDK'
- Récupérer le client ID et le copier/coller dans le fichier src/App.tsx, ligne 16 
