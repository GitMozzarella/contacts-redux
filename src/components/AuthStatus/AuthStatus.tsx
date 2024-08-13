import { useNavigate } from 'react-router-dom'
import styles from './status.module.scss'
import { MdLogout } from 'react-icons/md'
import { FaUserAlt } from 'react-icons/fa'
import { PathList } from '../../router/PathList'

import { setAuthActionCreator } from '../../redux/actions/actions'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'

export function AuthStatus() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const user = useAppSelector(state => state.auth.user)

	const handleSignOut = () => {
		dispatch(setAuthActionCreator({ user: null }))
		navigate(PathList.auth)
	}

	return (
		<>
			<div className={styles.message}>
				<span className={styles.logoutButton}>
					<FaUserAlt />
				</span>

				<p className={styles.username}>'{user}'</p>
				<button onClick={handleSignOut} className={styles.logoutButton}>
					<MdLogout />
				</button>
			</div>
		</>
	)
}
