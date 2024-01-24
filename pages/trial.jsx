import Styles from "../styles/trial.module.scss";
import { NextHead } from "/components/common";
import { getTrialProduct } from "../api/common";
import About from "../components/Trial/About";
import Features from "../components/Trial/Features";
import Hero from "../components/Trial/Hero";
import Testimonials from "../components/Trial/Testimonials";
import Steps from "../components/Trial/Steps";

export default function Trial({ products }) {

  return (
    <main>
      <NextHead
        title="Chayenu 1 Month Trial | Chayenu"
        description="Experience the transformative power of Chayenu with our exclusive trial. Dive into a wealth of Jewish wisdom, engaging articles, and inspiring Torah content. Start your journey today and discover why Chayenu is the ultimate companion for spiritual growth. Sign up for our trial and unlock a world of meaningful learning."
      />

      <section className={Styles.wrapper}>
        <Hero />
        <About />
        <Features />
        <Testimonials />
        <Steps />
      </section>

    </main>
  );
}

export async function getServerSideProps() {
  const products = await getTrialProduct();
  return {
    props: {
      products,
    },
  };
}
