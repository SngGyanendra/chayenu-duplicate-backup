import Image from 'next/image';
import Styles from './productcard.module.scss';
import { directusUrl } from '/api/config';

export function ProductCard({ product }) {
  console.log(`${directusUrl}/assets/${product?.image}`);
  return (
    <div className={Styles.card}>
      <div className={Styles.name}>{product?.name}</div>
      <div className={Styles.description}>{product?.description}</div>
    </div>
  );
}
