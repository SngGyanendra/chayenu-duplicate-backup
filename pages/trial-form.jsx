import Styles from "../styles/trial.module.scss";
import { getTrialProduct } from "../api/common";
import { NextHead } from "/components/common";
import Subscribe from "../components/Trial/Subscribe/index";

export default function TrialForm({ product }) {

  return (
    <main>
      <NextHead
        title="Chayenu 1 Month Trial | Chayenu"
        description="Experience the transformative power of Chayenu with our exclusive trial. Dive into a wealth of Jewish wisdom, engaging articles, and inspiring Torah content. Start your journey today and discover why Chayenu is the ultimate companion for spiritual growth. Sign up for our trial and unlock a world of meaningful learning."
      />
      <section className={Styles.wrapper}>
        <Subscribe product={product} />
      </section>

    </main>
  );
}

export async function getServerSideProps() {
  const products = await getTrialProduct();

  return {
    props: {
      product: products.data[0],
    },
  };  
}
