import { useContext } from 'react'
import { ContactsContext } from 'src/context/ContactsContext'

export const useContactsContext = () => {
	const context = useContext(ContactsContext)
	if (!context) {
		throw new Error('useContactsContext must be used within a ContactsProvider')
	}
	return context
}
