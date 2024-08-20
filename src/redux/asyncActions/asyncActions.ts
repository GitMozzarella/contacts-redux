import { createAsyncThunk } from '@reduxjs/toolkit'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebaseConfig'
import { ContactDto } from 'src/types/dto/ContactDto'
import { setGroupContacts } from '../slices/contactsSlice'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'

// Создание асинхронного действия с использованием createAsyncThunk
export const fetchContactsFromFirestore = createAsyncThunk<
	ContactDto[],
	void,
	{ rejectValue: string }
>('contacts/fetchContactsFromFirestore', async (_, { rejectWithValue }) => {
	try {
		const contactsCollection = collection(db, 'contacts')
		const contactsSnapshot = await getDocs(contactsCollection)

		// Преобразование документов Firestore в ContactDto
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
		console.error('Error fetching contacts:', error)
		return rejectWithValue('Failed to fetch contacts')
	}
})

// Создание асинхронного действия с использованием createAsyncThunk
export const fetchGroupContactsFromFirestore = createAsyncThunk<
	GroupContactsDto[],
	void,
	{ rejectValue: string }
>(
	'contacts/fetchGroupContactsFromFirestore',
	async (_, { rejectWithValue, dispatch }) => {
		try {
			const groupsCollection = collection(db, 'groups')
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
			console.error('Error fetching groups:', error)
			return rejectWithValue('Failed to fetch groups')
		}
	}
)
