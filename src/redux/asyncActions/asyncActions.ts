import { createAsyncThunk } from '@reduxjs/toolkit'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfig'
import { ContactDto } from 'src/types/dto/ContactDto'
import { setGroupContacts } from '../slices/contactsSlice'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'
import {
	contacts,
	ErrorFetchContactsData,
	ErrorFetchGroupsData,
	FailedFetchContactsData,
	FailedFetchGroupsData,
	FETCH_CONTACTS,
	FETCH_GROUP_CONTACTS,
	groups
} from 'src/constants/variables'

export const fetchContactsFromFirestore = createAsyncThunk<
	ContactDto[],
	void,
	{ rejectValue: string }
>(FETCH_CONTACTS, async (_, { rejectWithValue }) => {
	try {
		const contactsCollection = collection(db, contacts)
		const contactsSnapshot = await getDocs(contactsCollection)

		const contactsList: ContactDto[] = contactsSnapshot.docs.map(doc => {
			const data = doc.data()

			return {
				id: data.id,
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
		const groupsCollection = collection(db, groups)
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
