import styled from 'styled-components'
import { rem } from 'polished'

export const Button = styled.button`
  border-radius: ${rem('30px')};
  border: 1px rgba(0, 0, 0, 0.2) solid;
  width: ${rem('150px')};
  height: ${rem('40px')};
  background: none;
  cursor: pointer;
  font-weight: bold;
  letter-spacing: ${rem('1px')};
  font-size: ${rem('10px')};

  /* for nested <Link> tabs of react-router-dom */
  a {
    font-size: inherit;
    color: inherit;
    text-decoration: none;
    height: 100%;
    width: 100%;
    display: block;
    line-height: ${rem('40px')}; /* needs to be the same as height of button */
  }
`
