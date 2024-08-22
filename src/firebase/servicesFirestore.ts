import { doc, setDoc, deleteDoc, collection } from 'firebase/firestore'
import { db } from './firebaseConfig'
import { ContactDto } from 'src/types/dto/ContactDto'
import { CONTACTS } from 'src/constants/variables'

export const addContactToFirestore = async (
	contact: Omit<ContactDto, 'id'>
) => {
	try {
		const newContactRef = doc(collection(db, CONTACTS))
		await setDoc(newContactRef, { ...contact, id: newContactRef.id })
		console.log('Contact added to Firestore:', contact)
	} catch (error) {
		console.error('Error adding contact:', error)
		throw error
	}
}

export const editContactInFirestore = async (contact: ContactDto) => {
	try {
		const contactRef = doc(db, CONTACTS, contact.id)
		await setDoc(contactRef, contact, { merge: true })
	} catch (error) {
		console.error('Error editing contact:', error)
		throw error
	}
}
export const deleteContactFromFirestore = async (docId: string) => {
	try {
		const contactRef = doc(db, CONTACTS, docId)
		await deleteDoc(contactRef)
	} catch (error) {
		console.error('Error deleting contact:', error)
		throw error
	}
}
