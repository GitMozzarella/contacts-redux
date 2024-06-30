import { memo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ContactDto } from 'src/types/dto/ContactDto'
import { GroupContactsCard } from 'src/components/GroupContactsCard'
import { ContactCard } from 'src/components/ContactCard'
import styles from './groupPage.module.scss'
import { useContactsContext } from 'src/hooks/useContactsContext'

export const GroupPage = memo(() => {
	const { groupId } = useParams<{ groupId: string }>()
	const { contacts, groupContacts } = useContactsContext()
	const [filteredContacts, setFilteredContacts] = useState<ContactDto[]>([])

	useEffect(() => {
		if (groupContacts) {
			const foundGroup = groupContacts.find(group => group.id === groupId)
			if (foundGroup) {
				const filtered = contacts.filter(contact =>
					foundGroup.contactIds.includes(contact.id)
				)
				setFilteredContacts(filtered)
			}
		}
	}, [contacts, groupContacts, groupId])

	// Найдем конкретную группу контактов по groupId
	const selectedGroup = groupContacts.find(group => group.id === groupId)

	return (
		<div className={styles.groupPage}>
			{selectedGroup && (
				<div className={styles.groupContactsContainer}>
					<GroupContactsCard groupContactsId={selectedGroup.id} withLink />
				</div>
			)}
			<div className={styles.contactsContainer}>
				{filteredContacts.map(contact => (
					<div key={contact.id} className={styles.contactCard}>
						<ContactCard contact={contact} withLink />
					</div>
				))}
			</div>
		</div>
	)
})
