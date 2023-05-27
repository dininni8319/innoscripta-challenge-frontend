import { useState, useEffect, useReducer } from 'react'
import { useHttpClient } from '@/hooks/http-hook'
import { newsApiUrl, newsApiKey, topNewUrl, daysBefore } from '@/utils'
import { inputReducer } from '@/reducers/inputReducer'
import SearchInput from '@/components/SearchInput'
import ArticlesList from '@/components/UIElements/ArticlesList'
import SearchButtons from '@/components/UIElements/SearchButtons'

const initialState = {
  value: ''
}

const Home = () => {
  const [searchedArticles, setSearchedArticles] = useState([])
  const [topArticles, setTopArticles] = useState([])
  const { sendRequest } = useHttpClient()
  const [pageNum, setPageNum] = useState(1)

  const [inputState, dispatch] = useReducer(inputReducer, initialState)
  
  useEffect(() => {
     const fetchTopNews = async () => {
       try {
         const responseData = await sendRequest(
           `${topNewUrl}?from=${daysBefore(5)}&country=us&apiKey=${newsApiKey}`
          )
         setTopArticles((prevState) => responseData.articles?.concat(prevState))
       } catch (error) {}
     }
     fetchTopNews()
  }, [])

  useEffect(() => {
    if (inputState.value.length > 3) {
      const fetchArticles = async () => {
        try {
          const responseData = await sendRequest(
            `${newsApiUrl}/everything?q=${inputState.value}&from=${daysBefore(1)}&sortBy=publishedAt&apiKey=${newsApiKey}&page=${pageNum}&pageSize=12`
          )
          setTopArticles([])
          setSearchedArticles((prevState) =>
            responseData.articles?.concat(prevState)
          )
        } catch (error) {}
      }
      fetchArticles()
    }
  }, [sendRequest, inputState.value, pageNum])

  const clearInputSearch = () => {
    setSearchedArticles([])
    dispatch({
      type: 'SEARCH_CHANGE',
      val: ""
    })
  }

  return (
    <>
      <br />
      <SearchInput
        clearInputSearch={clearInputSearch}
        id="search"
        type="text"
        label="Search"
        dispatch={dispatch}
        placeholder="Search..."
        value={inputState.value}
      />
      <SearchButtons
        pageNum={pageNum}
        setPageNum={setPageNum}
        searchedArticles={searchedArticles}
        topArticles={topArticles}
      />
      <br />
      <br />
      <ArticlesList articles={searchedArticles} />
      <ArticlesList articles={topArticles} />
    </>
  )
}

export default Home
