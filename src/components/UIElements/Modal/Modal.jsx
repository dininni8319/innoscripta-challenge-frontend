import React from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'
import Backdrop from './Backdrop'
import { CSSTransition } from 'react-transition-group'

const ModalOverlay = (props) => {
  const {
    className,
    style,
    header,
    headerClass,
    contentClass,
    onSubmit,
    children,
    footer,
    footerClass
  } = props

  const content = (
    <div className={`modal ${className}`} style={style}>
      <header className={`modal__header ${headerClass}`}>
        <h2>{header}</h2>
      </header>
      <form onSubmit={onSubmit ? onSubmit : (event) => event.preventDefault()}>
        <div className={`modal__content ${contentClass}`}>{children}</div>

        <footer className={`model__footer ${footerClass}`}>{footer}</footer>
      </form>
    </div>
  )
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'))
}

const Modal = (props) => {
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  )
}

export default Modal
