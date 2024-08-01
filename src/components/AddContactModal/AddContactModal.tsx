import React, { useEffect } from 'react'
import { Modal, Button, TextInput } from '@mantine/core'
import { useAppDispatch } from 'src/redux/hooks'
import {
	addContactActionCreator,
	editContactActionCreator
} from 'src/redux/actions/actions'
import { ContactDto } from 'src/types/dto/ContactDto'
import { v4 as uuidv4 } from 'uuid'
import { useForm } from 'react-hook-form'
import {
	handlePhoneChange,
	validatePhone,
	validateDate,
	validateName,
	validateAddress
} from 'src/utils/validate'

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
			name: '',
			phone: '',
			birthday: '',
			address: '',
			photo: ''
		},
		mode: 'onChange'
	})

	useEffect(() => {
		if (initialData) {
			reset(initialData)
		}
	}, [initialData, reset])

	const onSubmit = (values: Omit<ContactDto, 'id'>) => {
		const newContact: ContactDto = {
			id: initialData?.id || uuidv4(),
			...values
		}

		if (initialData) {
			dispatch(editContactActionCreator(newContact))
		} else {
			dispatch(addContactActionCreator(newContact))
		}

		reset()
		onClose()
	}

	const handleChange = async (
		fieldName: keyof ContactDto,
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setValue(fieldName, event.target.value, { shouldValidate: true })
		trigger(fieldName, { shouldFocus: false })
	}

	return (
		<Modal
			opened={isOpen}
			onClose={onClose}
			title={initialData ? 'Редактировать контакт' : 'Добавить контакт'}
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextInput
					label='Имя'
					placeholder='John Wick'
					{...register('name', { validate: validateName })}
					onChange={e => handleChange('name', e)}
					error={errors.name?.message}
				/>
				<TextInput
					label='Телефон'
					placeholder='+1234567890123'
					{...register('phone', {
						validate: validatePhone,
						onChange: e => handlePhoneChange(e, setValue, trigger)
					})}
					error={errors.phone?.message}
				/>
				<TextInput
					label='День рождения'
					placeholder='21.05.1995'
					{...register('birthday', { validate: validateDate })}
					onChange={e => handleChange('birthday', e)}
					error={errors.birthday?.message}
				/>
				<TextInput
					label='Адрес'
					placeholder='Lenin’s Avenue'
					{...register('address', { validate: validateAddress })}
					onChange={e => handleChange('address', e)}
					error={errors.address?.message}
				/>
				<TextInput
					label='Фото URL'
					placeholder='Enter photo URL'
					{...register('photo', { required: 'URL фото обязателен' })}
					onChange={e => handleChange('photo', e)}
					error={errors.photo?.message}
				/>
				<Button type='submit'>{initialData ? 'Сохранить' : 'Добавить'}</Button>
			</form>
		</Modal>
	)
}
