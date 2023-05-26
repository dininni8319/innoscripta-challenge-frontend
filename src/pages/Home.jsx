import { useState, useEffect, useReducer } from 'react'
import { useHttpClient } from '@/hooks/http-hook'
import { newsApiUrl, newsApiKey } from '@/utils'
import { inputReducer } from '@/reducers/inputReducer'
import SearchInput from '@/components/SearchInput'
import ArticlesList from '@/components/UIElements/ArticlesList'

const initialState = {
  value: ''
}

const Home = () => {
  const [searchedArticles, setSearchedArticles] = useState([])
  const { sendRequest } = useHttpClient()
  const [pageNum, setPageNum] = useState(1)
  const [inputState, dispatch] = useReducer(inputReducer, initialState)

  useEffect(() => {
    if (inputState.value.length > 3) {
      const fetchPlaces = async () => {
        try {
          const responseData = await sendRequest(
            `${newsApiUrl}/everything?q=${inputState.value}&from=2023-05-01&sortBy=publishedAt&apiKey=${newsApiKey}&page=${pageNum}&pageSize=12`
          )          
          setSearchedArticles((prevState) => prevState.concat(responseData.articles))
        } catch (error) {}
      }
      fetchPlaces()
    }
  }, [sendRequest, inputState.value])

  return (
    <>
      <br />
      <SearchInput
        id="search"
        type="text"
        label="Search"
        dispatch={dispatch}
        placeholder="Search..."
        value={inputState.value}
      />
      <br />
      <br />
      <ArticlesList articles={searchedArticles} />
    </>
  )
}

export default Home
