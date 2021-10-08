import styles from './Modal.module.css'

function Modal({header, body, footer, closeModal}) {
    return <>
        <div className={styles['modal-background']}/>
        <div className={styles['modal-wrap']}>
            <section className={styles['modal-header']}>
                <button type="button"
                        onClick={() => closeModal()}
                        className={styles['top-close']}
                        data-dismiss="modal"
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                {header}
            </section>
            <section className={styles['modal-body']}>
                {body}
            </section>
            <section className={styles['modal-footer']}>
                {footer}
            </section>
        </div>
    </>
}

export default Modal;
