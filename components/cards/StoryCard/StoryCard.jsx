/* eslint-disable @next/next/no-img-element */
import { getDirectusAssetUrl } from '../../../api/util';
import Styles from './storyCard.module.scss';
import Link from 'next/link';
import { Print } from '../../common/Print.svg'
import { Digital } from '../../common/Digital.svg'

export function StoryCard({ story }) {
    return <div className={Styles.card}>
        <img
            className={Styles.image}
            src={getDirectusAssetUrl(story.thumbnail.id)}
            alt={story.thumbnail.title ?? story.title}
        />
        <div className={Styles.cardContent}>
            <h1 className={Styles.title}>{story.title}</h1>
            <p className={Styles.description}>{story.description}</p>
            <div className={Styles.learnMoreDigitalPrintWrapper}>
                <Link className={Styles.learnMore} href={`/stories/${story.id}`}>Learn More</Link>
                <div
                    className={Styles.digitalPrintWrapper}>
                    {story.is_print_available && <Print />}
                    {story.is_digital_available && <Digital />}
                </div>
            </div>
        </div >
    </div>;
}