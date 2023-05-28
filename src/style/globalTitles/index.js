import styled from 'styled-components'
import { rem } from 'polished'

export const Title = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-size: ${rem('40px')};
  font-weight: 300;
`

export const PreferenceTitle = styled(Title)`
  font-size: ${rem('18px')};
  margin: ${rem('20px')} ${rem("5px")};
`

export const Message = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: ${rem('14px')};
  font-weight: 400;
`
