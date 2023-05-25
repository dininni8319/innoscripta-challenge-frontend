import { validate } from '@/utils/validators'

export const inputReducer = (state, action) => {
  console.log("🚀 ~ file: inputReducer.js:4 ~ inputReducer ~ action:", action)
  
  switch (action.type) {
    case 'CHANGE':
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
    default:
      return state
  }
}
