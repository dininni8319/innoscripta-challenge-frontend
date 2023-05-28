import styled from 'styled-components'
import Card from '../Card'
import { funFormatDate } from '@/utils'
import defaultImage from '@/assets/images/news.avif'
import { Link } from 'react-router-dom'
import { rem } from 'polished'

export const ArticleItemStyle = styled.li`
  margin-bottom: ${rem('10px')};
  .place-item__content {
    padding: 0;
  }

  .place-item__info {
    padding: 1rem;
  }

  .place-item__image {
    width: 100%;
    height: 12.5rem;
    margin-right: 1.5rem;
  }

  .place-item__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .place-item__info h2,
  .place-item__info h3,
  .place-item__info p {
    margin: 0 0 0.5rem 0;
  }

  span {
    color: #4e4d4d;
    font-size: 14px;
    font-weight: 300;
  }

  @media (min-width: 768px) {
    .place-item__image {
      height: 20rem;
    }
  }
`

const ArticleItem = (props) => {
  const { id, author, title, content, description, urlToImage, publishedAt } =
    props

  return (
    <ArticleItemStyle className="place-item">
      <Link to={`/article/${id}`}>
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={`${urlToImage || defaultImage}`} alt={title} />
          </div>
          <div className="place-item__info">
            <h2>
              Title: <span>{title}</span>
            </h2>
            <h3>
              Author: <span>{author}</span>
            </h3>
            <h3>
              Published:<span>{funFormatDate(publishedAt)}</span>
            </h3>
            <p>
              <b>Content: </b>
              {content?.length > 0
                ? content?.slice(0, 50) + '...'
                : 'content not available'}
            </p>
            <p>
              <b>Description: </b>
              {description?.slice(0, 50)}...
            </p>
          </div>
        </Card>
      </Link>
    </ArticleItemStyle>
  )
}

export default ArticleItem
