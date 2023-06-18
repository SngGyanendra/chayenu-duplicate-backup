import Styles from "./Testimonial.module.scss";
import { testimonials1, testimonials2 } from "../../data/testimonials";
import Testimonials from '../Testimonials/Testimonials';

export default function TrialTestimonials() {
  return (
    <div>
      <h3 className={Styles.testimonialsHeader}>Testimonials</h3>
      <Testimonials
        listOfTestimonials={[...testimonials1, ...testimonials2]}
        additionalStyles={{ backgroundColor: "var(--blue-gray)" }}
      />
    </div>
  );
}
