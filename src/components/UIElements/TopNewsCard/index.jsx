import styled from 'styled-components'
import { rem } from 'polished'
import { funFormatDate } from '@/utils'

export const CardTopNews = styled.div`
  width: ${rem('300px')};
  min-height: ${rem('250px')};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 5px;
  margin-bottom: 10px;

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
    border-radius: 5px;
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
    width: ${rem('350px')};
  }
`

const TopNewsCard = (props) => {
  const { id, author, title, content, description, urlToImage, publishedAt } = props

  return (
      <CardTopNews>
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
      </CardTopNews>
  )
}

export default TopNewsCard
