import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from 'src/components/MainLayout'
import { PathList } from './PathList'
import { HomePage } from 'src/pages/HomePage'
import { ContactListPage } from 'src/pages/ContactListPage'
import { ContactPage } from 'src/pages/ContactPage'
import { GroupListPage } from 'src/pages/GroupListPage'
import { GroupPage } from 'src/pages/GroupPage'
import { FavoriteListPage } from 'src/pages/FavoriteListPage'
import { NotFoundPage } from 'src/pages/NotFoundPage'
import { AuthenticationForm } from 'src/pages/AuthenticationForm'

export const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={PathList.auth} element={<AuthenticationForm />} />
				<Route path={PathList.home} element={<MainLayout />}>
					<Route index element={<HomePage />} />
					<Route path={PathList.allContacts} element={<ContactListPage />} />
					<Route path={PathList.contact} element={<ContactPage />} />
					<Route path={PathList.allGroups} element={<GroupListPage />} />
					<Route path={PathList.group} element={<GroupPage />} />
					<Route path={PathList.favorite} element={<FavoriteListPage />} />
					<Route path={PathList.notFound} element={<NotFoundPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
