import { useEffect, useRef } from 'react';
import Styles from './popup.module.scss';

export function Popup({ children, setPopupState, additionalStyles, innerDivClassNames }) {
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
      style={{...additionalStyles}}
      onClick={(e) => {
        handleOutsideClick(e);
      }}
    >
      <div className={innerDivClassNames} ref={popup} >
        {children}
      </div>
    </div>
  );
}
