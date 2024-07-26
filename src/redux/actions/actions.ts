import {
	SET_CONTACTS,
	SET_FAVORITE_CONTACTS,
	SET_GROUP_CONTACTS,
	SET_FILTER_VALUES,
	SET_FILTERED_FAVORITE_CONTACTS,
	SetFavoriteContactsAction,
	SetContactsAction,
	SetGroupContactsAction,
	SetFilteredFavoriteContactsAction,
	SetFilterValuesAction
} from './actionTypes'
import { ContactDto } from 'src/types/dto/ContactDto'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'
import { FilterFormValues } from 'src/components/FilterForm/FilterForm'

export function setContactsActionCreator(
	contacts: ContactDto[]
): ProjectActions {
	return {
		type: SET_CONTACTS,
		payload: contacts
	}
}

export function setFavoriteContactsActionCreator(
	favoriteContacts: string[]
): ProjectActions {
	return {
		type: SET_FAVORITE_CONTACTS,
		payload: favoriteContacts
	}
}

export function setGroupContactsActionCreator(
	groupContacts: GroupContactsDto[]
): ProjectActions {
	return {
		type: SET_GROUP_CONTACTS,
		payload: groupContacts
	}
}

export function setFilteredFavoriteContactsActionCreator(
	contacts: ContactDto[]
): ProjectActions {
	return {
		type: SET_FILTERED_FAVORITE_CONTACTS,
		payload: contacts
	}
}

export function setFilterValuesActionCreator(
	values: Partial<FilterFormValues>
): ProjectActions {
	return {
		type: SET_FILTER_VALUES,
		payload: values
	}
}

export type ProjectActions =
	| SetContactsAction
	| SetFavoriteContactsAction
	| SetGroupContactsAction
	| SetFilteredFavoriteContactsAction
	| SetFilterValuesAction
