import {
	SET_FAVORITE_CONTACTS,
	SetFavoriteContactsAction
} from '../actions/actionTypes'
import { FavoriteContactsDto } from 'src/types/dto/FavoriteContactsDto'
import { DATA_CONTACT } from 'src/data'

const initialFavoriteContactsState: FavoriteContactsDto = [
	DATA_CONTACT[0].id,
	DATA_CONTACT[1].id,
	DATA_CONTACT[2].id,
	DATA_CONTACT[3].id
]

export const favoriteContactsReducer = (
	state = initialFavoriteContactsState,
	action: SetFavoriteContactsAction
): FavoriteContactsDto => {
	switch (action.type) {
		case SET_FAVORITE_CONTACTS:
			return action.payload
		default:
			return state
	}
}
