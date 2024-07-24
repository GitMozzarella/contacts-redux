import { SET_CONTACTS, SetContactsAction } from '../actions/actionTypes'
import { DATA_CONTACT } from 'src/data'
import { ContactDto } from 'src/types/dto/ContactDto'

const initialContactsState: ContactDto[] = DATA_CONTACT

export const contactsReducer = (
	state = initialContactsState,
	action: SetContactsAction
): ContactDto[] => {
	switch (action.type) {
		case SET_CONTACTS:
			return action.payload
		default:
			return state
	}
}
