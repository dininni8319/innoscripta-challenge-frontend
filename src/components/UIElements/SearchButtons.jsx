import styled from 'styled-components'

export const ButtonCounterWrapper = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 5px;
  margin-top: 20px;
`

export const ButtonCounterStyle = styled.span`
  width: 30px;
  height: 30px;
  text-align: center;
  background-color: #ccc;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  padding: 3px;
  font-weight: bold;
  border: 2px solid gold;
`

const ButtonCouter = ({
  pageNum,
  setPageNum,
  searchedArticles,
  topArticles
}) => {
  const increment = () => {
    let page = pageNum > 10 ? 10 : pageNum++
    return page
  }

  const decrement = () => {
    let page = pageNum === 1 ? 1 : pageNum--
    return page
  }

  return (
    <ButtonCounterWrapper>
      {topArticles?.length === 0 && searchedArticles?.length > 0 && (
        <>
          <ButtonCounterStyle onClick={() => setPageNum(() => decrement())}>
            {pageNum}
          </ButtonCounterStyle>

          <ButtonCounterStyle onClick={() => setPageNum(() => increment())}>
            {pageNum + 1}
          </ButtonCounterStyle>
        </>
      )}
    </ButtonCounterWrapper>
  )
}

export default ButtonCouter
