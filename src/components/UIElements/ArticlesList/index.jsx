import styled from 'styled-components'
import Card from '../Card'
import ArticleItem from '../ArticleItem'

export const ArticlesListStyle = styled.ul`
  list-style: none;
  margin: 1rem auto;
  padding: 0;
  width: 90%;
  max-width: 30rem;
`

const ArticlesList = ({ articles }) => {

  // if (articles?.length === 0) {
  //   return (
  //     <ArticlesListStyle>
  //       <Card>
  //         <h2>No article was found. Try with another keyword</h2>
  //       </Card>
  //     </ArticlesListStyle>
  //   )
  // }

  return (
    <ArticlesListStyle>
      {articles?.map((article) => (
        <ArticleItem
          key={article.id}
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
