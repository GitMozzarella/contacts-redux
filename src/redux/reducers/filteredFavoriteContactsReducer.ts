import { ProjectActions } from '../actions/actions'
import { SET_FILTERED_FAVORITE_CONTACTS } from '../actions/actionTypes'
import { ContactDto } from 'src/types/dto/ContactDto'

const initialFilteredFavoriteContactsState: ContactDto[] = []

export const filteredFavoriteContactsReducer = (
	state = initialFilteredFavoriteContactsState,
	action: ProjectActions
): ContactDto[] => {
	switch (action.type) {
		case SET_FILTERED_FAVORITE_CONTACTS:
			return action.payload
		default:
			return state
	}
}
