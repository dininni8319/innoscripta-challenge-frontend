import styled from 'styled-components'
import { rem } from 'polished'

export const Input = styled.input`
  font-family: 'Roboto', sans-serif;
  width: ${rem('400px')};
  height: ${rem('40px')};
  border: none;
  outline: none;
  cursor: pointer;

  @media screen and (max-width: 750px) {
    width: ${rem('300px')};
  }
`

export const Textarea = styled.textarea``
