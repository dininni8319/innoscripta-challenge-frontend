import styled from 'styled-components'
import Card from '../Card'
import { funFormatDate } from '@/utils'

export const ArticleItemStyle = styled.li`
  margin: 1rem 0;

  .place-item__content {
    padding: 0;
  }

  .place-item__info {
    padding: 1rem;
    text-align: center;
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

  .place-item__actions {
    padding: 1rem;
    text-align: center;
    border-top: 1px solid #ccc;
  }

  .place-item__modal-content {
    padding: 0;
  }

  .place-item__modal-actions {
    text-align: right;
  }

  .place-item__actions button,
  .place-item__actions a {
    margin: 0.5rem;
  }

  .map-container {
    height: 15rem;
    width: 100%;
  }

  @media (min-width: 768px) {
    .place-item__image {
      height: 20rem;
    }
  }
`

const ArticleItem = (props) => {
  const { author, title, content, description, urlToImage, publishedAt } = props
  return (
    <ArticleItemStyle className="place-item">
      <Card className="place-item__content">
        {/* {loading && <LoadingSpinner asOverlay />} */}
        <div className="place-item__image">
          <img src={`${urlToImage}`} alt={title} />
        </div>
        <div className="place-item__info">
          <h2>Title: {title}</h2>
          <h3>
            Author{author} <span>Published:{funFormatDate(publishedAt)}</span>
          </h3>
          <p>{content?.slice(0, 40)}</p>
          <p>{description?.slice(0, 40)}</p>
        </div>
      </Card>
    </ArticleItemStyle>
  )
}

export default ArticleItem
