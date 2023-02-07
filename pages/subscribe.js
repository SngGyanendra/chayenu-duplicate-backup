import { useEffect, useState } from 'react';
import { NextHead } from '../components/common';
import Styles from '/styles/subscribe.module.scss';
import { getAllProducts } from '../api/common';
import { ProductCard } from '../components/cards';

export default function Subscribe() {
  const [allProducts, setAllProducts] = useState([]);
  async function getData() {
    const { data } = await getAllProducts();
    setAllProducts(data);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <NextHead title={'Subscribe'} />
      <div className={Styles.subscribe}>Subscribe to Chayenu</div>
      <div className={Styles.selectProduct}>Select Product</div>
      <div className={Styles.products}>
        {allProducts.map((product) => {
          return (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          );
        })}
      </div>
    </>
  );
}
