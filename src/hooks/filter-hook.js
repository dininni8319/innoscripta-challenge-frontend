import { useState, useEffect, useMemo } from 'react'
import { getAllSources, sortedData } from '@/utils'

export const useFilter = (
  searchedArticles,
  setSearchedArticles,
  dispatch,
  inputState
) => {
  const [selectedAuthor, setSelectedAuthor] = useState('')
  const [selectedSource, setSelectedSource] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [debounce, setDebounce] = useState(false)
  const categories = ["Sport", "Politics", "Design", "Fashion","Technology"]

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounce(!debounce)
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [inputState.value, 2000])

  let sources = useMemo(() => {
    let data = getAllSources(searchedArticles, 'name')
    return data
  }, [debounce])

  let authors = useMemo(() => {
    let data = getAllSources(searchedArticles, 'author')
    return data
  }, [debounce])

  const handleFilteredBySource = (event) => {
    let selectedSource = event.target.value

    setSelectedSource(selectedSource)
    let filtered = searchedArticles?.filter(
      (article) => article.source.name === selectedSource
    )

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

  const handleCategory = (event) => {
    let selectedCategory = event.target.value

    setSelectedCategory(selectedCategory)
  }
  const handleFilterByDate = () => {
    let sorted = sortedData(searchedArticles)
    setSearchedArticles((prev) => [...sorted])
  }

  const handlePreferences = () => {
    const preference = {
      author: selectedAuthor,
      source: selectedSource,
      category: selectedCategory,
    }

    localStorage.setItem('preference', JSON.stringify(preference))
  }

  const clearInputSearch = () => {
    setSearchedArticles([])
    dispatch({
      type: 'SEARCH_CHANGE',
      val: ''
    })
  }

  return {
    sources,
    authors,
    categories,
    selectedAuthor,
    selectedSource,
    clearInputSearch,
    handleFilteredBySource,
    handleFilteredByAuthor,
    handleFilterByDate,
    handlePreferences,
    handleCategory
  }
}
