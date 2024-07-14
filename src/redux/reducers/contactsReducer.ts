import {
	SET_CONTACTS,
	SET_FAVORITE_CONTACTS,
	SET_GROUP_CONTACTS,
	ContactActionTypes
} from '../actions/actionTypes'
import { DATA_CONTACT, DATA_GROUP_CONTACT } from 'src/data'

export const initialState = {
	contacts: DATA_CONTACT,
	favoriteContacts: [
		DATA_CONTACT[0].id,
		DATA_CONTACT[1].id,
		DATA_CONTACT[2].id,
		DATA_CONTACT[3].id
	],
	groupContacts: DATA_GROUP_CONTACT,
	filteredFavoriteContacts: []
}

export const contactsReducer = (
	state = initialState,
	action: ContactActionTypes
) => {
	switch (action.type) {
		case SET_CONTACTS:
			return { ...state, contacts: action.payload }
		case SET_FAVORITE_CONTACTS:
			return { ...state, favoriteContacts: action.payload }
		case SET_GROUP_CONTACTS:
			return { ...state, groupContacts: action.payload }
		default:
			return state
	}
}
