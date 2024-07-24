import React, { memo, useState, useEffect, useRef } from 'react'
import { debounce } from 'lodash'
import { MdPersonSearch, MdClear } from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux'
import { IoPersonAdd } from 'react-icons/io5'
import { AppState, AppDispatch } from 'src/redux/store'
import { setFilterValuesActionCreator } from 'src/redux/actions/actions'
import styles from './filterForm.module.scss'

export interface FilterFormValues {
	name: string
	groupId: string
}

interface FilterFormProps {
	initialValues?: Partial<FilterFormValues>
	onSubmit: (values: Partial<FilterFormValues>) => void
}

export const FilterForm = memo(
	({
		initialValues = { name: '', groupId: '' },
		onSubmit
	}: FilterFormProps) => {
		const dispatch = useDispatch<AppDispatch>()
		const groupContactsList = useSelector(
			(state: AppState) => state.groupContacts
		)
		const filterValues = useSelector((state: AppState) => state.filter)

		const [values, setValues] = useState<FilterFormValues>({
			name: filterValues.name || '',
			groupId: filterValues.groupId || ''
		})

		const debouncedSubmitRef = useRef(
			debounce((updatedValues: FilterFormValues) => {
				onSubmit(updatedValues)
				dispatch(setFilterValuesActionCreator(updatedValues))
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
			dispatch(setFilterValuesActionCreator({ name: '', groupId: '' }))
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
						aria-label='Search by group'
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
