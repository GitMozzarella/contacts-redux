import { memo } from 'react'
import { Link } from 'react-router-dom'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'
import styles from './groupContactsCard.module.scss'

interface GroupContactsCardProps {
	groupContacts: GroupContactsDto
	withLink?: boolean
}

export const GroupContactsCard = memo<GroupContactsCardProps>(
	({
		groupContacts: { id, name, description, photo, contactIds },
		withLink
	}) => {
		return (
			<div className={styles.card} key={id}>
				<div className={styles.header}>
					{withLink ? <Link to={`/groups/${id}`}>{name}</Link> : name}
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
