/* RÉGLAGES : colle ici la config de ton projet Firebase pour activer le vrai multijoueur.
   Laisse null pour jouer en "Mode Local" (sans réseau). */
const FIREBASE_CONFIG = null;
/* Exemple :
const FIREBASE_CONFIG = {
  apiKey: "...", authDomain: "...firebaseapp.com", projectId: "...",
  storageBucket: "...", messagingSenderId: "...", appId: "..."
};
*/
window.__firebase_config = FIREBASE_CONFIG ? JSON.stringify(FIREBASE_CONFIG) : '';
