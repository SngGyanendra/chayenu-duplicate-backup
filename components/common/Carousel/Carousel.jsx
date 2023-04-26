import { useState } from "react";
import Styles from './carousel.module.css';
import {rightArrow} from '/public/icons/arrow.js';
import {leftArrow} from '/public/icons/leftarrow.js';

export const Carousel = ({totalItems, renderTemplate }) => {
  const [index, setIndex] = useState(0);

  const lastIndex = totalItems - 1;

  const next = () => {
    setIndex(index === lastIndex ? 0 : index + 1);
  };

  const prev = () => {
    setIndex(index === 0 ? lastIndex : index - 1);
  };

  return (
    <div className={Styles.carouselContainer}>
      <button className={`${Styles.carouselButton} ${Styles.left}`} onClick={prev}>{leftArrow}</button>
        {
            //pass a template that renders data with current index
            //Usage - <Carousel totalItems={5} renderTemplate={(data, index) => <div>{data[index]}<div>} />
            renderTemplate(index)
        }
      <button className={`${Styles.carouselButton} ${Styles.right}`} onClick={next}>{rightArrow}</button>
    </div>
  );
}
