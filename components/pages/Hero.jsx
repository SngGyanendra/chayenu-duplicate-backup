import { getDirectusAssetUrl } from '../../api/util';
import ContentStyles from '../../styles/content.module.scss';
import HeroStyles from '../../styles/hero.module.scss';
import Buttons from './Buttons';

export default function Hero({ hero }) {
    return <div className={HeroStyles.wrapper}>
        <div className={HeroStyles.contentWrapper}>
            <h2 className={HeroStyles.headline}>{hero.headline}</h2>
            <div
                className={ContentStyles.content}
                dangerouslySetInnerHTML={{ __html: hero.content }}
            />
            <Buttons buttons={hero.buttons} />
        </div>
        {hero.image && <div className={HeroStyles.imageWrapper}>
            <img
                className={HeroStyles.img}
                src={getDirectusAssetUrl(hero.image.id)}
                alt={hero.image.title}
            />
        </div>}
    </div>;
}