import { memo } from 'react'
import { ContactCard } from 'src/components/ContactCard'
import styles from './favoriteListPage.module.scss'
import { useContactsContext } from 'src/hooks/useContactsContext'

export const FavoriteListPage = memo(() => {
	const { filteredFavoriteContacts } = useContactsContext()

	return (
		<div className={styles.favoriteList}>
			<div className={styles.contactCardsContainer}>
				{filteredFavoriteContacts.map(contact => (
					<div key={contact.id} className={styles.contactCard}>
						<ContactCard contact={contact} withLink />
					</div>
				))}
			</div>
		</div>
	)
})
