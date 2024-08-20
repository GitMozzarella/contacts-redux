import { memo, useState, useEffect } from 'react'
import { ContactDto } from 'src/types/dto/ContactDto'
import { ContactCard } from 'src/components/ContactCard'
import {
	FilterForm,
	FilterFormValues
} from 'src/components/FilterForm/FilterForm'
import { setFilterValues } from 'src/redux/slices/contactsSlice'
import styles from './contactListPage.module.scss'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { EmptyContactsList } from 'src/components/EmptyContactsList'
import { fetchContactsFromFirestore } from 'src/redux/asyncActions/asyncActions'

export const ContactListPage = memo(() => {
	const dispatch = useAppDispatch()
	const contacts = useAppSelector(state => state.contacts.contacts)
	const loading = useAppSelector(state => state.contacts.loading)
	const error = useAppSelector(state => state.contacts.error)
	const groupContacts = useAppSelector(state => state.contacts.groupContacts)
	const filter = useAppSelector(state => state.contacts.filter)

	const [filteredContacts, setFilteredContacts] = useState<ContactDto[]>([])

	useEffect(() => {
		dispatch(fetchContactsFromFirestore())
	}, [dispatch])

	useEffect(() => {
		setFilteredContacts(contacts)
	}, [contacts])

	useEffect(() => {
		const applyFilters = (fv: Partial<FilterFormValues>) => {
			let filtered = contacts

			if (fv.name) {
				const fvName = fv.name.toLowerCase()
				filtered = filtered.filter(({ name }) =>
					name.toLowerCase().includes(fvName)
				)
			}

			if (fv.groupId) {
				const selectedGroup = groupContacts.find(({ id }) => id === fv.groupId)

				if (selectedGroup) {
					filtered = filtered.filter(({ id }) =>
						selectedGroup.contactIds.includes(id)
					)
				}
			}

			setFilteredContacts(filtered)
		}

		applyFilters(filter)
	}, [filter, contacts, groupContacts])

	if (loading) return <div>Loading...</div>
	if (error) return <div>Error: {error}</div>

	const onSubmit = (fv: Partial<FilterFormValues>) => {
		dispatch(setFilterValues(fv))
	}

	return (
		<div className={styles.contact_listPage}>
			<div className={styles.filter_formContainer}>
				<FilterForm initialValues={filter} onSubmit={onSubmit} />
			</div>
			{filteredContacts.length === 0 ? (
				<EmptyContactsList />
			) : (
				<div className={styles.contact_cardsContainer}>
					{filteredContacts.map(contact => (
						<ContactCard key={contact.phone} contact={contact} withLink />
					))}
				</div>
			)}
		</div>
	)
})
