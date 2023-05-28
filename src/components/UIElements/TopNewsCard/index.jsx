import Card from '../Card'
import styled from 'styled-components'
import { rem } from 'polished'

export const CardTopNews = styled.div`
  width: ${rem('300px')};
  height: ${rem('150px')};
  margin-left: ${rem('10px')};
`

const TopNewsCard = () => {
  return (
    <Card>
      <CardTopNews>
        <h3>Testing the card</h3>
      </CardTopNews>
    </Card>
  )
}

export default TopNewsCard
