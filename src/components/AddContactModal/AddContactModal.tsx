import React from 'react'
import { Modal, Button, TextInput } from '@mantine/core'
import { useAppDispatch } from 'src/redux/hooks'
import { addContactActionCreator } from 'src/redux/actions/actions'
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
}

export const AddContactModal: React.FC<AddContactModalProps> = ({
	isOpen,
	onClose
}) => {
	const dispatch = useAppDispatch()

	const {
		register,
		handleSubmit,
		setValue,
		trigger,
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

	const onSubmit = (values: Omit<ContactDto, 'id'>) => {
		const newContact: ContactDto = {
			id: uuidv4(),
			...values
		}
		dispatch(addContactActionCreator(newContact))
		onClose()
	}

	const handleChange = async (
		fieldName: keyof ContactDto,
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setValue(fieldName, event.target.value)
		await trigger(fieldName)
	}

	return (
		<Modal opened={isOpen} onClose={onClose} title='Add New Contact'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextInput
					label='Name'
					placeholder='John Wick'
					{...register('name', {
						required: 'Field cannot be empty',
						validate: validateName
					})}
					onChange={event => handleChange('name', event)}
					error={errors.name?.message}
				/>
				<TextInput
					label='Phone'
					placeholder='+78652335620'
					{...register('phone', {
						required: 'Field cannot be empty',
						validate: validatePhone
					})}
					onChange={event => handlePhoneChange(event, setValue)}
					error={errors.phone?.message}
				/>
				<TextInput
					label='Birthday'
					placeholder='21.05.1995'
					{...register('birthday', {
						required: 'Field cannot be empty',
						validate: validateDate
					})}
					onInput={e => {
						e.currentTarget.value = e.currentTarget.value.replace(
							/[^0-9.]/g,
							''
						)
					}}
					onChange={event => handleChange('birthday', event)}
					error={errors.birthday?.message}
				/>
				<TextInput
					label='Address'
					placeholder="Lenin's Avenue"
					{...register('address', {
						required: 'Field cannot be empty',
						validate: validateAddress
					})}
					onChange={event => handleChange('address', event)}
					error={errors.address?.message}
				/>
				<TextInput
					label='Photo URL'
					placeholder='Enter photo URL'
					{...register('photo', {
						required: 'Field cannot be empty'
					})}
					onChange={event => handleChange('photo', event)}
					error={errors.photo?.message}
				/>
				<Button type='submit'>Add Contact</Button>
			</form>
		</Modal>
	)
}
