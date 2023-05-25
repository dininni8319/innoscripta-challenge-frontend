import React from 'react'
import styled from 'styled-components'

export const CardStyle = styled.div`
  position: relative;
  margin: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 6px;
  padding: 1rem;
  overflow: hidden;
  background: white;
`

const Card = ({ children, className, style }) => {
  return (
    <CardStyle className={className} style={style}>
      {children}
    </CardStyle>
  )
}

export default Card
