import { FormControl, IconWrapper } from '@/style/globalWrappers'
import { AuthInput } from '../FormElements/InputStyle'
import styled from 'styled-components'
import { rem } from 'polished'

export const SearchInputStyle = styled(AuthInput)`
  width: ${rem('345px')};

  @media (max-width: 750px) {
    margin-left: ${rem('10px')};
  }
`
const SearchInput = (props) => {
  const { id, type, placeHolder, label, value, dispatch, clearInputSearch } =
    props

  const changeHandler = (event) => {
    dispatch({
      type: 'SEARCH_CHANGE',
      val: event.target.value
    })
  }

  const element = (
    <SearchInputStyle
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
