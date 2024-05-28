import { useState, useCallback } from "react";
import Image from "next/image";
import { NextHead } from "../components/common";
import Styles from "../styles/subscribe.module.scss";
import { getAllProducts } from "../api/common";
import { getAllPlansUnfiltered } from "../api/subscribe";
import { useWindowDimensions } from "../hooks";
import { ProductCard } from "../components/cards";
import {
  DigitalSubscriptionForm,
  PrintDigitalSubscriptionForm,
} from "../components/forms";
import { getCountriesFromPlans } from "../util";

export default function Subscribe({ query, products: allProducts, plans }) {
  const [productPlans, setProductPlans] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(undefined);
  const countriesList = getCountriesFromPlans(plans);

  const { width } = useWindowDimensions();

  const autoScroll = useCallback(
    (node) => {
      if (node != null) {
        node.scrollIntoView({ behavior: "smooth" });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Shut up ESLint
    [selectedProduct]
  );

  const centerCardStyles = { transform: "scale(1.1)" };

  function getContentHeader() {
    if (query.is_military_only) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "24px",
          }}
        >
          <Image
            src="/us-army.svg"
            alt="logo"
            height={100}
            width={75.6}
            loading="lazy"
          />
          <p className={Styles.studentmilitaryline}>
            Special Chayenu subscription rates exclusively for members of the
            Military
          </p>
        </div>
      );
    }

    if (query.is_shluchim_only) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "24px",
          }}
        >
          <p className={Styles.studentmilitaryline}>
            Special Chayenu subscription rates exclusively for Shluchim.
          </p>
        </div>
      );
    }

    if (query.student_only) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "24px",
          }}
        >
          <Image
            src="/chabad-on-campus.svg"
            alt="logo"
            height={100}
            width={162.22}
            loading="lazy"
          />
          <p className={Styles.studentmilitaryline}>
            Special Chayenu Subscription Rates Exclusively for Students
          </p>
        </div>
      );
    }

    return <div className={Styles.subscribe}>Subscribe to Chayenu</div>;
  }

  return (
    <>
      <NextHead
        title="Chayenu | Subscribe"
        description="Subscribe to Chayenu, Chayenu is delivered in print or digital formats."
      />
      {
        <>
          {getContentHeader()}
          <h1 className={Styles.selectProduct}>Select Product</h1>
          <div className={Styles.products}>
            {allProducts.map((product, index) => {
              return (
                <div
                  key={product.id}
                  className={Styles.productCard}
                  onClick={() => {
                    const productPlans = plans.filter(
                      (plan) => plan.product.id === product.id
                    );
                    setProductPlans(productPlans);
                    setSelectedProduct(product);
                  }}
                  style={
                    !query.student_only &&
                    !query.is_military_only &&
                    allProducts?.length === 3 &&
                    width > 1300
                      ? index === 1
                        ? centerCardStyles
                        : {}
                      : {}
                  }
                >
                  <ProductCard
                    product={product}
                    selected={selectedProduct?.id === product?.id}
                    selectedProduct={selectedProduct}
                  />
                </div>
              );
            })}
          </div>
        </>
      }
      {selectedProduct && (
        <>
          {(() => {
            if (selectedProduct.product_type.toLowerCase() === "digital") {
              return (
                <DigitalSubscriptionForm
                  autoScroll={autoScroll}
                  productPlans={productPlans}
                  selectedProduct={selectedProduct}
                />
              );
            } else {
              return (
                <PrintDigitalSubscriptionForm
                  autoScroll={autoScroll}
                  countriesList={countriesList}
                  productPlans={productPlans}
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

export async function getServerSideProps(context) {
  const { query } = context;

  async function getProducts() {
    const productQuery = {};

    if (query.student_only === "true") {
      productQuery.student_only = true;
    }

    if (query.is_military_only === "true") {
      productQuery.is_military_only = true;
    }

    if (query.is_shluchim_only === "true") {
      productQuery.is_shluchim_only = true;
    }

    const { data } = await getAllProducts(productQuery);
    return data;
  }

  async function getPlans() {
    return getAllPlansUnfiltered({
      is_military_only: context.query.is_military_only,
      is_shluchim_only: context.query.is_shluchim_only,
      student_only: context.query.student_only,
    });
  }

  return {
    props: {
      query,
      products: await getProducts(),
      plans: (await getPlans()).data,
    },
  };
}
