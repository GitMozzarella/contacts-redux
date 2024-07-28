import { memo } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { FaUserEdit } from 'react-icons/fa'
import { MdDeleteForever, MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import { FcHome, FcPhone, FcCalendar } from 'react-icons/fc'
import { openConfirmModal } from '@mantine/modals'
import {
	deleteContactActionCreator,
	toggleFavoriteContactActionCreator
} from 'src/redux/actions/actions'
import { ContactDto } from 'src/types/dto/ContactDto'
import styles from './contactCard.module.scss'
import { notifications } from '@mantine/notifications'

interface ContactCardProps {
	contact: ContactDto
	withLink?: boolean
}

export const ContactCard = memo<ContactCardProps>(
	({ contact: { photo, id, name, phone, birthday, address }, withLink }) => {
		const dispatch = useAppDispatch()
		const favoriteContacts = useAppSelector(state => state.favoriteContacts)

		const isFavorite = favoriteContacts.includes(id)

		const handleToggleFavorite = () => {
			dispatch(toggleFavoriteContactActionCreator(id))
			notifications.show({
				title: 'Уведомление',
				message: isFavorite
					? `${name} удален из избранных`
					: `${name} добавлен в избранные`,
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
			openConfirmModal({
				title: 'Подтверждение удаления',
				children: <p>Вы уверены, что хотите удалить {name}?</p>,
				labels: { confirm: 'Удалить', cancel: 'Отмена' },
				confirmProps: { color: 'blue' },
				onConfirm: () => {
					dispatch(deleteContactActionCreator(id))
					notifications.show({
						title: 'Уведомление',
						message: 'Контакт успешно удалён',
						limit: 5,
						position: 'top-center'
					})
				}
			})
		}

		return (
			<div className={styles.card}>
				<img className={styles.cardImg} src={photo} alt={name} />
				<div className={styles.cardBody}>
					<div className={styles.cardTitle}>
						{withLink ? <Link to={`/contacts/${id}`}>{name}</Link> : name}
					</div>
					<div className={styles.cardBody}>
						<ul className={styles.listGroup}>
							<li className={styles.listGroupItem}>
								<FcPhone />
								{'   '}
								<Link
									className={styles.phone}
									to={`tel:${phone}`}
									target='_blank'
								>
									{phone}
								</Link>
							</li>
							<li className={styles.listGroupItem}>
								<FcCalendar /> {'   '} {birthday}
							</li>
							<li className={styles.listGroupItem}>
								<FcHome /> {'   '} {address}
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
					<button>
						<FaUserEdit className={styles.buttonUser} />
					</button>
					<button onClick={handleDelete}>
						<MdDeleteForever className={styles.buttonUser} />
					</button>
				</div>
			</div>
		)
	}
)
