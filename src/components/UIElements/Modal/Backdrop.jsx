import ReactDOM from 'react-dom'

const Backdrop = () => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById('backdrop-hook')
  )
}

export default Backdrop
