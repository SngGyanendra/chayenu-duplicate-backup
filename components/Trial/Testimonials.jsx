import { Carousel } from "../common/Carousel/Carousel";
import Styles from "./Testimonial.module.scss";
import { testimonials3 } from "../../data/testimonials";

export default function TrialTestimonials() {
  return (
    <div className={Styles.main}>
      <h1 className={Styles.head}>So much to love.<br/> So much to share.</h1>
      <p className={Styles.subhead}>
        When you join the Chayenu family, we’re all <span className={Styles.strong}>on the same page, literally and figuratively</span>: In a world that often feels divided, Chayenu connects us in a deeper, more meaningful way through synchronized study, understanding, and purpose.
      </p>
    {testimonials3 && testimonials3 && testimonials3.length > 0 && <Carousel 
            totalItems={testimonials3.length}
            additionalStyles={{ width: '100%' }}
            renderTemplate={(index)=>{
                return (
                  <div> 
                    <img className={Styles.startQuote} src="/images/trial/quote1.svg" alt="box" />
                    <div className={Styles.testimonials}>
                        <h2>
                          {testimonials3[index].head}
                        </h2>
                        <p>
                          {testimonials3[index].statement}
                        </p>
                        <p className={Styles.auther}>{testimonials3[index].auther}</p>

                    </div>
                    <img className={Styles.endQuote} src="/images/trial/quote2.svg" alt="box" />
                  </div>
                )
            }}

        >
      </Carousel>}
      <div className={Styles.linkDiv}>
        <a className={Styles.link} href="#payment-section">READ MORE TESTIMONIALS</a>
      </div>
      </div>
  );
}
