import { combineReducers, createStore } from 'redux'
import { contactsReducer } from './reducers/contactsReducer'
import { favoriteContactsReducer } from './reducers/favoriteContactsReducer'
import { groupContactsReducer } from './reducers/groupContactsReducer'
import { filteredFavoriteContactsReducer } from './reducers/filteredFavoriteContactsReducer'
import { filterReducer } from './reducers/filterReducer'

export const store = createStore(
	combineReducers({
		contacts: contactsReducer,
		favoriteContacts: favoriteContactsReducer,
		groupContacts: groupContactsReducer,
		filteredFavoriteContacts: filteredFavoriteContactsReducer,
		filter: filterReducer
	})
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
