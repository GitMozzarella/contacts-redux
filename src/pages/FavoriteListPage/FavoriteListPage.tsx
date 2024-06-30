import React, { memo, useEffect, useState } from 'react'
import { CommonPageProps } from '../types'
import { ContactCard } from 'src/components/ContactCard'
import { ContactDto } from 'src/types/dto/ContactDto'
import styles from './favoriteListPage.module.scss'

export const FavoriteListPage = memo<CommonPageProps>(
	({ favoriteContactsState, contactsState }) => {
		const [contacts, setContacts] = useState<ContactDto[]>([])

		useEffect(() => {
			const filteredContacts = contactsState[0].filter(({ id }) =>
				favoriteContactsState[0].includes(id)
			)
			setContacts(filteredContacts)
		}, [contactsState, favoriteContactsState])

		return (
			<div className={styles.favoriteList}>
				<div className={styles.contactCardsContainer}>
					{contacts.map(contact => (
						<div key={contact.id} className={styles.contactCard}>
							<ContactCard contact={contact} withLink />
						</div>
					))}
				</div>
			</div>
		)
	}
)
