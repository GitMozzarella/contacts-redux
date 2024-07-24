import { combineReducers, createStore } from 'redux'
import { contactsReducer } from './reducers/contactsReducer'
import { favoriteContactsReducer } from './reducers/favoriteContactsReducer'
import { groupContactsReducer } from './reducers/groupContactsReducer'
import { filteredFavoriteContactsReducer } from './reducers/filteredFavoriteContactsReducer'
import { filterReducer } from './reducers/filterReducer'

export const rootReducer = combineReducers({
	contacts: contactsReducer,
	favoriteContacts: favoriteContactsReducer,
	groupContacts: groupContactsReducer,
	filteredFavoriteContacts: filteredFavoriteContactsReducer,
	filter: filterReducer
})

export const store = createStore(rootReducer)

export type AppState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
