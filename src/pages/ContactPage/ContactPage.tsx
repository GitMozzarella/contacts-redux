import { FC, useEffect, useState } from 'react'
import { CommonPageProps } from '../types'
import { useParams } from 'react-router-dom'
import { ContactDto } from 'src/types/dto/ContactDto'
import { ContactCard } from 'src/components/ContactCard'
import styles from './contactPage.module.scss'

interface ContactPageProps extends CommonPageProps {}

export const ContactPage: FC<ContactPageProps> = ({ contactsState }) => {
	const { contactId } = useParams<{ contactId: string }>()
	const [contact, setContact] = useState<ContactDto>()

	useEffect(() => {
		const foundContact = contactsState[0].find(({ id }) => id === contactId)
		if (foundContact) {
			setContact(foundContact)
		}
	}, [contactId, contactsState])

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
