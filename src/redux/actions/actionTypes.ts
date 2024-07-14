import { ContactDto } from 'src/types/dto/ContactDto'
import { FavoriteContactsDto } from 'src/types/dto/FavoriteContactsDto'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'

export const SET_CONTACTS = 'SET_CONTACTS'
export const SET_FAVORITE_CONTACTS = 'SET_FAVORITE_CONTACTS'
export const SET_GROUP_CONTACTS = 'SET_GROUP_CONTACTS'

interface SetContactsAction {
	type: typeof SET_CONTACTS
	payload: ContactDto[]
}

interface SetFavoriteContactsAction {
	type: typeof SET_FAVORITE_CONTACTS
	payload: FavoriteContactsDto
}

interface SetGroupContactsAction {
	type: typeof SET_GROUP_CONTACTS
	payload: GroupContactsDto[]
}

export type ContactActionTypes =
	| SetContactsAction
	| SetFavoriteContactsAction
	| SetGroupContactsAction
