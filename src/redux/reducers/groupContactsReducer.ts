import {
	SET_GROUP_CONTACTS,
	SetGroupContactsAction
} from '../actions/actionTypes'
import { DATA_GROUP_CONTACT } from 'src/data'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'

const initialGroupContactsState: GroupContactsDto[] = DATA_GROUP_CONTACT

export const groupContactsReducer = (
	state = initialGroupContactsState,
	action: SetGroupContactsAction
): GroupContactsDto[] => {
	switch (action.type) {
		case SET_GROUP_CONTACTS:
			return action.payload
		default:
			return state
	}
}
