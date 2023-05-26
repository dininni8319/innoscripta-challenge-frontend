import styled from 'styled-components'
import { rem } from 'polished'

export const NavLinksUl = styled.ul`
  display: flex;

  li {
    cursor: pointer;
  }

  justify-content: space-around;
  width: 10%;

  @media (max-width: 768px) {
    width: 30%;
  }
`

export const UserIcon = styled.span`
  width: ${rem('30px')};
  height: ${rem('30px')};
  padding: ${rem('5px')};
  border-radius: 50%;
  color: white;
  background-color: black;
  border: 1px solid gold;
`
