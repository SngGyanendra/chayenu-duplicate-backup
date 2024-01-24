import { useState, useEffect, useCallback } from "react";
import Styles from './carousel.module.css';
import {rightArrow} from '/public/icons/arrow.js';
import {leftArrow} from '/public/icons/leftarrow.js';

export const Carousel = ({totalItems, renderTemplate, additionalStyles }) => {
  const [index, setIndex] = useState(0);

  const lastIndex = totalItems - 1;

  const next = useCallback(() => {
    setIndex(index === lastIndex ? 0 : index + 1);
  }, [index, lastIndex]);

  const prev = () => {
    setIndex(index === 0 ? lastIndex : index - 1);
  };

  const createIndicator = () => {
    return new Array(totalItems).fill(0).map((_, i) => (<div onClick={()=>setIndex(i)} className={`${Styles.indicator} ${i == index && Styles.currentIndicator}`} key={i}></div>));
  }


  return (
    <div className={Styles.carouselContainer} style={{...additionalStyles}}>
      <button className={`${Styles.carouselButton} ${Styles.left}`} onClick={prev} aria-label="Previous">{leftArrow}</button>
        {
            //pass a template that renders data with current index
            //Usage - <Carousel totalItems={5} renderTemplate={(data, index) => <div>{data[index]}<div>} />
            renderTemplate(index)
        }
      <button className={`${Styles.carouselButton} ${Styles.right}`} onClick={next}  aria-label="Next">{rightArrow}</button>
      <div className={Styles.currentIndicatorContainer}>
        {createIndicator()}
      </div>
    </div>
  );
}
