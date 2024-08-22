import React, { useEffect } from 'react'
import { Modal, Button, TextInput } from '@mantine/core'
import { useAppDispatch } from 'src/redux/hooks'
import { ContactDto } from 'src/types/dto/ContactDto'

import { useForm } from 'react-hook-form'
import {
	handlePhoneChange,
	validatePhone,
	validateDate,
	validateName,
	validateAddress
} from 'src/utils/validate'
// import {addContactStore,
// editContactStore} from 'src/redux/slices/contactsSlice'
import styles from './index.module.scss'
import {
	addContactFirestore,
	editContactFirestore
} from 'src/redux/asyncActions/asyncActions'
import { EMPTY_STRING, NAME_STRING } from 'src/constants/variables'
import { messages } from 'src/constants/messages'

interface AddContactModalProps {
	isOpen: boolean
	onClose: () => void
	initialData?: ContactDto
}

export const AddContactModal: React.FC<AddContactModalProps> = ({
	isOpen,
	onClose,
	initialData
}) => {
	const dispatch = useAppDispatch()
	const {
		register,
		handleSubmit,
		setValue,
		trigger,
		reset,
		formState: { errors }
	} = useForm<ContactDto>({
		defaultValues: {
			name: EMPTY_STRING,
			phone: EMPTY_STRING,
			birthday: EMPTY_STRING,
			address: EMPTY_STRING,
			photo: EMPTY_STRING
		},
		mode: 'onChange'
	})

	useEffect(() => {
		if (initialData) {
			reset(initialData)
		}
	}, [initialData, reset])

	const onSubmit = (values: Omit<ContactDto, 'id'>) => {
		if (initialData) {
			const updatedContact: ContactDto = {
				id: initialData.id,

				...values
			}
			dispatch(editContactFirestore(updatedContact))
		} else {
			dispatch(addContactFirestore(values))
		}

		reset()
		onClose()
	}

	const handleChange = async (
		fieldName: keyof ContactDto,
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = event.target.value
		const correctedValue =
			fieldName === NAME_STRING
				? value.charAt(0).toUpperCase() + value.slice(1)
				: value

		setValue(fieldName, correctedValue, { shouldValidate: true })
		trigger(fieldName, { shouldFocus: false })
	}
	return (
		<Modal
			opened={isOpen}
			onClose={onClose}
			title={initialData ? messages.editContact : messages.addContact}
			classNames={{ title: styles.modalTitle }}
		>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<TextInput
					label='Имя'
					placeholder='John Wick'
					{...register('name', { validate: validateName })}
					onChange={e => handleChange('name', e)}
					error={errors.name?.message}
					className={styles.textInput}
				/>
				<TextInput
					label='Телефон'
					placeholder='+1234567890123'
					{...register('phone', {
						validate: validatePhone,
						onChange: e => handlePhoneChange(e, setValue, trigger)
					})}
					error={errors.phone?.message}
					className={styles.textInput}
				/>
				<TextInput
					label='День рождения'
					placeholder='21.05.1995'
					{...register('birthday', { validate: validateDate })}
					onChange={e => handleChange('birthday', e)}
					error={errors.birthday?.message}
					className={styles.textInput}
				/>
				<TextInput
					label='Адрес'
					placeholder='Lenin’s Avenue'
					{...register('address', { validate: validateAddress })}
					onChange={e => handleChange('address', e)}
					error={errors.address?.message}
					className={styles.textInput}
				/>
				<TextInput
					label='Фото URL'
					placeholder='Enter photo URL'
					{...register('photo', { required: 'URL фото обязателен' })}
					onChange={e => handleChange('photo', e)}
					error={errors.photo?.message}
					className={styles.textInput}
				/>
				<Button type='submit' className={styles.button}>
					{initialData ? messages.save : messages.add}
				</Button>
			</form>
		</Modal>
	)
}
