import { applyMiddleware, combineReducers, createStore } from 'redux'
import { contactsReducer } from './reducers/contactsReducer'
import { favoriteContactsReducer } from './reducers/favoriteContactsReducer'
import { groupContactsReducer } from './reducers/groupContactsReducer'
import { filterReducer } from './reducers/filterReducer'
import { authReducer } from './reducers/authReducer'
import { logActionMiddleware } from './logActionMiddleware'

const rootReducer = combineReducers({
	contacts: contactsReducer,
	favoriteContacts: favoriteContactsReducer,
	groupContacts: groupContactsReducer,
	filter: filterReducer,
	auth: authReducer
})

export const store = createStore(
	rootReducer,
	applyMiddleware(logActionMiddleware) as any
)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
