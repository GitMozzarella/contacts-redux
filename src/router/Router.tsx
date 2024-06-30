import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from 'src/components/MainLayout'
import { DATA_CONTACT, DATA_GROUP_CONTACT } from 'src/data'
import { ContactDto } from 'src/types/dto/ContactDto'
import { FavoriteContactsDto } from 'src/types/dto/FavoriteContactsDto'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'
import { PathList } from './PathList'
import { HomePage } from 'src/pages/HomePage'
import { ContactListPage } from 'src/pages/ContactListPage'
import { ContactPage } from 'src/pages/ContactPage'
import { GroupListPage } from 'src/pages/GroupListPage'
import { GroupPage } from 'src/pages/GroupPage'
import { FavoriteListPage } from 'src/pages/FavoriteListPage'
import { NotFoundPage } from 'src/pages/NotFoundPage'

export const Router = () => {
	const [contacts, setContacts] = useState<ContactDto[]>(DATA_CONTACT)
	const [favoriteContacts, setFavoriteContacts] = useState<FavoriteContactsDto>(
		[
			DATA_CONTACT[0].id,
			DATA_CONTACT[1].id,
			DATA_CONTACT[2].id,
			DATA_CONTACT[3].id
		]
	)
	const [groupContacts, setGroupContacts] =
		useState<GroupContactsDto[]>(DATA_GROUP_CONTACT)
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path={PathList.home} element={<MainLayout />}>
						<Route index element={<HomePage />} />
						<Route
							path={PathList.allContacts}
							element={
								<ContactListPage
									contactsState={[contacts, setContacts]}
									favoriteContactsState={[
										favoriteContacts,
										setFavoriteContacts
									]}
									groupContactsState={[groupContacts, setGroupContacts]}
								/>
							}
						/>
						<Route
							path={PathList.contact}
							element={
								<ContactPage
									contactsState={[contacts, setContacts]}
									favoriteContactsState={[
										favoriteContacts,
										setFavoriteContacts
									]}
									groupContactsState={[groupContacts, setGroupContacts]}
								/>
							}
						/>
						<Route
							path={PathList.allGroups}
							element={
								<GroupListPage
									contactsState={[contacts, setContacts]}
									favoriteContactsState={[
										favoriteContacts,
										setFavoriteContacts
									]}
									groupContactsState={[groupContacts, setGroupContacts]}
								/>
							}
						/>
						<Route
							path={PathList.group}
							element={
								<GroupPage
									contactsState={[contacts, setContacts]}
									favoriteContactsState={[
										favoriteContacts,
										setFavoriteContacts
									]}
									groupContactsState={[groupContacts, setGroupContacts]}
								/>
							}
						/>
						<Route
							path={PathList.favorite}
							element={
								<FavoriteListPage
									contactsState={[contacts, setContacts]}
									favoriteContactsState={[
										favoriteContacts,
										setFavoriteContacts
									]}
									groupContactsState={[groupContacts, setGroupContacts]}
								/>
							}
						/>
						<Route path='*' element={<NotFoundPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	)
}
