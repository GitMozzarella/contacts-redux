import { ContactsProvider } from 'src/context/ContactsContext'
import { Router } from 'src/router'

export const MainApp = () => {
	return (
		<ContactsProvider>
			<Router />
		</ContactsProvider>
	)
}
