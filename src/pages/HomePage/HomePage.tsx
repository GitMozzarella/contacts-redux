import { useAppStore } from 'src/redux/hooks'
import styles from './home.module.scss'

export const HomePage = () => {
	const store = useAppStore()

	const onHomePageClick = () => {
		console.log('Вы кликнули по домашней странице', store.getState())
	}
	return (
		<div className={styles.container} onClick={onHomePageClick}>
			<h1>Добро пожаловать!</h1>
			<p>
				Это домашняя страница вашего приложения контакты. Здесь вы можете
				управлять всеми вашими контактами и группами контактов. Приложение
				позволяет вам:
			</p>
			<ul>
				<li>Добавлять, редактировать и удалять контакты</li>
				<li>Создавать и управлять группами контактов</li>
				<li>Отмечать избранные контакты для быстрого доступа</li>
				<li>Поиск контактов по имени или другим параметрам</li>
			</ul>
			<p>
				Для начала работы, используйте меню навигации вверху страницы. Вы можете
				перейти к списку всех контактов, управлять группами или просмотреть
				избранные контакты. Мы стремимся сделать управление вашими контактами
				как можно более удобным и интуитивно понятным.
			</p>
		</div>
	)
}
