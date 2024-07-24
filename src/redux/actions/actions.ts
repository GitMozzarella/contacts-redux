import {
	SET_CONTACTS,
	SET_FAVORITE_CONTACTS,
	SET_GROUP_CONTACTS,
	SET_FILTERED_FAVORITE_CONTACTS
} from './actionTypes'
import { ContactDto } from 'src/types/dto/ContactDto'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'
import {
	SetFavoriteContactsAction,
	SetContactsAction,
	SetGroupContactsAction,
	SetFilteredFavoriteContactsAction
} from './actionTypes'

export function setContactsActionCreator(
	contacts: ContactDto[]
): SetContactsAction {
	return {
		type: SET_CONTACTS,
		payload: contacts
	}
}

export function setFavoriteContactsActionCreator(
	favoriteContacts: string[]
): SetFavoriteContactsAction {
	return {
		type: SET_FAVORITE_CONTACTS,
		payload: favoriteContacts
	}
}

export function setGroupContactsActionCreator(
	groupContacts: GroupContactsDto[]
): SetGroupContactsAction {
	return {
		type: SET_GROUP_CONTACTS,
		payload: groupContacts
	}
}

export function setFilteredFavoriteContactsActionCreator(
	contacts: ContactDto[]
): SetFilteredFavoriteContactsAction {
	return {
		type: SET_FILTERED_FAVORITE_CONTACTS,
		payload: contacts
	}
}
