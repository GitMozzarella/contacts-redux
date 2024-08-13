import { ReactNode } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Loading } from '../Loading'
import { PathList } from '../../router/PathList'
import { useAppSelector } from 'src/redux/hooks'

interface PrivateRouteProps {
	children?: ReactNode
}

export function PrivateRoute({ children }: PrivateRouteProps) {
	const auth = useAppSelector(state => state.auth)
	const location = useLocation()

	if (auth === undefined) {
		return (
			<>
				<Loading />
			</>
		)
	}

	if (auth.user === null) {
		return (
			<Navigate
				to={PathList.auth}
				state={{ from: location.pathname }}
				replace
			/>
		)
	}

	return children ? <>{children}</> : <Outlet />
}
