import {
	SET_FAVORITE_CONTACTS,
	TOGGLE_FAVORITE_CONTACT
} from '../actions/actionTypes'
import { FavoriteContactsDto } from 'src/types/dto/FavoriteContactsDto'
import { ProjectActions } from '../actions/actions'
import { DATA_CONTACT } from 'src/data'

const initialFavoriteContactsState: FavoriteContactsDto = [
	DATA_CONTACT[0].id,
	DATA_CONTACT[1].id,
	DATA_CONTACT[2].id,
	DATA_CONTACT[3].id
]

export const favoriteContactsReducer = (
	state = initialFavoriteContactsState,
	action: ProjectActions
): FavoriteContactsDto => {
	switch (action.type) {
		case SET_FAVORITE_CONTACTS:
			return action.payload

		case TOGGLE_FAVORITE_CONTACT:
			const contactId = action.payload
			if (state.includes(contactId)) {
				return state.filter(id => id !== contactId)
			} else {
				return [...state, contactId]
			}
		default:
			return state
	}
}
