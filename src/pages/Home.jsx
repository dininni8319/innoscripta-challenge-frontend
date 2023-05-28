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
import { FlexColumn, Flex } from '@/style/globalWrappers'
import { PreferenceTitle } from '../style/globalTitles'

const initialState = {
  value: ''
}

const Home = () => {
  const [searchedArticles, setSearchedArticles] = useState([])
  const [topArticles, setTopArticles] = useState([])
  const [selectedAuthor, setSelectedAuthor] = useState('')
  const [selectedSource, setSelectedSource] = useState('')
  const { sendRequest } = useHttpClient()
  const [pageNum, setPageNum] = useState(1)
  const [reset, setReset] = useState(false)
  const [inputState, dispatch] = useReducer(inputReducer, initialState)

  const preferenceSettings = () => {
    const preference = {
      author: selectedAuthor,
      source: selectedSource,
      category: ''
    }

    localStorage.setItem("preference", JSON.stringify(preference))
  }
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
   let preference = JSON.parse(localStorage.getItem('preference'))
   if (preference) {
     let source = preference.source
     let author = preference.author
     let category = preference.category
     let defaultPreference = searchedArticles.filter(el => el.author === author && el.source.name === source)
     console.log("🚀 ~ file: Home.jsx:89 ~ useEffect ~ defaultPreference:", defaultPreference)
     
     setSearchedArticles(defaultPreference)
   }
   setSearchedArticles([...newsArticlesData[0].articles])
  },[reset])

  const sources = getAllSources(searchedArticles, 'name')
  let authors = getAllSources(searchedArticles, 'author')
  
  const handleFilteredBySource = event => {
    let selectedSource = event.target.value
    setSelectedSource(selectedSource)
    let filtered = searchedArticles?.filter(article => article.source.name === selectedSource)
    setSearchedArticles(filtered)
  }

  const handleFilteredByAuthor = (event) => {
    let selectedAuthor = event.target.value

    setSelectedAuthor(selectedAuthor)
    let filtered = searchedArticles?.filter(
      (article) => article.author === selectedAuthor
    )
    
    setSearchedArticles(filtered)
  }

  const handleFilterByDate = () => {
    let sorted = sortedData(searchedArticles)
    setSearchedArticles(prev => ([...sorted]))
  }
  
  const handleReset = () => {
    setReset(!reset)
  }

  return (
    <>
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
      <Flex>
        {searchedArticles.length > 0 && (
          <FlexColumn>
            <button className="class-input-style" onClick={handleFilterByDate}>
              Filter By date
            </button>
            <SelectSource
              sources={sources}
              handleFilteredBySource={handleFilteredBySource}
              text="a source"
            />
            <button className="class-input-style" onClick={handleReset}>
              Go back
            </button>
            <PreferenceTitle>Set your preferences</PreferenceTitle>
            <SelectSource
              sources={authors}
              handleFilteredBySource={handleFilteredByAuthor}
              text="an author"
            />
            <SelectSource
              sources={sources}
              handleFilteredBySource={handleFilteredBySource}
              text="a source"
            />
            <button onClick={preferenceSettings}>Save preferences</button>
          </FlexColumn>
        )}
        <ArticlesList articles={searchedArticles} />
      </Flex>
    </>
  )
}

export default Home
