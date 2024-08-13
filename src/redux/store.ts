import { combineReducers, createStore } from 'redux'
import { contactsReducer } from './reducers/contactsReducer'
import { favoriteContactsReducer } from './reducers/favoriteContactsReducer'
import { groupContactsReducer } from './reducers/groupContactsReducer'
import { filterReducer } from './reducers/filterReducer'
import { authReducer } from './reducers/authReducer'

export const store = createStore(
	combineReducers({
		contacts: contactsReducer,
		favoriteContacts: favoriteContactsReducer,
		groupContacts: groupContactsReducer,
		filter: filterReducer,
		auth: authReducer
	})
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
