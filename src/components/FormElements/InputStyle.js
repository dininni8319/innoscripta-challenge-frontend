import styled from 'styled-components'
import { rem } from 'polished'
import { Input } from '@/style/globalInputs'

export const AuthInput = styled(Input)`
  border-bottom: ${rem('1px')} solid
    ${(props) => (props.forminvalid ? 'red' : 'rgba(149,149,149,0.90)')};
  background-color: ${(props) => (props.forminvalid ? '#ffd1d1' : 'white')};
  color: ${(props) => (props.forminvalid ? 'red' : 'black')};
`
