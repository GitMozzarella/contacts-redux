import { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ContactCard } from 'src/components/ContactCard'
import styles from './favoriteListPage.module.scss'
import { AppState } from 'src/redux/store'
import { ContactDto } from 'src/types/dto/ContactDto'

const findContactsByIds = (
	ids: string[],
	allContacts: ContactDto[]
): ContactDto[] => {
	return allContacts.filter(contact => ids.includes(contact.id))
}

export const FavoriteListPage = memo(() => {
	const favoriteContacts = useSelector(
		(state: AppState) => state.favoriteContacts
	)
	const contacts = useSelector((state: AppState) => state.contacts)
	const [filteredFavoriteContacts, setFilteredFavoriteContacts] = useState<
		ContactDto[]
	>([])

	useEffect(() => {
		setFilteredFavoriteContacts(findContactsByIds(favoriteContacts, contacts))
	}, [favoriteContacts, contacts])

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
