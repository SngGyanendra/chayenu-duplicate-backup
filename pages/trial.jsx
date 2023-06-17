import ContainerCard from "../components/cards/ContainerCard/ContainerCard";
import Styles from "../styles/trial.module.scss";
import { NextHead } from "/components/common";
import { testimonials1 } from "../data/testimonials";
import Testimonials from "../components/Testimonials/Testimonials";
import Features from "../components/Trial/Features";
import { getTrialProduct } from "../api/common";
import Subscribe from "../components/Trial/Subscribe";
import Hero from "../components/Trial/Hero";

export default function Trial({ products }) {
  const product = products.data[0];

  return (
    <main>
      <NextHead
        title="Chayenu 1 Month Trial | Chayenu"
        description="Experience the transformative power of Chayenu with our exclusive trial. Dive into a wealth of Jewish wisdom, engaging articles, and inspiring Torah content. Start your journey today and discover why Chayenu is the ultimate companion for spiritual growth. Sign up for our trial and unlock a world of meaningful learning."
      />

      <section className={Styles.wrapper}>
        <Hero />
        <Features />
      </section>

      <section className={Styles.main}>
        <h3 className={Styles.testimonialsHeader}>Testimonials</h3>
        {testimonials1 && testimonials1.length && (
          <Testimonials
            listOfTestimonials={testimonials1}
            additionalStyles={{ backgroundColor: "var(--blue-gray)" }}
          />
        )}
      </section>

      <Subscribe product={product} />
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
