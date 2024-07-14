import { memo } from 'react'
import { Link } from 'react-router-dom'
import { ContactDto } from 'src/types/dto/ContactDto'
import styles from './contactCard.module.scss'
import { FaUserEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'

interface ContactCardProps {
	contact: ContactDto
	withLink?: boolean
}

export const ContactCard = memo<ContactCardProps>(
	({ contact: { photo, id, name, phone, birthday, address }, withLink }) => {
		return (
			<div className={styles.card}>
				<img className={styles.cardImg} src={photo} alt={name} />
				<div className={styles.cardBody}>
					<div className={styles.cardTitle}>
						{withLink ? <Link to={`/contacts/${id}`}>{name}</Link> : name}
					</div>
					<div className={styles.cardBody}>
						<ul className={styles.listGroup}>
							<li className={styles.listGroupItem}>
								Phone:
								<Link
									className={styles.phone}
									to={`tel:${phone}`}
									target='_blank'
								>
									{phone}
								</Link>
							</li>
							<li className={styles.listGroupItem}>Birthday: {birthday}</li>
							<li className={styles.listGroupItem}>Address: {address}</li>
						</ul>
					</div>
				</div>
				<div className={styles.buttonsContainer}>
					<button className={styles.buttonUser}>
						<FaUserEdit />
					</button>
					<button className={styles.buttonUser}>
						<MdDeleteForever />
					</button>
				</div>
			</div>
		)
	}
)
