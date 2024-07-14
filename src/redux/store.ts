import { combineReducers, createStore } from 'redux'
import { contactsReducer } from './reducers/contactsReducer'

export const store = createStore(
	combineReducers({
		contacts: contactsReducer
	})
)
