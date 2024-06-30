import React, { createContext, useState } from 'react'
import { DATA_CONTACT, DATA_GROUP_CONTACT } from 'src/data'
import { ContactDto } from 'src/types/dto/ContactDto'
import { FavoriteContactsDto } from 'src/types/dto/FavoriteContactsDto'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'

interface ContactsContextType {
	contacts: ContactDto[]
	setContacts: React.Dispatch<React.SetStateAction<ContactDto[]>>
	favoriteContacts: FavoriteContactsDto
	setFavoriteContacts: React.Dispatch<React.SetStateAction<FavoriteContactsDto>>
	groupContacts: GroupContactsDto[]
	setGroupContacts: React.Dispatch<React.SetStateAction<GroupContactsDto[]>>
}

export const ContactsContext = createContext<ContactsContextType | null>(null)

export const ContactsProvider = ({
	children
}: {
	children: React.ReactNode
}) => {
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
		<ContactsContext.Provider
			value={{
				contacts,
				setContacts,
				favoriteContacts,
				setFavoriteContacts,
				groupContacts,
				setGroupContacts
			}}
		>
			{children}
		</ContactsContext.Provider>
	)
}
