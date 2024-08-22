import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { FaUserEdit } from 'react-icons/fa'
import { MdDeleteForever, MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import { FcHome, FcPhone, FcCalendar } from 'react-icons/fc'
import { openConfirmModal } from '@mantine/modals'
import {
	addContactStore,
	// deleteContactStore,
	toggleFavoriteContact
} from 'src/redux/slices/contactsSlice'
import { ContactDto } from 'src/types/dto/ContactDto'
import styles from './contactCard.module.scss'
import { notifications } from '@mantine/notifications'
import { AddContactModal } from '../AddContactModal/AddContactModal'
import { deleteContactFirestore } from 'src/redux/asyncActions/asyncActions'

interface ContactCardProps {
	contact: ContactDto
	withLink?: boolean
}

export const ContactCard = memo<ContactCardProps>(({ contact, withLink }) => {
	const dispatch = useAppDispatch()
	const favoriteContacts = useAppSelector(
		state => state.contacts.favoriteContacts
	)
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)

	const isFavorite = favoriteContacts.includes(contact.id)

	const handleToggleFavorite = () => {
		dispatch(toggleFavoriteContact(contact.id))
		notifications.show({
			title: 'Уведомление',
			message: isFavorite
				? `${contact.name} удален из избранных`
				: `${contact.name} добавлен в избранные`,
			color: isFavorite ? 'red' : 'green',
			autoClose: 2500,
			styles: {
				root: {
					backgroundColor: isFavorite ? '#fdb2b2' : '#a1fca1'
				}
			}
		})
	}

	const handleDelete = () => {
		if (!contact.docId) {
			notifications.show({
				title: 'Ошибка',
				message: 'Не удалось найти идентификатор документа для удаления.',
				color: 'red',
				autoClose: 5000
			})
			return
		}

		openConfirmModal({
			title: 'Подтверждение удаления',
			children: <p>Вы уверены, что хотите удалить {contact.name}?</p>,
			labels: { confirm: 'Удалить', cancel: 'Отмена' },
			confirmProps: { color: 'blue' },
			onConfirm: async () => {
				try {
					await dispatch(deleteContactFirestore(contact.docId)).unwrap()

					notifications.show({
						title: 'Уведомление',
						message: 'Контакт успешно удалён',
						limit: 5,
						position: 'top-center'
					})
				} catch (error) {
					console.error('Error deleting contact:', error)

					dispatch(addContactStore(contact))

					notifications.show({
						title: 'Ошибка',
						message: 'Не удалось удалить контакт. Попробуйте еще раз.',
						color: 'red',
						autoClose: 5000
					})
				}
			}
		})
	}

	const handleEdit = () => {
		setIsEditModalOpen(true)
	}

	return (
		<div className={styles.card}>
			<img className={styles.cardImg} src={contact.photo} alt={contact.name} />
			<div className={styles.cardBody}>
				<div className={styles.cardTitle}>
					{withLink ? (
						<Link to={`/contacts/${contact.id}`}>{contact.name}</Link>
					) : (
						contact.name
					)}
				</div>
				<div className={styles.cardBody}>
					<ul className={styles.listGroup}>
						<li className={styles.listGroupItem}>
							<FcPhone />
							{'   '}
							<Link
								className={styles.phone}
								to={`tel:${contact.phone}`}
								target='_blank'
							>
								{contact.phone}
							</Link>
						</li>
						<li className={styles.listGroupItem}>
							<FcCalendar /> {'   '} {contact.birthday}
						</li>
						<li className={styles.listGroupItem}>
							<FcHome /> {'   '} {contact.address}
						</li>
					</ul>
				</div>
			</div>
			<div className={styles.buttonsContainer}>
				<button onClick={handleToggleFavorite}>
					{isFavorite ? (
						<MdFavorite className={styles.buttonFavorite} />
					) : (
						<MdFavoriteBorder className={styles.buttonFavorite} />
					)}
				</button>
				<button onClick={handleEdit}>
					<FaUserEdit className={styles.buttonUser} />
				</button>
				<button onClick={handleDelete}>
					<MdDeleteForever className={styles.buttonUser} />
				</button>
			</div>
			{isEditModalOpen && (
				<AddContactModal
					isOpen={isEditModalOpen}
					onClose={() => setIsEditModalOpen(false)}
					initialData={contact}
				/>
			)}
		</div>
	)
})
