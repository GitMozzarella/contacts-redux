import { ProjectActions } from '../actions/actions'
import { SET_AUTH } from '../actions/actionTypes'

export interface AuthState {
	user: string | null
}

const initialState: AuthState = {
	user: null
}

export function authReducer(
	state = initialState,
	action: ProjectActions
): AuthState {
	switch (action.type) {
		case SET_AUTH:
			return {
				...state,
				...action.payload
			}
		default:
			return state
	}
}
