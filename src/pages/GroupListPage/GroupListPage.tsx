import { memo } from 'react'
import { GroupContactsCard } from 'src/components/GroupContactsCard'
import styles from './groupListPage.module.scss'
import { useAppSelector } from 'src/redux/hooks'

export const GroupListPage = memo(() => {
	const groupContacts = useAppSelector(state => state.contacts.groupContacts)

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
