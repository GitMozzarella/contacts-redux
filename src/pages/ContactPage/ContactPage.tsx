import { FC, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ContactDto } from 'src/types/dto/ContactDto'
import styles from './contactPage.module.scss'
import { useAppSelector } from 'src/redux/hooks'
import { FcHome, FcPhone, FcCalendar } from 'react-icons/fc'
import { Loading } from 'src/components/Loading/Loading'

export const ContactPage: FC = () => {
	const { contactId } = useParams<{ contactId: string }>()
	const contacts = useAppSelector(state => state.contacts.contacts)
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
					{contact ? (
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
										<strong>
											<FcPhone />
										</strong>
										<Link
											className={styles.phone}
											to={`tel:${contact.phone}`}
											target='_blank'
										>
											{contact.phone}
										</Link>
									</li>
									<li className={styles.listGroupItem}>
										<strong>
											<FcCalendar />
										</strong>
										{contact.birthday}
									</li>
									<li className={styles.listGroupItem}>
										<strong>
											<FcHome />
										</strong>
										{contact.address}
									</li>
								</ul>
							</div>
						</div>
					) : (
						<Loading />
					)}
				</div>
			</div>
		</div>
	)
}
