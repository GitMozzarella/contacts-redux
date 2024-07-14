import { Provider } from 'react-redux'
import { ContactsProvider } from 'src/context/ContactsContext'
import { store } from 'src/redux/store'
import { Router } from 'src/router'

export const MainApp = () => {
	return (
		<Provider store={store}>
			<ContactsProvider>
				<Router />
			</ContactsProvider>
		</Provider>
	)
}
