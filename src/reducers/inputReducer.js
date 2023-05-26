import { validate } from '@/utils/validators'

export const inputReducer = (state, action) => {
  switch (action.type) {
    case 'ON_CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      }
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true
      }
    }
    case 'SEARCH_CHANGE':
      return {
        ...state,
        value: action.val
      }
    default:
      return state
  }
}
