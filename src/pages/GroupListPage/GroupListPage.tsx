import { memo } from 'react'
import { CommonPageProps } from '../types'
import { GroupContactsCard } from 'src/components/GroupContactsCard'
import styles from './groupListPage.module.scss'

export const GroupListPage = memo<CommonPageProps>(({ groupContactsState }) => {
	return (
		<div className={styles.groupList}>
			{groupContactsState[0].map(groupContacts => (
				<div key={groupContacts.id} className={styles.groupItem}>
					<GroupContactsCard groupContacts={groupContacts} withLink />
				</div>
			))}
		</div>
	)
})
