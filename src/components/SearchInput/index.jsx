import { useEffect, useReducer } from 'react'
import { FormControl, IconWrapper } from '@/style/globalWrappers'
import { AuthInput } from '../FormElements/InputStyle'

const SearchInput = (props) => {
  const {
    id,
    type,
    placeHolder,
    label,
    value,
    dispatch,
    clearInputSearch,
  } = props

  const changeHandler = (event) => {
    dispatch({
      type: 'SEARCH_CHANGE',
      val: event.target.value
    })
  }

  const element = (
    <AuthInput
      onClick={clearInputSearch}
      id={id}
      type={type}
      placeholder={placeHolder}
      onChange={changeHandler}
      value={value}
    />
  )
  return (
    <FormControl>
      <IconWrapper>
        <label htmlFor={id}>{label}</label>
      </IconWrapper>
      {element}
    </FormControl>
  )
}

export default SearchInput
