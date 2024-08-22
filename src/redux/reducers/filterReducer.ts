import { ProjectActions } from '../actions/actions'
import { SET_FILTER_VALUES } from '../actions/actionTypes'
import { FilterFormValues } from 'src/components/FilterForm/FilterForm'

const initialFilterState: Partial<FilterFormValues> = {}

export const filterReducer = (
	state = initialFilterState,
	action: ProjectActions
): Partial<FilterFormValues> => {
	switch (action.type) {
		case SET_FILTER_VALUES:
			return action.payload
		default:
			return state
	}
}
