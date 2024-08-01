import {
	DELETE_CONTACT,
	SET_CONTACTS,
	ADD_CONTACT,
	EDIT_CONTACT
} from '../actions/actionTypes'
import { ContactDto } from 'src/types/dto/ContactDto'
import { DATA_CONTACT } from 'src/data'
import { ProjectActions } from '../actions/actions'

const initialContactsState: ContactDto[] = DATA_CONTACT

export const contactsReducer = (
	state = initialContactsState,
	action: ProjectActions
): ContactDto[] => {
	switch (action.type) {
		case SET_CONTACTS:
			return action.payload

		case DELETE_CONTACT:
			const contactIdToDelete = action.payload
			return state.filter(contact => contact.id !== contactIdToDelete)

		case ADD_CONTACT:
			return [...state, action.payload]

		case EDIT_CONTACT:
			return state.map(contact =>
				contact.id === action.payload.id ? action.payload : contact
			)

		default:
			return state
	}
}
