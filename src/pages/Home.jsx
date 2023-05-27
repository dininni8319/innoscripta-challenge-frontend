import { useState, useEffect, useReducer, useMemo } from 'react'
import { useHttpClient } from '@/hooks/http-hook'
import {
  newsApiUrl,
  newsApiKey,
  topNewUrl,
  daysBefore,
  sortedData,
  getAllSources
} from '@/utils'
import { inputReducer } from '@/reducers/inputReducer'
import SearchInput from '@/components/SearchInput'
import ArticlesList from '@/components/UIElements/ArticlesList'
import SearchButtons from '@/components/UIElements/SearchButtons'
import SelectSource from '@/components/FormElements/Select'
import { newsArticlesData } from '@/utils/newsApiData'
import styled from 'styled-components';
import { Flex } from '@/style/globalWrappers'

export const FlexColumn = styled(Flex)`
  flex-direction: column;
`
const initialState = {
  value: ''
}

const Home = () => {
  const [searchedArticles, setSearchedArticles] = useState([])
  const [topArticles, setTopArticles] = useState([])
  const { sendRequest } = useHttpClient()
  const [pageNum, setPageNum] = useState(1)
  const [reset, setReset] = useState(false)
  
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
            `${newsApiUrl}/everything?q=${inputState.value}&from=${daysBefore(
              1
            )}&sortBy=publishedAt&apiKey=${newsApiKey}&page=${pageNum}&pageSize=12`
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
      val: ''
    })
  }
  
  useEffect(() => {
   setSearchedArticles([...newsArticlesData[0].articles])
  },[reset])

  const sources = getAllSources(searchedArticles)
  
  const handleFilteredBySource = event => {
    let selectedSource = event.target.value

    let filtered = searchedArticles.filter(article => article.source.name === selectedSource)
    setSearchedArticles(filtered)
  }

  const handleFilterByDate = () => {
    let sorted = sortedData(searchedArticles)
    console.log(sorted, 'testing the data')
    setSearchedArticles(prev => ([...sorted]))
  }
  
  const handleReset = () => {
    setReset(!reset)
  }
  return (
    <>
      <br />
      <SearchButtons
        pageNum={pageNum}
        setPageNum={setPageNum}
        searchedArticles={searchedArticles}
        topArticles={topArticles}
      />
      <SearchInput
        clearInputSearch={clearInputSearch}
        id="search"
        type="text"
        label="Search"
        dispatch={dispatch}
        placeholder="Search..."
        value={inputState.value}
      />
      <br/>
      {searchedArticles.length > 0 && (
        <FlexColumn>
          <button className="class-input-style" onClick={handleFilterByDate}>
            Filter By date
          </button>
          <SelectSource
            sources={sources}
            handleFilteredBySource={handleFilteredBySource}
          />
          <button className="class-input-style" onClick={handleReset}>
            Go back
          </button>
        </FlexColumn>
      )}
      <ArticlesList articles={searchedArticles} />
    </>
  )
}

export default Home
