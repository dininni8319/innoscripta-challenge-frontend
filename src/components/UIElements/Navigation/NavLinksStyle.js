import styled from 'styled-components';
import { rem } from 'polished'

export const NavLinksUl = styled.ul`
 display: flex;
 justify-content: space-around;
 width: 10%;

 li {
  cursor: pointer;
 }
`

export const UserIcon = styled.span`
  width: ${rem("30px")};
  height: ${rem("30px")};
  padding: ${rem('5px')};
  border-radius: 50%;
  color: white;
  background-color: black;
  border: 1px solid gold;
`