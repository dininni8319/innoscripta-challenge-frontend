import styled from 'styled-components'
import Card from '../Card'
import ArticleItem from '../ArticleItem'
import { PreferenceTitle } from '@/style/globalTitles'

export const ArticlesListStyle = styled.ul`
  list-style: none;
  padding: 0;
  max-width: 30rem;
`

const ArticlesList = ({ articles }) => {
  if (articles?.length === 0) {
    return (
      <ArticlesListStyle>
        <Card>
          <h2>Search an article with a key work!</h2>
        </Card>
      </ArticlesListStyle>
    )
  }

  return (
    <ArticlesListStyle>
      <PreferenceTitle>Articles that you searched</PreferenceTitle>
      {articles?.map((article) => (
        <ArticleItem
          key={article.id}
          id={article.id}
          author={article.author}
          title={article.title}
          content={article.content}
          description={article.description}
          image={article.urlToImage}
          urlToImage={article.urlToImage}
          publishedAt={article.publishedAt}
        />
      ))}
    </ArticlesListStyle>
  )
}

export default ArticlesList
