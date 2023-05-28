import { useState, useEffect, useMemo } from 'react'
import {
  getAllSources,
  sortedData,
} from '@/utils'

export const useFilter = (searchedArticles, setSearchedArticles, dispatch, inputState) => {
  const [selectedAuthor, setSelectedAuthor] = useState('')
  const [selectedSource, setSelectedSource] = useState('')
  const [reset, setReset] = useState(false)
  const [debounce, setDebounce] = useState(false)

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

  const handleReset = () => {
    setReset(!reset)
  }

  const handleFilteredBySource = event => {
    let selectedSource = event.target.value

    setSelectedSource(selectedSource)
    let filtered = searchedArticles?.filter(article => article.source.name === selectedSource)
    
    setSearchedArticles(filtered)
  }

  const handleFilteredByAuthor = event => {
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

  const handlePreferences = () => {
    const preference = {
      author: selectedAuthor,
      source: selectedSource,
      category: ''
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

  useEffect(() => {
    let preference = JSON.parse(localStorage.getItem('preference'))
    if (preference) {
      let source = preference.source
      let author = preference.author
      let category = preference.category
      let defaultPreference = searchedArticles.filter(
        (el) => el.author === author && el.source.name === source
      )

      setSearchedArticles(defaultPreference)
    }
    //  setSearchedArticles([...newsArticlesData[0].articles])
  }, [reset])

  return {
    sources,
    authors,
    selectedAuthor,
    selectedSource,
    handleReset,
    clearInputSearch,
    handleFilteredBySource,
    handleFilteredByAuthor, 
    handleFilterByDate,
    handlePreferences
  }
}