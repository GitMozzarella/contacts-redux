import { memo, useEffect, useState } from 'react'
import { ContactCard } from 'src/components/ContactCard'
import { ContactDto } from 'src/types/dto/ContactDto'
import styles from './favoriteListPage.module.scss'
import { useContactsContext } from 'src/hooks/useContactsContext'

export const FavoriteListPage = memo(() => {
	const { contacts, favoriteContacts } = useContactsContext()
	const [filteredContacts, setFilteredContacts] = useState<ContactDto[]>([])

	useEffect(() => {
		const filtered = contacts.filter(contact =>
			favoriteContacts.includes(contact.id)
		)
		setFilteredContacts(filtered)
	}, [contacts, favoriteContacts])

	return (
		<div className={styles.favoriteList}>
			<div className={styles.contactCardsContainer}>
				{filteredContacts.map(contact => (
					<div key={contact.id} className={styles.contactCard}>
						<ContactCard contact={contact} withLink />
					</div>
				))}
			</div>
		</div>
	)
})
