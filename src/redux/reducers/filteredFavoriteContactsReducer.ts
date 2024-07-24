import {
	SET_FILTERED_FAVORITE_CONTACTS,
	SetFilteredFavoriteContactsAction
} from '../actions/actionTypes'
import { ContactDto } from 'src/types/dto/ContactDto'

const initialFilteredFavoriteContactsState: ContactDto[] = []

export const filteredFavoriteContactsReducer = (
	state = initialFilteredFavoriteContactsState,
	action: SetFilteredFavoriteContactsAction
): ContactDto[] => {
	switch (action.type) {
		case SET_FILTERED_FAVORITE_CONTACTS:
			return action.payload
		default:
			return state
	}
}
