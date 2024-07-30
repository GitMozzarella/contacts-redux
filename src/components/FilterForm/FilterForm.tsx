import React, { memo, useState, useEffect, useRef } from 'react'
import { debounce } from 'lodash'
import { MdPersonSearch, MdClear } from 'react-icons/md'
import { IoPersonAdd } from 'react-icons/io5'
import { setFilterValuesActionCreator } from 'src/redux/actions/actions'
import styles from './filterForm.module.scss'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { AddContactModal } from '../AddContactModal/AddContactModal'

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
		const dispatch = useAppDispatch()
		const groupContactsList = useAppSelector(state => state.groupContacts)
		const filterValues = useAppSelector(state => state.filter)

		const [values, setValues] = useState<FilterFormValues>({
			name: initialValues.name || filterValues.name || '',
			groupId: initialValues.groupId || filterValues.groupId || ''
		})

		const [isModalOpen, setIsModalOpen] = useState(false)

		const debouncedSubmitRef = useRef(
			debounce((updatedValues: FilterFormValues) => {
				onSubmit(updatedValues)
				dispatch(setFilterValuesActionCreator(updatedValues))
			}, 300)
		)

		useEffect(() => {
			debouncedSubmitRef.current(values)
		}, [values])

		useEffect(() => {
			const debouncedSubmit = debouncedSubmitRef.current
			return () => {
				debouncedSubmit.cancel()
			}
		}, [])

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
					<button
						className={styles.buttonAdd}
						type='button'
						onClick={() => setIsModalOpen(true)}
					>
						<IoPersonAdd />
					</button>
				</div>
				<AddContactModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
				/>
			</form>
		)
	}
)
