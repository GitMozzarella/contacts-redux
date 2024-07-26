import { SET_FAVORITE_CONTACTS } from '../actions/actionTypes'
import { FavoriteContactsDto } from 'src/types/dto/FavoriteContactsDto'
import { DATA_CONTACT } from 'src/data'
import { ProjectActions } from '../actions/actions'

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
		default:
			return state
	}
}
