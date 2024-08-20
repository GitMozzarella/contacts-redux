import { memo, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { fetchGroupContactsFromFirestore } from '../../redux/asyncActions/asyncActions'
import { GroupContactsCard } from 'src/components/GroupContactsCard'
import styles from './groupListPage.module.scss'

export const GroupListPage = memo(() => {
	const dispatch = useAppDispatch()
	const groupContacts = useAppSelector(state => state.contacts.groupContacts)
	const loading = useAppSelector(state => state.contacts.loading)
	const error = useAppSelector(state => state.contacts.error)

	useEffect(() => {
		dispatch(fetchGroupContactsFromFirestore())
	}, [dispatch])

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error: {error}</p>

	return (
		<div className={styles.groupList}>
			{groupContacts.length === 0 ? (
				<p>No groups found.</p>
			) : (
				groupContacts.map(group => (
					<div key={group.id} className={styles.groupItem}>
						<GroupContactsCard groupContactsId={group.id} withLink />
					</div>
				))
			)}
		</div>
	)
})
