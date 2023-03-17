import { useEffect, useRef } from 'react';
import Styles from './popup.module.scss';

export function Popup({ children, setPopupState }) {
  const popup = useRef();
  useEffect(() => {
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = 'visible';
    };
  }, []);

  function handleOutsideClick(event) {
    if (!popup.current.contains(event.target)) {
      setPopupState(undefined);
    }
  }

  return (
    <div
      className={Styles.translucentLayer}
      onClick={(e) => {
        handleOutsideClick(e);
      }}
    >
      <div className={Styles.form} ref={popup}>
        {children}
      </div>
    </div>
  );
}
