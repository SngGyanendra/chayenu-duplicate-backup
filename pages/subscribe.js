import { useEffect, useState } from "react";
import { NextHead } from "/components/common";
import Styles from "/styles/subscribe.module.scss";
import { getAllProducts } from "../api/common";
import { ProductCard, ProductCardSkeleton } from "../components/cards";
import {
  DigitalSubscriptionForm,
  PrintDigitalSubscriptionForm,
} from "/components/forms";
import { useRouter } from "next/router";

export default function Subscribe() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [selectedProduct, setSelectedProduct] = useState(undefined);

  async function getData() {
    try {
      const query = {};
      const productQuery = {}

      const searchParams = new URLSearchParams(window.location.search);
      for (const param of searchParams) {
        query[param[0]] = param[1];
      }

      if (query.student_only === 'true') productQuery.student_only = true
      if (query.is_military_only === 'true') productQuery.is_military_only = true

      const { data } = await getAllProducts(productQuery);
      setLoading(false);
      setAllProducts(data);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError("A error occured, please try after some time");
    }
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <NextHead title="Chayenu | Subscribe" />
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
                    <div
                      key={product.id}
                      className={`${Styles.productCard} ${
                        selectedProduct?.id === product?.id
                          ? Styles.selectedCard
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedProduct(product);
                      }}
                    >
                      <ProductCard product={product} />
                    </div>
                  );
                })}
          </div>
        </>
      )}
      {error && <div className={Styles.error}>{error}</div>}
      {selectedProduct && (
        <>
          {(() => {
            if (selectedProduct.product_type.toLowerCase() === "digital") {
              return (
                <DigitalSubscriptionForm selectedProduct={selectedProduct} />
              );
            } else {
              return (
                <PrintDigitalSubscriptionForm
                  selectedProduct={selectedProduct}
                />
              );
            }
          })()}
        </>
      )}
    </>
  );
}
