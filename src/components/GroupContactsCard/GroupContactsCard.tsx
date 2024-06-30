import { memo } from 'react'
import { Link } from 'react-router-dom'
import { useContactsContext } from 'src/hooks/useContactsContext'

import styles from './groupContactsCard.module.scss'

interface GroupContactsCardProps {
	groupContactsId: string
	withLink?: boolean
}

export const GroupContactsCard = memo<GroupContactsCardProps>(
	({ groupContactsId, withLink }) => {
		const { groupContacts } = useContactsContext()

		if (!groupContacts) {
			return null
		}

		const selectedGroup = groupContacts.find(
			group => group.id === groupContactsId
		)

		if (!selectedGroup) {
			return null
		}

		const { id, name, description, photo, contactIds } = selectedGroup

		return (
			<div className={styles.card}>
				<div className={styles.header}>
					{withLink ? (
						<Link to={`/groups/${id}`} className={styles.link}>
							{name}
						</Link>
					) : (
						<span>{name}</span>
					)}
				</div>
				<div className={styles.info}>
					<img className={styles.img} src={photo} alt={name} />
					<div className={styles.rightSection}>
						<div className={styles.body}>{description}</div>
						<div className={styles.footer}>
							Contacts in group: {contactIds.length}
						</div>
					</div>
				</div>
			</div>
		)
	}
)
