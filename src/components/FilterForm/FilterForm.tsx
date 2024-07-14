import React, { memo, useState, useEffect, useRef } from 'react'
import { debounce } from 'lodash'
import { MdPersonSearch, MdClear } from 'react-icons/md'
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto'
import styles from './filterForm.module.scss'
import { IoPersonAdd } from 'react-icons/io5'

export interface FilterFormValues {
	name: string
	groupId: string
}

interface FilterFormProps {
	initialValues?: Partial<FilterFormValues>
	onSubmit: (values: Partial<FilterFormValues>) => void
	groupContactsList: GroupContactsDto[]
}

export const FilterForm = memo(
	({
		initialValues = { name: '', groupId: '' },
		onSubmit,
		groupContactsList
	}: FilterFormProps) => {
		const [values, setValues] = useState<FilterFormValues>({
			name: initialValues.name || '',
			groupId: initialValues.groupId || ''
		})

		const debouncedSubmitRef = useRef(
			debounce((updatedValues: FilterFormValues) => {
				onSubmit(updatedValues)
			}, 300)
		)

		useEffect(() => {
			debouncedSubmitRef.current(values)
		}, [values])

		const handleChange = (
			e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
		) => {
			const { name, value } = e.target
			setValues(prevValues => ({
				...prevValues,
				[name]: value
			}))
		}

		const handleClear = () => {
			setValues({ name: '', groupId: '' })
		}

		return (
			<form className={styles.filterForm} onSubmit={e => e.preventDefault()}>
				<div className={styles.formInput}>
					<div className={styles.inputContainer}>
						<input
							type='text'
							id='name'
							name='name'
							placeholder='Search contact...'
							aria-label='Name'
							value={values.name}
							onChange={handleChange}
						/>
						<MdPersonSearch className={styles.icon} />
						{values.name && (
							<MdClear className={styles.clear} onClick={handleClear} />
						)}
					</div>
				</div>
				<div className={styles.formSelect}>
					<select
						id='groupId'
						name='groupId'
						aria-label='Поиск по группе'
						value={values.groupId}
						onChange={handleChange}
					>
						<option value=''>Select a group</option>
						{groupContactsList.map(groupContacts => (
							<option value={groupContacts.id} key={groupContacts.id}>
								{groupContacts.name}
							</option>
						))}
					</select>
				</div>
				<div className={styles.buttonsContainer}>
					<button className={styles.buttonAdd}>
						<IoPersonAdd />
					</button>
				</div>
			</form>
		)
	}
)
