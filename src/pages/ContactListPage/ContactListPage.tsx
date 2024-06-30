import { memo } from 'react'
import { ContactDto } from 'src/types/dto/ContactDto'
import { ContactCard } from 'src/components/ContactCard'
import {
	FilterForm,
	FilterFormValues
} from 'src/components/FilterForm/FilterForm'
import styles from './contactListPage.module.scss'
import { useContactsContext } from 'src/hooks/useContactsContext'

export const ContactListPage = memo(() => {
	const { contacts, setContacts, groupContacts } = useContactsContext()

	const onSubmit = (fv: Partial<FilterFormValues>) => {
		let findContacts: ContactDto[] = contacts

		if (fv.name) {
			const fvName = fv.name.toLowerCase()
			findContacts = findContacts.filter(({ name }) =>
				name.toLowerCase().includes(fvName)
			)
		}

		if (fv.groupId) {
			const selectedGroup = groupContacts.find(({ id }) => id === fv.groupId)

			if (selectedGroup) {
				findContacts = findContacts.filter(({ id }) =>
					selectedGroup.contactIds.includes(id)
				)
			}
		}

		setContacts(findContacts)
	}

	return (
		<div className={styles.contact_listPage}>
			<div className={styles.filter_formContainer}>
				<FilterForm
					groupContactsList={groupContacts}
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
})
