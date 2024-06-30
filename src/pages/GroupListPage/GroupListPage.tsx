import { memo } from 'react'
import { GroupContactsCard } from 'src/components/GroupContactsCard'
import styles from './groupListPage.module.scss'
import { useContactsContext } from 'src/hooks/useContactsContext'

export const GroupListPage = memo(() => {
	const { groupContacts } = useContactsContext()

	return (
		<div className={styles.groupList}>
			{groupContacts.map(group => (
				<div key={group.id} className={styles.groupItem}>
					<GroupContactsCard groupContactsId={group.id} withLink />
				</div>
			))}
		</div>
	)
})
