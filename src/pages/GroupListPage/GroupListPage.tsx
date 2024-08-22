import { memo, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { fetchGroupContactsFromFirestore } from '../../redux/asyncActions/asyncActions'
import { GroupContactsCard } from 'src/components/GroupContactsCard'
import styles from './groupListPage.module.scss'
import { Loading } from 'src/components/Loading/Loading'
import { ERROR, NO_GROUPS } from 'src/constants/variables'

export const GroupListPage = memo(() => {
	const dispatch = useAppDispatch()
	const groupContacts = useAppSelector(state => state.contacts.groupContacts)
	const loading = useAppSelector(state => state.contacts.loading)
	const error = useAppSelector(state => state.contacts.error)

	useEffect(() => {
		dispatch(fetchGroupContactsFromFirestore())
	}, [dispatch])

	if (loading)
		return (
			<div className={styles.loader}>
				<Loading />
			</div>
		)
	if (error)
		return (
			<p>
				{ERROR}
				{error}
			</p>
		)

	return (
		<div className={styles.groupList}>
			{groupContacts.length === 0 ? (
				<p>{NO_GROUPS}</p>
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
