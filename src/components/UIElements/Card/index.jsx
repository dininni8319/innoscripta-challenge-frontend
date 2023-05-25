import React from 'react'
import styled from 'styled-components';
import './Card.css'

export const Card = styled.div`
  position: relative;
  margin: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 6px;
  padding: 1rem;
  overflow: hidden;
  background: white;
`

const Card = ({ children, className }) => {
  return (
    <Card className={className} style={props.style}>
      {children}
    </Card>
  )
}

export default Card
