import { memo } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { FaUserEdit } from 'react-icons/fa'
import { MdDeleteForever, MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import { FcHome } from 'react-icons/fc'
import { FaBirthdayCake, FaPhone } from 'react-icons/fa'
import {
	deleteContactActionCreator,
	toggleFavoriteContactActionCreator
} from 'src/redux/actions/actions'
import { ContactDto } from 'src/types/dto/ContactDto'
import styles from './contactCard.module.scss'

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
		}

		const handleDelete = () => {
			dispatch(deleteContactActionCreator(id))
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
								<FaPhone />
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
								<FaBirthdayCake /> {'   '} {birthday}
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
