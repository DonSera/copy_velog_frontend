import styles from './Modal.module.css'
import {useEffect, useRef} from "react";

function Modal({header, body, footer, closeModal}) {
    const modalRef = useRef(null);

    useEffect(() => {
        document.onkeydown = function (event) {
            if (event.key === 'Escape') {
                closeModal();
            }
        }
        // 해당 파일이 열려 있을 때만 listener를 실행한다.
        window.addEventListener('click', handleRef);
        return () => {
            window.removeEventListener('click', handleRef);
            if(modalRef.current){
                modalRef.current = null;
            }
        }
    })

    function close() {
        closeModal();
        modalRef.current = null;
    }

    function handleRef(e) {
        if (!modalRef.current?.contains(e.target)) {
            close();
        }
    }

    return <div id={'modal'}>
        <div className={styles['modal-background']}/>
        <div className={styles['modal-wrap']} ref={modalRef}>
            <section className={styles['modal-header']}>
                <button type="button"
                        onClick={close}
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
    </div>
}

export default Modal;
