import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ContactDto } from 'src/types/dto/ContactDto'
import { ContactCard } from 'src/components/ContactCard'
import styles from './contactPage.module.scss'
import { useContactsContext } from 'src/hooks/useContactsContext'

export const ContactPage: FC = () => {
	const { contactId } = useParams<{ contactId: string }>()
	const { contacts } = useContactsContext()
	const [contact, setContact] = useState<ContactDto | undefined>()

	useEffect(() => {
		const foundContact = contacts.find(({ id }) => id === contactId)
		if (foundContact) {
			setContact(foundContact)
		}
	}, [contactId, contacts])

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.contactCard}>
					{contact ? <ContactCard contact={contact} /> : null}
				</div>
			</div>
		</div>
	)
}
