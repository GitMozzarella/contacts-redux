import { memo } from 'react'
import { useSelector } from 'react-redux'
import { GroupContactsCard } from 'src/components/GroupContactsCard'
import styles from './groupListPage.module.scss'
import { AppState } from 'src/redux/store'

export const GroupListPage = memo(() => {
	const groupContacts = useSelector((state: AppState) => state.groupContacts)

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
