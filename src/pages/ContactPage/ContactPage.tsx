import { FC, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ContactDto } from 'src/types/dto/ContactDto'
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
				<div>
					{contact && (
						<div className={styles.cardContact}>
							<div className={styles.photoContact}>
								<img
									className={styles.cardImg}
									src={contact.photo}
									alt={contact.name}
								/>
								<h2>{contact.name}</h2>
							</div>
							<div className={styles.infoContact}>
								<ul className={styles.listGroup}>
									<li className={styles.listGroupItem}>
										<strong>Phone number:</strong>

										<Link
											className={styles.phone}
											to={`tel:${contact.phone}`}
											target='_blank'
										>
											{contact.phone}
										</Link>
									</li>
									<li className={styles.listGroupItem}>
										<strong>Date of birthday:</strong> {contact.birthday}
									</li>
									<li className={styles.listGroupItem}>
										<strong>Address:</strong> {contact.address}
									</li>
								</ul>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
