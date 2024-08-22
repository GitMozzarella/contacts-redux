import { doc, setDoc, deleteDoc, collection } from 'firebase/firestore'
import { db } from './firebaseConfig'
import { ContactDto } from 'src/types/dto/ContactDto'
import { CONTACTS } from 'src/constants/variables'

export const addContactToFirestore = async (
	contact: Omit<ContactDto, 'id'>
): Promise<ContactDto> => {
	try {
		const newContactRef = doc(collection(db, CONTACTS))
		const newContact: ContactDto = { ...contact, id: newContactRef.id }
		await setDoc(newContactRef, newContact)
		console.log('Contact added to Firestore:', newContact)
		return newContact
	} catch (error) {
		console.error('Error adding contact:', error)
		throw error
	}
}

export const editContactInFirestore = async (contact: ContactDto) => {
	try {
		const contactRef = doc(db, CONTACTS, contact.docId)
		await setDoc(contactRef, contact, { merge: true })
		console.log('Contact updated in Firestore:', contact)
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
