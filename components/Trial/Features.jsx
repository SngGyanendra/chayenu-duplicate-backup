import Styles from "./Features.module.scss";
import MiniCard from "./MiniCard";
import FeatureList from "./features1";

export default function Features() {
  return (
    <div className={Styles.features}>
      <h2 className={Styles.headline}>
        <span className={Styles.thin}>
          Establishing a daily Torah study routine
        </span>
        <span className={Styles.fat}>has never been easier</span>
      </h2>

      <p className={Styles.description}>
        Chayenu offers a weekly Torah publication in Hebrew and English. It
        covers the study cycles of Chumash, Rambam, Tanya, and more. Subscribers
        also get fresh content from various Torah sources, including classical
        commentaries and original material. Established in 2009, Chayenu is
        studied by over 30,000 people in 35 countries. Join the global Torah
        study revolution by signing up now!
      </p>

      <div className={Styles.miniCardWrapper}>
        {FeatureList.map((feature, index) => (
          <MiniCard key={index} title={feature.title} icon={feature.icon} />
        ))}
      </div>
    </div>
  );
}
