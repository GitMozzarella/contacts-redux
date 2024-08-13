import {
	SET_CONTACTS,
	SET_FAVORITE_CONTACTS,
	SET_GROUP_CONTACTS,
	SET_FILTER_VALUES,
	SetFavoriteContactsAction,
	SetContactsAction,
	SetGroupContactsAction,
	SetFilterValuesAction,
	TOGGLE_FAVORITE_CONTACT,
	ToggleFavoriteContactAction,
	DeleteContactAction,
	DELETE_CONTACT,
	AddContactAction,
	ADD_CONTACT,
	EDIT_CONTACT,
	EditContactAction,
	SET_AUTH,
	SetAuthAction
} from './actionTypes'
import { ContactDto } from 'src/types/dto/ContactDto'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'
import { FilterFormValues } from 'src/components/FilterForm/FilterForm'
import { AuthState } from '../reducers/authReducer'

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

export function setFilterValuesActionCreator(
	values: Partial<FilterFormValues>
): ProjectActions {
	return {
		type: SET_FILTER_VALUES,
		payload: values
	}
}

export const toggleFavoriteContactActionCreator = (
	contactId: string
): ToggleFavoriteContactAction => ({
	type: TOGGLE_FAVORITE_CONTACT,
	payload: contactId
})
export const deleteContactActionCreator = (
	contactId: string
): DeleteContactAction => ({
	type: DELETE_CONTACT,
	payload: contactId
})

export const addContactActionCreator = (
	contact: ContactDto
): AddContactAction => ({
	type: ADD_CONTACT,
	payload: contact
})

export const editContactActionCreator = (
	contact: ContactDto
): EditContactAction => ({
	type: EDIT_CONTACT,
	payload: contact
})

export function setAuthActionCreator(authState: AuthState): ProjectActions {
	return {
		type: SET_AUTH,
		payload: authState
	}
}

export type ProjectActions =
	| SetContactsAction
	| SetFavoriteContactsAction
	| SetGroupContactsAction
	| SetFilterValuesAction
	| ToggleFavoriteContactAction
	| DeleteContactAction
	| AddContactAction
	| EditContactAction
	| SetAuthAction
