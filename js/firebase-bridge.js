/* PONT FIREBASE : seul fichier "module". Il met les outils Firebase dans window.FB
   pour que network.js (script classique) puisse les utiliser. */
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, signInWithCustomToken } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc, updateDoc, onSnapshot, increment } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
window.FB = { initializeApp, getAuth, signInAnonymously, signInWithCustomToken, getFirestore, doc, setDoc, updateDoc, onSnapshot, increment };
