import Image from "next/image";
import { Carousel } from "../common/Carousel/Carousel";
import Styles from "./testimonials.module.scss";

const Testimonials = ({listOfTestimonials, additionalStyles}) => {
    return (
        listOfTestimonials && listOfTestimonials && listOfTestimonials.length > 0 && <Carousel 
            totalItems={listOfTestimonials.length}
            renderTemplate={(index)=>{
                return (
                    <div className={Styles.testimonials} style={{...additionalStyles}}>
                        <p>
                            {listOfTestimonials[index].statement}
                        </p>

                        <p>{listOfTestimonials[index].designation}</p>

                        <div>
                            <Image src={listOfTestimonials[index].imageUrl} alt="Alice's Image" height={130} width={130} />
                        </div>
                    </div>
                )
            }}

        >
      </Carousel>
    )
}

export default Testimonials;