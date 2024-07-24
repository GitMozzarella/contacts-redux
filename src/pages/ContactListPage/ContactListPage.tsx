import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState, AppDispatch } from 'src/redux/store'
import { ContactDto } from 'src/types/dto/ContactDto'
import { ContactCard } from 'src/components/ContactCard'
import {
	FilterForm,
	FilterFormValues
} from 'src/components/FilterForm/FilterForm'
import styles from './contactListPage.module.scss'
import { setContactsActionCreator } from 'src/redux/actions/actions'

export const ContactListPage = memo(() => {
	const dispatch = useDispatch<AppDispatch>()
	const contacts = useSelector((state: AppState) => state.contacts)
	const groupContacts = useSelector((state: AppState) => state.groupContacts)

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

		dispatch(setContactsActionCreator(findContacts)) // Теперь TypeScript знает, что это допустимый экшен
	}

	return (
		<div className={styles.contact_listPage}>
			<div className={styles.filter_formContainer}>
				<FilterForm initialValues={{}} onSubmit={onSubmit} />
			</div>

			<div className={styles.contact_cardsContainer}>
				{contacts.map(contact => (
					<ContactCard key={contact.id} contact={contact} withLink />
				))}
			</div>
		</div>
	)
})
