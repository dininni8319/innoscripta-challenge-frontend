import { useState, useEffect, useReducer, useMemo } from 'react'
import { useHttpClient } from '@/hooks/http-hook'
import {
  newsApiUrl,
  newsApiKey,
  topNewUrl,
  guardianNewUrl,
  daysBefore,
  guardianApiKey
} from '@/utils'

import { inputReducer } from '@/reducers/inputReducer'
import SearchInput from '@/components/SearchInput'
import ArticlesList from '@/components/UIElements/ArticlesList'
import SearchButtons from '@/components/UIElements/SearchButtons'
import SelectSource from '@/components/FormElements/Select'
import { newsArticlesData } from '@/utils/newsApiData'
import { FlexColumn, Flex } from '@/style/globalWrappers'
import { PreferenceTitle } from '@/style/globalTitles'
import { useFilter } from '@/hooks/filter-hook'
import TopNewsCard from '../components/UIElements/TopNewsCard'

const Home = () => {
  const [searchedArticles, setSearchedArticles] = useState([])
  const [topArticles, setTopArticles] = useState([])

  const { sendRequest } = useHttpClient()
  const [pageNum, setPageNum] = useState(1)
  const [inputState, dispatch] = useReducer(inputReducer, { value: '' })
  const {
    sources,
    authors,
    handleReset,
    clearInputSearch,
    handleFilteredBySource,
    handleFilteredByAuthor,
    handleFilterByDate,
    handlePreferences
  } = useFilter(searchedArticles, setSearchedArticles, dispatch, inputState)
 
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
          console.log("🚀 ~ file: Home.jsx:78 ~ fetchArticles ~ responseData:", responseData)
          setSearchedArticles((prevState) =>
            responseData.articles?.concat(prevState)
          )
        } catch (error) {}
      }
      fetchArticles()
    }
  }, [sendRequest, inputState.value, pageNum])

  const articles = newsArticlesData[0].articles
  console.log("🚀 ~ file: Home.jsx:73 ~ Home ~ articles:", articles)
  return (
    <>
      <SearchButtons
        pageNum={pageNum}
        setPageNum={setPageNum}
        searchedArticles={searchedArticles}
        topArticles={topArticles}
      />
      <Flex justifyContent="center">
        <SearchInput
          clearInputSearch={clearInputSearch}
          id="search"
          type="text"
          label="Search"
          dispatch={dispatch}
          placeholder="Search..."
          value={inputState.value}
        />
      </Flex>
      <Flex justifyContent="start">
        {articles?.length > 0 && (
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
            <button className="class-input-style" onClick={handlePreferences}>
              Save preferences
            </button>
          </FlexColumn>
        )}
        <br />
        <ArticlesList articles={articles} />
        {/* <ArticlesList articles={searchedArticles} /> */}
        <div className="class-align-center">
          {topArticles?.map((topArticle) => (
            <>
              <TopNewsCard
                key={topArticle.id}
                id={topArticle.id}
                author={topArticle.author}
                title={topArticle.title}
                content={topArticle.content}
                description={topArticle.description}
                image={topArticle.urlToImage}
                urlToImage={topArticle.urlToImage}
                publishedAt={topArticle.publishedAt}
              />
              <br />
            </>
          ))}
        </div>
      </Flex>
    </>
  )
}

export default Home
