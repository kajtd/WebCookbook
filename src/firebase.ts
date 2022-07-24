// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged
} from 'firebase/auth'

import { getFirestore, doc, collection, onSnapshot, setDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useStore } from './store'

const store = useStore()

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app)

const provider = new GoogleAuthProvider()

const database = getFirestore(app)

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage()

// save the user's profile to the local storage after sign in
onAuthStateChanged(auth, user => {
  if (user) {
    store.user = user
  }
})

export {
  auth,
  provider,
  signInWithPopup,
  database,
  doc,
  uploadBytes,
  getDownloadURL,
  ref,
  setDoc,
  collection,
  onSnapshot,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  storage,
  updateProfile
}
