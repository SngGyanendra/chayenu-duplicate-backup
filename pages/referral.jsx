import Styles from "../styles/trial.module.scss";
import { getTrialProduct } from "../api/common";
import { NextHead } from "/components/common";
import Subscribe from "../components/Referral/Subscribe/index";

export default function Referral({ products, query }) {

 let selectedProduct = products?.data?.length > 0 ? products.data[0] : null;

  return (
    <main>
      <NextHead
        title="Chayenu Referral | Chayenu"
        description="Experience the transformative power of Chayenu with our exclusive trial. Dive into a wealth of Jewish wisdom, engaging articles, and inspiring Torah content. Start your journey today and discover why Chayenu is the ultimate companion for spiritual growth. Sign up for our trial and unlock a world of meaningful learning."
      />
      <section className={Styles.wrapper}>
        <Subscribe product={selectedProduct} query={query}/>
      </section>

    </main>
  );
}

export async function getServerSideProps(context) {
  let query = context.query;
  const products = await getTrialProduct();
  return {
    props: {
      products,
      query
    },
  };
}
