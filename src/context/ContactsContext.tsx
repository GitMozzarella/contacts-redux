import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { DATA_CONTACT, DATA_GROUP_CONTACT } from 'src/data'
import { ContactDto } from 'src/types/dto/ContactDto'
import { FavoriteContactsDto } from 'src/types/dto/FavoriteContactsDto'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'

interface ContactsContextType {
	contacts: ContactDto[]
	setContacts: (contacts: ContactDto[]) => void
	favoriteContacts: FavoriteContactsDto
	setFavoriteContacts: (favoriteContacts: FavoriteContactsDto) => void
	groupContacts: GroupContactsDto[]
	setGroupContacts: (groupContacts: GroupContactsDto[]) => void
	filteredFavoriteContacts: ContactDto[]
}

export const ContactsContext = createContext<ContactsContextType | null>(null)

export const ContactsProvider = ({ children }: { children: ReactNode }) => {
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
	const [filteredFavoriteContacts, setFilteredFavoriteContacts] = useState<
		ContactDto[]
	>([])

	useEffect(() => {
		const filtered = contacts.filter(contact =>
			favoriteContacts.includes(contact.id)
		)
		setFilteredFavoriteContacts(filtered)
	}, [contacts, favoriteContacts])

	return (
		<ContactsContext.Provider
			value={{
				contacts,
				setContacts,
				favoriteContacts,
				setFavoriteContacts,
				groupContacts,
				setGroupContacts,
				filteredFavoriteContacts
			}}
		>
			{children}
		</ContactsContext.Provider>
	)
}
