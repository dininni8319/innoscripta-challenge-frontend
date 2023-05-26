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
  width: 25px;
  height: 25px;
  text-align: center;
  background-color: white;
  border-radius: 50%;
  cursor: pointer;
`

const ButtonCouter = ({ pageNum, setPageNum }) => {
  return (
    <ButtonCounterWrapper>
      <ButtonCounterStyle onClick={() => setPageNum((prev) => prev + 1)}>
        {pageNum}+
      </ButtonCounterStyle>

      <ButtonCounterStyle onClick={() => setPageNum((prev) => prev - 1)}>
        {pageNum} -
      </ButtonCounterStyle>
    </ButtonCounterWrapper>
  )
}

export default ButtonCouter
