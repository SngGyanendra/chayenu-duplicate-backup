/* eslint-disable @next/next/no-img-element */
import { getDirectusAssetUrl } from "../../../api/util";
import Styles from "./storyCard.module.scss";
import Link from "next/link";
import { Print } from "../../common/Print.svg";
import { Digital } from "../../common/Digital.svg";

function ImageWrapper({ story }) {
  return <div className={Styles.imageContainer}>
    <img
      className={Styles.image}
      src={getDirectusAssetUrl(story.thumbnail.id)}
      alt={story.thumbnail.title ?? story.title}
    />
  </div>;
}

export function StoryCard({ story }) {
  return (
    <div className={Styles.card}>
      <div className={Styles.imageWrapperWrapper}>
        <ImageWrapper story={story} />
      </div>
      <div className={Styles.cardContent}>
        <div className={Styles.titleWrapper}>
          <div className={Styles.headerImageWrapper}>
            <ImageWrapper story={story} />
          </div>
          <h1 className={Styles.title}>{story.title}</h1>
        </div>
        <p className={Styles.description}>{story.description}</p>
        <div className={Styles.learnMoreDigitalPrintWrapper}>
          <Link className={Styles.learnMore} href={`/chayenu-section/${story.slug}`}>
            Learn More
          </Link>
          <div className={Styles.digitalPrintWrapper}>
            {story.is_print_available && <div title="print"><Print /></div>}
            {story.is_digital_available && <div title="digital"><Digital /></div>}
          </div>
        </div>
      </div>
    </div>
  );
}
