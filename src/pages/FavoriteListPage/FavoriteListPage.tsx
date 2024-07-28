import { memo, useEffect, useState } from 'react'
import { ContactCard } from 'src/components/ContactCard'
import styles from './favoriteListPage.module.scss'
import { ContactDto } from 'src/types/dto/ContactDto'
import { useAppSelector } from 'src/redux/hooks'
import { EmptyListFavorites } from 'src/constants/variables'

const findContactsByIds = (
	ids: string[],
	allContacts: ContactDto[]
): ContactDto[] => {
	return allContacts.filter(contact => ids.includes(contact.id))
}

export const FavoriteListPage = memo(() => {
	const favoriteContacts = useAppSelector(state => state.favoriteContacts)
	const contacts = useAppSelector(state => state.contacts)
	const [filteredFavoriteContacts, setFilteredFavoriteContacts] = useState<
		ContactDto[]
	>([])

	useEffect(() => {
		setFilteredFavoriteContacts(findContactsByIds(favoriteContacts, contacts))
	}, [favoriteContacts, contacts])

	return (
		<div className={styles.favoriteList}>
			{filteredFavoriteContacts.length === 0 ? (
				<div className={styles.emptyListFavorites}>{EmptyListFavorites}</div>
			) : (
				<div className={styles.contactCardsContainer}>
					{filteredFavoriteContacts.map(contact => (
						<div key={contact.id} className={styles.contactCard}>
							<ContactCard contact={contact} withLink />
						</div>
					))}
				</div>
			)}
		</div>
	)
})
