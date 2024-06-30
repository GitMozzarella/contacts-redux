import React, { memo, useState } from 'react'
import { CommonPageProps } from '../types'
import { ContactDto } from 'src/types/dto/ContactDto'
import { ContactCard } from 'src/components/ContactCard'
import {
	FilterForm,
	FilterFormValues
} from 'src/components/FilterForm/FilterForm'
import styles from './contactListPage.module.scss'

export const ContactListPage = memo<CommonPageProps>(
	({ contactsState, groupContactsState }) => {
		const [contacts, setContacts] = useState<ContactDto[]>(contactsState[0])

		const onSubmit = (fv: Partial<FilterFormValues>) => {
			let findContacts: ContactDto[] = contactsState[0]

			if (fv.name) {
				const fvName = fv.name.toLowerCase()
				findContacts = findContacts.filter(({ name }) =>
					name.toLowerCase().includes(fvName)
				)
			}

			if (fv.groupId) {
				const groupContacts = groupContactsState[0].find(
					({ id }) => id === fv.groupId
				)

				if (groupContacts) {
					findContacts = findContacts.filter(({ id }) =>
						groupContacts.contactIds.includes(id)
					)
				}
			}

			setContacts(findContacts)
		}

		return (
			<div className={styles.contact_listPage}>
				<div className={styles.filter_formContainer}>
					<FilterForm
						groupContactsList={groupContactsState[0]}
						initialValues={{}}
						onSubmit={onSubmit}
					/>
				</div>
				<div className={styles.contact_cardsContainer}>
					{contacts.map(contact => (
						<ContactCard key={contact.id} contact={contact} withLink />
					))}
				</div>
			</div>
		)
	}
)
