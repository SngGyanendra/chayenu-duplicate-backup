import { getDirectusAssetUrl } from '../../api/util';
import ContentStyles from '../../styles/content.module.scss';
import HeroStyles from '../../styles/hero.module.scss';

export default function Hero({ hero }) {
    return <div className={HeroStyles.wrapper}>
        <div className={HeroStyles.contentWrapper}>
            <h2 className={HeroStyles.headline}>{hero.headline}</h2>
            <div
                className={ContentStyles.content}
                dangerouslySetInnerHTML={{ __html: hero.content }}
            />
        </div>
        <div>
            <img
                src={getDirectusAssetUrl(hero.image.id)}
                alt={hero.image.title}
            />
        </div>
    </div>;
}