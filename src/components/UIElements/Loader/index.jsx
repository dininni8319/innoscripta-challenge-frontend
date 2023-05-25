import { LoadingSpinnerOverlay } from './style'

const Loader = ({ asOverlay }) => {
  return (
    <LoadingSpinnerOverlay>
      <div className="lds-dual-ring"></div>
    </LoadingSpinnerOverlay>
  )
}

export default Loader
