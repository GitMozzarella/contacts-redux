import { FilterFormValues } from 'src/components/FilterForm/FilterForm'
import { ContactDto } from 'src/types/dto/ContactDto'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'

export const SET_CONTACTS = 'SET_CONTACTS'
export const SET_FAVORITE_CONTACTS = 'SET_FAVORITE_CONTACTS'
export const SET_GROUP_CONTACTS = 'SET_GROUP_CONTACTS'
export const SET_FILTER_VALUES = 'SET_FILTER_VALUES'
export const TOGGLE_FAVORITE_CONTACT = 'TOGGLE_FAVORITE_CONTACT'
export const DELETE_CONTACT = 'DELETE_CONTACT'
export const ADD_CONTACT = 'ADD_CONTACT'
export interface SetContactsAction {
	type: typeof SET_CONTACTS
	payload: ContactDto[]
}

export interface SetFavoriteContactsAction {
	type: typeof SET_FAVORITE_CONTACTS
	payload: string[]
}
export interface SetGroupContactsAction {
	type: typeof SET_GROUP_CONTACTS
	payload: GroupContactsDto[]
}
export interface ToggleFavoriteContactAction {
	type: typeof TOGGLE_FAVORITE_CONTACT
	payload: string
}
export interface DeleteContactAction {
	type: typeof DELETE_CONTACT
	payload: string
}

export interface AddContactAction {
	type: typeof ADD_CONTACT
	payload: ContactDto
}

export interface SetFilterValuesAction {
	type: typeof SET_FILTER_VALUES
	payload: Partial<FilterFormValues>
}
