import css from './Modal.module.css';

export const Modal = ({ closeModal, closeBackdrop, src, alt }) => {
  return (
    <div className={css.overlay} onClick={closeBackdrop}>
      <button className={css.closeButton} onClick={closeModal}>
        x
      </button>
      <div className={css.modal}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
};
