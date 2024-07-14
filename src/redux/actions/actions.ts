import {
	SET_CONTACTS,
	SET_FAVORITE_CONTACTS,
	SET_GROUP_CONTACTS,
	ContactActionTypes
} from './actionTypes'
import { ContactDto } from 'src/types/dto/ContactDto'
import { FavoriteContactsDto } from 'src/types/dto/FavoriteContactsDto'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'

export const setContacts = (contacts: ContactDto[]): ContactActionTypes => ({
	type: SET_CONTACTS,
	payload: contacts
})

export const setFavoriteContacts = (
	favoriteContacts: FavoriteContactsDto
): ContactActionTypes => ({
	type: SET_FAVORITE_CONTACTS,
	payload: favoriteContacts
})

export const setGroupContacts = (
	groupContacts: GroupContactsDto[]
): ContactActionTypes => ({
	type: SET_GROUP_CONTACTS,
	payload: groupContacts
})
