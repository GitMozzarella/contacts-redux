import { SET_CONTACTS } from '../actions/actionTypes'
import { DATA_CONTACT } from 'src/data'
import { ContactDto } from 'src/types/dto/ContactDto'
import { ProjectActions } from '../actions/actions'

const initialContactsState: ContactDto[] = DATA_CONTACT

export const contactsReducer = (
	state = initialContactsState,
	action: ProjectActions
): ContactDto[] => {
	switch (action.type) {
		case SET_CONTACTS:
			return action.payload
		default:
			return state
	}
}
