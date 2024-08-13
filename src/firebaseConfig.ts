import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

export const firebaseConfig = {
	apiKey: 'AIzaSyASzvWM47ct5JHWKE_LzYIdXiP-P7rp9nk',
	authDomain: 'contacts-afa8b.firebaseapp.com',
	projectId: 'contacts-afa8b',
	storageBucket: 'contacts-afa8b.appspot.com',
	messagingSenderId: '667588662712',
	appId: '1:667588662712:web:7f7d47d95ded9470d42b4d'
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
