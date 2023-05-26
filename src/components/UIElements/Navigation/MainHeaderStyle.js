import styled from 'styled-components'

export const HeaderStyle = styled.header`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.26);
  padding: 0 1rem;
  z-index: 5;
  justify-content: space-between;

  h1,
  a {
    font-size: 25px;
  }
`
