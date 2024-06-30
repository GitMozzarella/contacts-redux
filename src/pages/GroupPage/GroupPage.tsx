import React, { memo, useEffect, useState } from 'react'
import { CommonPageProps } from '../types'
import { useParams } from 'react-router-dom'
import { ContactDto } from 'src/types/dto/ContactDto'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'
import { GroupContactsCard } from 'src/components/GroupContactsCard'
import { ContactCard } from 'src/components/ContactCard'
import styles from './groupPage.module.scss'

export const GroupPage = memo<CommonPageProps>(
	({ contactsState, groupContactsState }) => {
		const { groupId } = useParams<{ groupId: string }>()
		const [contacts, setContacts] = useState<ContactDto[]>([])
		const [groupContacts, setGroupContacts] = useState<GroupContactsDto>()

		useEffect(() => {
			const findGroup = groupContactsState[0].find(({ id }) => id === groupId)
			setGroupContacts(findGroup)
			setContacts(() => {
				if (findGroup) {
					return contactsState[0].filter(({ id }) =>
						findGroup.contactIds.includes(id)
					)
				}
				return []
			})
		}, [contactsState, groupContactsState, groupId])

		return (
			<div className={styles.groupPage}>
				{groupContacts && (
					<div className={styles.groupContactsContainer}>
						<GroupContactsCard groupContacts={groupContacts} />
					</div>
				)}
				<div className={styles.contactsContainer}>
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
