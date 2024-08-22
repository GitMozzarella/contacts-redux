export enum NavMenu {
	allContacts = 'Контакты',
	allGroups = 'Группы',
	favorites = 'Избранные'
}

export const EmptyList = 'Нет контактов'
export const EmptyListSearch = 'Контакт с таким именем не найден'
export const EmptyListFavorites = 'Нет избранных контактов'
export const ErrorFetchGroupsData = 'Error fetching groups data:'
export const ErrorFetchContactsData = 'Error fetching contacts data:'
export const FailedFetchGroupsData = 'Failed to fetch groups data'
export const FailedFetchContactsData = 'Failed to fetch contacts data'
export const groups = 'groups'
export const contacts = 'contacts'

export const FETCH_CONTACTS = 'contacts/fetchContactsFromFirestore'
export const FETCH_GROUP_CONTACTS = 'contacts/fetchGroupContactsFromFirestore'

export const ERROR = 'Error:'
export const NO_GROUPS = 'No groups found.'
