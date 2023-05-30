import { useState, useEffect, useReducer } from 'react'
import { useHttpClient } from '@/hooks/http-hook'
import {
  newsApiUrl,
  newsApiKey,
  topNewUrl,
  daysBefore,
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
  const articles = newsArticlesData[0].articles
  const {
    sources,
    authors,
    clearInputSearch,
    handleFilteredBySource,
    handleFilteredByAuthor,
    handleFilterByDate,
    handlePreferences,
    handleCategory,
    categories
  } = useFilter(articles, setSearchedArticles, dispatch, inputState)
 
  let preference = JSON.parse(localStorage.getItem("preference"))

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
            `${newsApiUrl}/top-headlines?q=${
              inputState.value
            }&from=${daysBefore(
              1
            )}&sortBy=publishedAt&apiKey=${newsApiKey}&page=${pageNum}&pageSize=12`
          )
          setSearchedArticles((prevState) =>
            responseData.articles?.concat(prevState)
          )
        } catch (error) {}
      }
      fetchArticles()
    } 
  }, [sendRequest, inputState.value, pageNum])
  
   useEffect(() => {
    if (preference) {
       const fetchArticles = async () => {
         try {
           const responseData = await sendRequest(
             `${newsApiUrl}/everything?q=${preference.source}&author=${
               preference.author
             }&${preference.category}&from=${daysBefore(
               5
             )}&sortBy=publishedAt&apiKey=${newsApiKey}&page=${pageNum}&pageSize=12`
           )
           
           setSearchedArticles((prevState) =>
             responseData.articles?.concat(prevState)
           )
         } catch (error) {}
       }
       fetchArticles()
    }
   }, [])
  
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
      <Flex justifyContent="center">
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
            <SelectSource
              sources={categories}
              handleFilteredBySource={handleCategory}
              text="a category"
            />
            <button className="class-input-style" onClick={handlePreferences}>
              {preference && (
                <span className="class-blue">Update your preferences</span>
              )}{' '}
              {!preference && (
                <span className="class-green">Save your prefrences</span>
              )}
            </button>
          </FlexColumn>
        )}
        <br />
        <Flex>
          <ArticlesList articles={searchedArticles} />
        </Flex>
        <div className="class-align-center">
          <PreferenceTitle>Articles found</PreferenceTitle>
          {topArticles?.map((topArticle) => (
            <Flex>
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
            </Flex>
          ))}
        </div>
      </Flex>
    </>
  )
}

export default Home
