import { useEffect, useState } from 'react';
import { NextHead } from '../components/common';
import Styles from '/styles/subscribe.module.scss';
import { getAllProducts } from '../api/common';
import { ProductCard, ProductCardSkeleton } from '../components/cards';

export default function Subscribe() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  async function getData() {
    try {
      const { data } = await getAllProducts();
      setLoading(false);
      setAllProducts(data);
    } catch (error) {
      setLoading(false);
      setError('A error occured, please try after some time');
    }
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <NextHead title={'Subscribe'} />
      {!error && (
        <>
          <div className={Styles.subscribe}>Subscribe to Chayenu</div>
          <div className={Styles.selectProduct}>Select Product</div>
          <div className={Styles.products}>
            {loading
              ? Array.apply(0, Array(3)).map(function (_, i) {
                  return (
                    <div key={i} className={Styles.productCard}>
                      <ProductCardSkeleton />
                    </div>
                  );
                })
              : allProducts.map((product) => {
                  return (
                    <div key={product.id} className={Styles.productCard}>
                      <ProductCard product={product} />
                    </div>
                  );
                })}
          </div>
        </>
      )}
      {error && <div className={Styles.error}>{error}</div>}
    </>
  );
}
