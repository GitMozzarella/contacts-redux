import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ContactDto } from 'src/types/dto/ContactDto'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'
import { FilterFormValues } from 'src/components/FilterForm/FilterForm'

interface ContactsState {
	contacts: ContactDto[]
	favoriteContacts: string[]
	groupContacts: GroupContactsDto[]
	filter: Partial<FilterFormValues>
}

const initialState: ContactsState = {
	contacts: [],
	favoriteContacts: [],
	groupContacts: [],
	filter: {}
}

const contactsSlice = createSlice({
	name: 'contacts',
	initialState,
	reducers: {
		setContacts(state, action: PayloadAction<ContactDto[]>) {
			state.contacts = action.payload
		},
		setFavoriteContacts(state, action: PayloadAction<string[]>) {
			state.favoriteContacts = action.payload
		},
		setGroupContacts(state, action: PayloadAction<GroupContactsDto[]>) {
			state.groupContacts = action.payload
		},
		setFilterValues(state, action: PayloadAction<Partial<FilterFormValues>>) {
			state.filter = action.payload
		},
		toggleFavoriteContact(state, action: PayloadAction<string>) {
			const contactId = action.payload
			if (state.favoriteContacts.includes(contactId)) {
				state.favoriteContacts = state.favoriteContacts.filter(
					id => id !== contactId
				)
			} else {
				state.favoriteContacts.push(contactId)
			}
		},
		deleteContact(state, action: PayloadAction<string>) {
			state.contacts = state.contacts.filter(
				contact => contact.id !== action.payload
			)
		},
		addContact(state, action: PayloadAction<ContactDto>) {
			state.contacts.push(action.payload)
		},
		editContact(state, action: PayloadAction<ContactDto>) {
			const index = state.contacts.findIndex(
				contact => contact.id === action.payload.id
			)
			if (index !== -1) {
				state.contacts[index] = action.payload
			}
		}
	}
})

export const {
	setContacts,
	setFavoriteContacts,
	setGroupContacts,
	setFilterValues,
	toggleFavoriteContact,
	deleteContact,
	addContact,
	editContact
} = contactsSlice.actions

export default contactsSlice.reducer
