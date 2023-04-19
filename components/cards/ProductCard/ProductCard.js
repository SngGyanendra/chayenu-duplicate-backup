import Styles from './productcard.module.scss';
import { directusUrl } from '/api/config';

export function ProductCard({ product }) {
  return (
    <div className={Styles.card}>
      <div className={Styles.name}>{product?.name}</div>
      <div
        className={Styles.image}
        style={{
          backgroundImage: `url(${directusUrl}/assets/${product?.image?.id})`,
        }}
      ></div>
      <div className={Styles.type}>
        {(() => {
          if (product.product_type.toLowerCase() === 'Both'.toLowerCase()) {
            return 'PRINT + DIGITAL';
          } else if (
            product.product_type.toLowerCase() === 'Digital'.toLowerCase()
          ) {
            return 'DIGITAL ONLY';
          } else if (
            product.product_type.toLowerCase() === 'Print'.toLowerCase()
          ) {
            return 'PRINT ONLY';
          }
        })()}
      </div>
      {console.log(product)}
      <div className={Styles.price}>{product?.pricing_text}</div>
      <div className={Styles.price_description}>
        {product?.price_description}
      </div>
      <div className={Styles.description}>
        <span>{product?.description}</span>
      </div>
    </div>
  );
}
