import { createAsyncThunk } from '@reduxjs/toolkit'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfig'
import { ContactDto } from 'src/types/dto/ContactDto'
import { setGroupContacts } from '../slices/contactsSlice'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'
import {
	ADD_CONTACT,
	CONTACTS,
	DELETE_CONTACT,
	EDIT_CONTACT,
	ErrorFetchContactsData,
	ErrorFetchGroupsData,
	FailedFetchContactsData,
	FailedFetchGroupsData,
	FETCH_CONTACTS,
	FETCH_GROUP_CONTACTS,
	GROUPS
} from 'src/constants/variables'
import {
	addContactToFirestore,
	deleteContactFromFirestore,
	editContactInFirestore
} from 'src/firebase/servicesFirestore'

export const fetchContactsFromFirestore = createAsyncThunk<
	ContactDto[],
	void,
	{ rejectValue: string }
>(FETCH_CONTACTS, async (_, { rejectWithValue }) => {
	try {
		const contactsCollection = collection(db, CONTACTS)
		const contactsSnapshot = await getDocs(contactsCollection)

		const contactsList: ContactDto[] = contactsSnapshot.docs.map(doc => {
			const data = doc.data()

			return {
				id: data.id,
				docId: doc.id,
				name: data.name,
				phone: data.phone,
				birthday: data.birthday,
				address: data.address,
				photo: data.photo
			}
		})

		return contactsList
	} catch (error) {
		console.error(ErrorFetchContactsData, error)
		return rejectWithValue(FailedFetchContactsData)
	}
})
export const fetchGroupContactsFromFirestore = createAsyncThunk<
	GroupContactsDto[],
	void,
	{ rejectValue: string }
>(FETCH_GROUP_CONTACTS, async (_, { rejectWithValue, dispatch }) => {
	try {
		const groupsCollection = collection(db, GROUPS)
		const groupsSnapshot = await getDocs(groupsCollection)

		const groupsList: GroupContactsDto[] = groupsSnapshot.docs.map(doc => {
			const data = doc.data()

			return {
				id: data.id,
				name: data.name || '',
				contactIds: data.contactIds,
				description: data.description,
				photo: data.photo
			}
		})

		dispatch(setGroupContacts(groupsList))
		return groupsList
	} catch (error) {
		console.error(ErrorFetchGroupsData, error)
		return rejectWithValue(FailedFetchGroupsData)
	}
})

export const addContactFirestore = createAsyncThunk<
	void,
	ContactDto,
	{ rejectValue: string }
>(ADD_CONTACT, async (contact, { rejectWithValue }) => {
	try {
		await addContactToFirestore(contact)
	} catch (error) {
		console.error('Error adding contact:', error)
		return rejectWithValue('Failed to add contact')
	}
})

export const editContactFirestore = createAsyncThunk<
	void,
	ContactDto,
	{ rejectValue: string }
>(EDIT_CONTACT, async (contact, { rejectWithValue }) => {
	try {
		await editContactInFirestore(contact)
	} catch (error) {
		console.error('Error editing contact:', error)
		return rejectWithValue('Failed to edit contact')
	}
})

export const deleteContactFirestore = createAsyncThunk<
	void,
	string,
	{ rejectValue: string }
>(DELETE_CONTACT, async (docId, { rejectWithValue }) => {
	try {
		await deleteContactFromFirestore(docId)
	} catch (error) {
		console.error('Error deleting contact:', error)
		return rejectWithValue('Failed to delete contact')
	}
})
