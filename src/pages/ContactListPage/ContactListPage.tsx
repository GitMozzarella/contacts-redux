import { memo, useState, useMemo, useCallback } from 'react'
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

export const ContactListPage = memo(() => {
	const dispatch = useAppDispatch()
	const contacts = useAppSelector(state => state.contacts.contacts)
	const groupContacts = useAppSelector(state => state.contacts.groupContacts)
	const filter = useAppSelector(state => state.contacts.filter)

	const [filteredContacts, setFilteredContacts] =
		useState<ContactDto[]>(contacts)

	const applyFilters = useCallback(
		(fv: Partial<FilterFormValues>) => {
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

			setFilteredContacts(findContacts)
		},
		[contacts, groupContacts]
	)

	const onSubmit = (fv: Partial<FilterFormValues>) => {
		dispatch(setFilterValues(fv))
		applyFilters(fv)
	}

	useMemo(() => {
		applyFilters(filter)
	}, [filter, applyFilters])

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
						<ContactCard key={contact.id} contact={contact} withLink />
					))}
				</div>
			)}
		</div>
	)
})
